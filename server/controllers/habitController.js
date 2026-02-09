const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

// Create Habit
exports.createHabit = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            color,
            icon,
            frequency,
            target,
            targetUnit,
            reminderTime,
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Habit name is required' });
        }

        const habit = new Habit({
            userId: req.userId,
            name,
            description: description || '',
            category: category || 'Other',
            color: color || '#3b82f6',
            icon: icon || '✓',
            frequency: frequency || 'daily',
            target: target || 1,
            targetUnit: targetUnit || 'times',
            reminderTime: reminderTime || '09:00',
        });

        await habit.save();

        res.status(201).json({
            message: 'Habit created successfully',
            habit,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Habits
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });

        res.json({
            habits,
            count: habits.length,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Single Habit
exports.getHabit = async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.json({ habit });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Habit
exports.updateHabit = async (req, res) => {
    try {
        let habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        habit = await Habit.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.json({
            message: 'Habit updated successfully',
            habit,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.userId });

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Delete all logs for this habit
        await HabitLog.deleteMany({ habitId: req.params.id });

        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Log Habit Completion
exports.logHabit = async (req, res) => {
    try {
        const { habitId, completed, value, notes, mood, date } = req.body;

        // Verify habit belongs to user
        const habit = await Habit.findOne({ _id: habitId, userId: req.userId });
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        const logDate = date ? new Date(date) : new Date();
        logDate.setHours(0, 0, 0, 0);

        // Check if log already exists for this date
        let habitLog = await HabitLog.findOne({
            habitId,
            userId: req.userId,
            date: logDate,
        });

        if (habitLog) {
            habitLog.completed = completed !== undefined ? completed : habitLog.completed;
            habitLog.value = value || habitLog.value;
            habitLog.notes = notes || habitLog.notes;
            habitLog.mood = mood || habitLog.mood;
            await habitLog.save();
        } else {
            habitLog = new HabitLog({
                userId: req.userId,
                habitId,
                date: logDate,
                completed: completed || false,
                value: value || 1,
                notes: notes || '',
                mood: mood || null,
            });
            await habitLog.save();
        }

        res.json({
            message: 'Habit logged successfully',
            log: habitLog,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Habit Logs
exports.getHabitLogs = async (req, res) => {
    try {
        const { habitId, startDate, endDate } = req.query;

        let query = { userId: req.userId };

        if (habitId) {
            query.habitId = habitId;
        }

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const logs = await HabitLog.find(query).populate('habitId').sort({ date: -1 });

        res.json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

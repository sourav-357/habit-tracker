const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

// Get Daily Analytics
exports.getDailyAnalytics = async (req, res) => {
    try {
        const { days = 30 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));
        startDate.setHours(0, 0, 0, 0);

        const logs = await HabitLog.find({
            userId: req.userId,
            date: { $gte: startDate },
        }).populate('habitId');

        // Group by date
        const dailyData = {};
        logs.forEach((log) => {
            const dateStr = log.date.toISOString().split('T')[0];
            if (!dailyData[dateStr]) {
                dailyData[dateStr] = {
                    date: dateStr,
                    completed: 0,
                    total: 0,
                    percentage: 0,
                };
            }
            if (log.completed) {
                dailyData[dateStr].completed++;
            }
            dailyData[dateStr].total++;
        });

        // Calculate percentages
        const data = Object.values(dailyData).map((day) => ({
            ...day,
            percentage: day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0,
        }));

        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Weekly Analytics
exports.getWeeklyAnalytics = async (req, res) => {
    try {
        const { weeks = 12 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(weeks) * 7);
        startDate.setHours(0, 0, 0, 0);

        const logs = await HabitLog.find({
            userId: req.userId,
            date: { $gte: startDate },
        }).populate('habitId');

        // Group by week
        const weeklyData = {};
        logs.forEach((log) => {
            const date = new Date(log.date);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekStr = weekStart.toISOString().split('T')[0];

            if (!weeklyData[weekStr]) {
                weeklyData[weekStr] = {
                    week: weekStr,
                    completed: 0,
                    total: 0,
                    percentage: 0,
                };
            }
            if (log.completed) {
                weeklyData[weekStr].completed++;
            }
            weeklyData[weekStr].total++;
        });

        const data = Object.values(weeklyData).map((week) => ({
            ...week,
            percentage: week.total > 0 ? Math.round((week.completed / week.total) * 100) : 0,
        }));

        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Monthly Analytics
exports.getMonthlyAnalytics = async (req, res) => {
    try {
        const { months = 12 } = req.query;

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - parseInt(months));
        startDate.setHours(0, 0, 0, 0);

        const logs = await HabitLog.find({
            userId: req.userId,
            date: { $gte: startDate },
        }).populate('habitId');

        // Group by month
        const monthlyData = {};
        logs.forEach((log) => {
            const date = new Date(log.date);
            const monthStr = date.toISOString().substring(0, 7);

            if (!monthlyData[monthStr]) {
                monthlyData[monthStr] = {
                    month: monthStr,
                    completed: 0,
                    total: 0,
                    percentage: 0,
                };
            }
            if (log.completed) {
                monthlyData[monthStr].completed++;
            }
            monthlyData[monthStr].total++;
        });

        const data = Object.values(monthlyData).map((month) => ({
            ...month,
            percentage: month.total > 0 ? Math.round((month.completed / month.total) * 100) : 0,
        }));

        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Yearly Analytics
exports.getYearlyAnalytics = async (req, res) => {
    try {
        const { years = 3 } = req.query;

        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - parseInt(years));
        startDate.setHours(0, 0, 0, 0);

        const logs = await HabitLog.find({
            userId: req.userId,
            date: { $gte: startDate },
        }).populate('habitId');

        // Group by year
        const yearlyData = {};
        logs.forEach((log) => {
            const yearStr = log.date.getFullYear().toString();

            if (!yearlyData[yearStr]) {
                yearlyData[yearStr] = {
                    year: yearStr,
                    completed: 0,
                    total: 0,
                    percentage: 0,
                };
            }
            if (log.completed) {
                yearlyData[yearStr].completed++;
            }
            yearlyData[yearStr].total++;
        });

        const data = Object.values(yearlyData).map((year) => ({
            ...year,
            percentage: year.total > 0 ? Math.round((year.completed / year.total) * 100) : 0,
        }));

        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Habit Performance
exports.getHabitPerformance = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.userId });

        const performance = [];

        for (const habit of habits) {
            const logs = await HabitLog.find({
                habitId: habit._id,
                userId: req.userId,
            });

            const completed = logs.filter((log) => log.completed).length;
            const total = logs.length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            performance.push({
                habitId: habit._id,
                name: habit.name,
                color: habit.color,
                icon: habit.icon,
                category: habit.category,
                completed,
                total,
                percentage,
                streak: calculateStreak(logs),
            });
        }

        res.json({ performance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayLogs = await HabitLog.find({
            userId: req.userId,
            date: today,
        });

        const habits = await Habit.countDocuments({ userId: req.userId });

        const thisMonth = new Date(today);
        thisMonth.setDate(1);

        const monthLogs = await HabitLog.find({
            userId: req.userId,
            date: { $gte: thisMonth },
        });

        const completedToday = todayLogs.filter((log) => log.completed).length;
        const completedThisMonth = monthLogs.filter((log) => log.completed).length;

        res.json({
            stats: {
                totalHabits: habits,
                completedToday,
                totalLogsToday: todayLogs.length,
                completedThisMonth,
                todayPercentage: todayLogs.length > 0 ? Math.round((completedToday / todayLogs.length) * 100) : 0,
                monthPercentage: monthLogs.length > 0 ? Math.round((completedThisMonth / monthLogs.length) * 100) : 0,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Helper function to calculate streak
function calculateStreak(logs) {
    if (logs.length === 0) return 0;

    const sorted = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].completed) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

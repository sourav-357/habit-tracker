const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        habitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit',
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Number,
            default: 1,
        },
        notes: {
            type: String,
            maxlength: [500, 'Notes cannot exceed 500 characters'],
            default: '',
        },
        mood: {
            type: String,
            enum: ['excellent', 'good', 'neutral', 'poor', 'terrible'],
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Index for faster queries
habitLogSchema.index({ userId: 1, habitId: 1, date: 1 });
habitLogSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('HabitLog', habitLogSchema);

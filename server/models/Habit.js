const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Please provide a habit name'],
            trim: true,
            maxlength: [100, 'Habit name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default: '',
        },
        category: {
            type: String,
            enum: ['Health', 'Fitness', 'Learning', 'Productivity', 'Wellness', 'Social', 'Finance', 'Other'],
            default: 'Other',
        },
        color: {
            type: String,
            default: '#3b82f6',
        },
        icon: {
            type: String,
            default: '✓',
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'daily',
        },
        target: {
            type: Number,
            default: 1,
            min: 1,
        },
        targetUnit: {
            type: String,
            enum: ['times', 'minutes', 'hours', 'km', 'pages', 'cups'],
            default: 'times',
        },
        reminderTime: {
            type: String,
            default: '09:00',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Habit', habitSchema);

const express = require('express');
const router = express.Router();
const {
    getDailyAnalytics,
    getWeeklyAnalytics,
    getMonthlyAnalytics,
    getYearlyAnalytics,
    getHabitPerformance,
    getDashboardStats,
} = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

router.get('/daily', getDailyAnalytics);
router.get('/weekly', getWeeklyAnalytics);
router.get('/monthly', getMonthlyAnalytics);
router.get('/yearly', getYearlyAnalytics);
router.get('/performance', getHabitPerformance);
router.get('/dashboard/stats', getDashboardStats);

module.exports = router;

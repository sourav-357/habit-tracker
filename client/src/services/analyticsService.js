import api from './api'

export const analyticsService = {
    getDailyAnalytics: (days = 30) => api.get('/analytics/daily', { params: { days } }),
    getWeeklyAnalytics: (weeks = 12) => api.get('/analytics/weekly', { params: { weeks } }),
    getMonthlyAnalytics: (months = 12) => api.get('/analytics/monthly', { params: { months } }),
    getYearlyAnalytics: (years = 3) => api.get('/analytics/yearly', { params: { years } }),
    getHabitPerformance: () => api.get('/analytics/performance'),
    getDashboardStats: () => api.get('/analytics/dashboard/stats'),
}

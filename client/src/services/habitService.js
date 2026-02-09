import api from './api'

export const habitService = {
    createHabit: (habitData) => api.post('/habits', habitData),
    getHabits: () => api.get('/habits'),
    getHabit: (id) => api.get(`/habits/${id}`),
    updateHabit: (id, habitData) => api.put(`/habits/${id}`, habitData),
    deleteHabit: (id) => api.delete(`/habits/${id}`),
    logHabit: (logData) => api.post('/habits/log/add', logData),
    getHabitLogs: (params) => api.get('/habits/logs/all', { params }),
}

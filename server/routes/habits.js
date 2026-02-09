const express = require('express');
const router = express.Router();
const {
    createHabit,
    getHabits,
    getHabit,
    updateHabit,
    deleteHabit,
    logHabit,
    getHabitLogs,
} = require('../controllers/habitController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

router.post('/', createHabit);
router.get('/', getHabits);
router.get('/:id', getHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

// Logging routes
router.post('/log/add', logHabit);
router.get('/logs/all', getHabitLogs);

module.exports = router;

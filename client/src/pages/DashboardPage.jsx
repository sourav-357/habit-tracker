import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Spinner } from '@/components/ui/Spinner'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Target, Flame, Calendar, Plus } from 'lucide-react'
import { habitService } from '@/services/habitService'
import { analyticsService } from '@/services/analyticsService'
import HabitCard from '@/components/HabitCard'

const mockChartData = [
    { date: '1', completed: 8, total: 10 },
    { date: '2', completed: 7, total: 10 },
    { date: '3', completed: 9, total: 10 },
    { date: '4', completed: 8, total: 10 },
    { date: '5', completed: 10, total: 10 },
    { date: '6', completed: 6, total: 10 },
    { date: '7', completed: 9, total: 10 },
]

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function DashboardPage() {
    const navigate = useNavigate()
    const [habits, setHabits] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [habitsRes, statsRes] = await Promise.all([
                habitService.getHabits(),
                analyticsService.getDashboardStats(),
            ])

            const habitsData = habitsRes.data.habits.map((habit) => ({
                ...habit,
                completedToday: false,
                completionPercentage: 0,
                streak: 0,
            }))

            setHabits(habitsData)
            setStats(statsRes.data.stats)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogHabit = async (habitId, completed) => {
        try {
            await habitService.logHabit({
                habitId,
                completed,
            })
            fetchData()
        } catch (error) {
            console.error('Error logging habit:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        )
    }

    const categoryCount = habits.reduce((acc, habit) => {
        acc[habit.category] = (acc[habit.category] || 0) + 1
        return acc
    }, {})

    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
    }))

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">Track your daily progress and achieve your goals</p>
                </div>
                <Button onClick={() => navigate('/habits/new')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Habit
                </Button>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Habits
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.totalHabits}</div>
                            <p className="text-xs text-muted-foreground mt-1">Active habits</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Today's Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.todayPercentage}%</div>
                            <Progress value={stats.todayPercentage} className="mt-2 h-1.5" />
                            <p className="text-xs text-muted-foreground mt-1">
                                {stats.completedToday} of {stats.totalLogsToday} completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                This Month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.monthPercentage}%</div>
                            <Progress value={stats.monthPercentage} className="mt-2 h-1.5" />
                            <p className="text-xs text-muted-foreground mt-1">
                                {stats.completedThisMonth} completions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Consistency
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Flame className="h-6 w-6 text-orange-500" />
                                <div className="text-3xl font-bold text-foreground">15</div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Current streak</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Weekly Progress
                        </CardTitle>
                        <CardDescription>Last 7 days completion rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#3b82f6"
                                    name="Completed"
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#d1d5db"
                                    name="Total"
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Habit Categories */}
                {categoryData.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Habits by Category
                            </CardTitle>
                            <CardDescription>Distribution of your habits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name} (${value})`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Active Habits */}
            <div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Today's Habits</h2>
                    <p className="text-muted-foreground">
                        {habits.length === 0
                            ? 'No habits yet. Create one to get started!'
                            : `Track your ${habits.length} habits`}
                    </p>
                </div>

                {habits.length === 0 ? (
                    <Card className="flex items-center justify-center min-h-64">
                        <div className="text-center">
                            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                            <p className="text-muted-foreground mb-4">No habits created yet</p>
                            <Button onClick={() => navigate('/habits/new')}>Create Your First Habit</Button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {habits.map((habit) => (
                            <HabitCard
                                key={habit._id}
                                habit={habit}
                                onLog={(completed) => handleLogHabit(habit._id, completed)}
                                loading={loading}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

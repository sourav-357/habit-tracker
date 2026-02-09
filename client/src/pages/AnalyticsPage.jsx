import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { analyticsService } from '@/services/analyticsService'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Target, Calendar, Zap } from 'lucide-react'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function AnalyticsPage() {
    const [dailyData, setDailyData] = useState([])
    const [weeklyData, setWeeklyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])
    const [performanceData, setPerformanceData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const [daily, weekly, monthly, yearly, performance] = await Promise.all([
                analyticsService.getDailyAnalytics(30),
                analyticsService.getWeeklyAnalytics(12),
                analyticsService.getMonthlyAnalytics(12),
                analyticsService.getYearlyAnalytics(3),
                analyticsService.getHabitPerformance(),
            ])

            setDailyData(daily.data.data)
            setWeeklyData(weekly.data.data)
            setMonthlyData(monthly.data.data)
            setYearlyData(yearly.data.data)
            setPerformanceData(performance.data.performance)
        } catch (error) {
            console.error('Error fetching analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        )
    }

    const topHabits = performanceData
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5)

    const totalCompletions = performanceData.reduce((sum, h) => sum + h.completed, 0)
    const totalLogs = performanceData.reduce((sum, h) => sum + h.total, 0)
    const overallPercentage =
        totalLogs > 0 ? Math.round((totalCompletions / totalLogs) * 100) : 0

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground">
                    Deep dive into your habit data and track your progress
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Overall Completion
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{overallPercentage}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {totalCompletions} of {totalLogs} completions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Habits
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{performanceData.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Currently tracking</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Best Habit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {topHabits.length > 0 ? (
                            <>
                                <div className="text-3xl font-bold text-foreground">{topHabits[0].percentage}%</div>
                                <p className="text-xs text-muted-foreground mt-1">{topHabits[0].name}</p>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">No data yet</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Analytics */}
            <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>

                {/* Daily */}
                <TabsContent value="daily" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Last 30 Days
                            </CardTitle>
                            <CardDescription>Daily completion progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {dailyData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={dailyData}>
                                        <defs>
                                            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
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
                                        <Area
                                            type="monotone"
                                            dataKey="completed"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorCompleted)"
                                            name="Completed"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No data yet</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Weekly */}
                <TabsContent value="weekly" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Last 12 Weeks
                            </CardTitle>
                            <CardDescription>Weekly completion rate</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {weeklyData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                                        <YAxis stroke="hsl(var(--muted-foreground))" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                                        <Bar dataKey="total" fill="#d1d5db" name="Total" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No data yet</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Monthly */}
                <TabsContent value="monthly" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Last 12 Months
                            </CardTitle>
                            <CardDescription>Monthly completion rate</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {monthlyData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                                            dataKey="percentage"
                                            stroke="#10b981"
                                            name="Completion %"
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No data yet</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Yearly */}
                <TabsContent value="yearly" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Last 3 Years
                            </CardTitle>
                            <CardDescription>Yearly completion rate</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {yearlyData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={yearlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                                        <YAxis stroke="hsl(var(--muted-foreground))" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="percentage" fill="#f59e0b" name="Completion %" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No data yet</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Top Habits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Habits</CardTitle>
                        <CardDescription>Your best performing habits</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topHabits.map((habit, index) => (
                                <div
                                    key={habit.habitId}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                >
                                    <div>
                                        <p className="font-semibold text-foreground flex items-center gap-2">
                                            <span
                                                className="h-3 w-3 rounded-full"
                                                style={{ backgroundColor: habit.color }}
                                            />
                                            {habit.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {habit.completed} of {habit.total} completions
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="success">{habit.percentage}%</Badge>
                                        {habit.streak > 0 && (
                                            <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-1">
                                                {habit.streak} day streak
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                {performanceData.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Distribution</CardTitle>
                            <CardDescription>Habits by category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={performanceData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percentage }) => `${percentage}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="percentage"
                                        nameKey="name"
                                    >
                                        {performanceData.map((entry, index) => (
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
        </div>
    )
}

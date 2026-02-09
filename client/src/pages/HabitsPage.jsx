import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { habitService } from '@/services/habitService'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Plus, Search, Edit, Trash2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function HabitsPage() {
    const navigate = useNavigate()
    const [habits, setHabits] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    useEffect(() => {
        fetchHabits()
    }, [])

    const fetchHabits = async () => {
        try {
            setLoading(true)
            const response = await habitService.getHabits()
            setHabits(response.data.habits)
        } catch (error) {
            console.error('Error fetching habits:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this habit?')) {
            try {
                await habitService.deleteHabit(id)
                await fetchHabits()
            } catch (error) {
                console.error('Error deleting habit:', error)
            }
        }
    }

    const filteredHabits = habits.filter((habit) => {
        const matchesSearch =
            habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            habit.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === 'all' || habit.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const categories = ['all', ...new Set(habits.map((h) => h.category))]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">My Habits</h1>
                    <p className="text-muted-foreground">Manage and track all your habits</p>
                </div>
                <Button onClick={() => navigate('/habits/new')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Habit
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search habits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={filterCategory === category ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => setFilterCategory(category)}
                        >
                            {category === 'all' ? 'All Habits' : category}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Habits List */}
            {filteredHabits.length === 0 ? (
                <Card className="flex items-center justify-center min-h-64">
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            {habits.length === 0
                                ? 'No habits created yet. Create one to get started!'
                                : 'No habits match your search.'}
                        </p>
                        {habits.length === 0 && (
                            <Button onClick={() => navigate('/habits/new')}>Create Your First Habit</Button>
                        )}
                    </div>
                </Card>
            ) : (
                <div className="space-y-3">
                    {filteredHabits.map((habit) => (
                        <Card key={habit._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div
                                            className="h-12 w-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                                            style={{ backgroundColor: habit.color + '20', color: habit.color }}
                                        >
                                            {habit.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground text-lg">{habit.name}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <Badge variant="secondary">{habit.category}</Badge>
                                                <Badge variant="outline">{habit.frequency}</Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    Target: {habit.target} {habit.targetUnit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/habits/${habit._id}/edit`)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive"
                                            onClick={() => handleDelete(habit._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

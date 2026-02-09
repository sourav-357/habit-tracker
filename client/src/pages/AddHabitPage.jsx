import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { habitService } from '@/services/habitService'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Spinner } from '@/components/ui/Spinner'
import { ArrowLeft, AlertCircle } from 'lucide-react'

const CATEGORIES = ['Health', 'Fitness', 'Learning', 'Productivity', 'Wellness', 'Social', 'Finance', 'Other']
const FREQUENCIES = ['daily', 'weekly', 'monthly']
const UNITS = ['times', 'minutes', 'hours', 'km', 'pages', 'cups']
const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
const ICONS = ['✓', '🎯', '💪', '📚', '🧘', '🏃', '💰', '🌙', '🎨', '🚀', '📖', '🏋️']

export default function AddHabitPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Health',
        color: '#3b82f6',
        icon: '✓',
        frequency: 'daily',
        target: '1',
        targetUnit: 'times',
        reminderTime: '09:00',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'target' ? parseInt(value) || 1 : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await habitService.createHabit({
                ...formData,
                target: parseInt(formData.target),
            })
            navigate('/habits')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create habit')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <button
                onClick={() => navigate('/habits')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Habits
            </button>

            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Create New Habit</h1>
                <p className="text-muted-foreground">
                    Start building a better version of yourself with a new habit
                </p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Habit Details</CardTitle>
                    <CardDescription>Fill in the essential information about your habit</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Icon Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="name">Habit Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Morning Meditation"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon</Label>
                                <Select
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    {ICONS.map((icon) => (
                                        <option key={icon} value={icon}>
                                            {icon} Icon
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Optional: Describe why this habit matters to you"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading}
                                rows={3}
                            />
                        </div>

                        {/* Category and Color */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color">Color</Label>
                                <div className="flex gap-2">
                                    <Select
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        {COLORS.map((color) => (
                                            <option key={color} value={color}>
                                                Color
                                            </option>
                                        ))}
                                    </Select>
                                    <div
                                        className="h-10 w-10 rounded flex-shrink-0"
                                        style={{ backgroundColor: formData.color }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Frequency and Target */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="frequency">Frequency</Label>
                                <Select
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    {FREQUENCIES.map((freq) => (
                                        <option key={freq} value={freq}>
                                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target">Target</Label>
                                <Input
                                    id="target"
                                    name="target"
                                    type="number"
                                    min="1"
                                    value={formData.target}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="targetUnit">Unit</Label>
                                <Select
                                    name="targetUnit"
                                    value={formData.targetUnit}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    {UNITS.map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {/* Reminder Time */}
                        <div className="space-y-2">
                            <Label htmlFor="reminderTime">Reminder Time (Optional)</Label>
                            <Input
                                id="reminderTime"
                                name="reminderTime"
                                type="time"
                                value={formData.reminderTime}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={loading || !formData.name}
                                className="flex-1"
                            >
                                {loading && <Spinner className="mr-2 h-4 w-4" />}
                                {loading ? 'Creating...' : 'Create Habit'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/habits')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

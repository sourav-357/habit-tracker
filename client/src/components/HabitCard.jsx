import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { CheckCircle2, TrendingUp, Flame, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

const HabitCard = ({ habit, onLog, loading }) => {
    const isCompleted = habit.completedToday

    return (
        <Card
            className={cn(
                'group hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-in',
                isCompleted && 'border-green-500/30 bg-green-50 dark:bg-green-950/20'
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="h-12 w-12 rounded-lg flex items-center justify-center text-xl"
                            style={{ backgroundColor: habit.color + '20', color: habit.color }}
                        >
                            {habit.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">{habit.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                    {habit.category}
                                </Badge>
                                {habit.streak > 0 && (
                                    <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium">
                                        <Flame className="h-3 w-3" />
                                        {habit.streak}-day streak
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button
                        size="icon"
                        variant={isCompleted ? 'default' : 'outline'}
                        onClick={() => onLog(!isCompleted)}
                        disabled={loading}
                        className="h-10 w-10"
                    >
                        <CheckCircle2 className={cn('h-5 w-5', isCompleted && 'fill-current')} />
                    </Button>
                </div>

                {habit.description && (
                    <p className="text-sm text-muted-foreground mb-3">{habit.description}</p>
                )}

                <Progress value={habit.completionPercentage || 0} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                    {habit.completedThisMonth || 0} of {habit.totalThisMonth || 0} times this month
                </p>
            </CardContent>
        </Card>
    )
}

export default HabitCard

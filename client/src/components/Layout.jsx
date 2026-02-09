import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import {
    Home,
    CheckSquare,
    BarChart3,
    User,
    LogOut,
    Menu,
    X,
    Plus,
} from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Layout({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { logout, user } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navItems = [
        { label: 'Dashboard', href: '/', icon: Home },
        { label: 'Habits', href: '/habits', icon: CheckSquare },
        { label: 'Analytics', href: '/analytics', icon: BarChart3 },
        { label: 'Profile', href: '/profile', icon: User },
    ]

    const isActive = (href) => {
        if (href === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(href)
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div
                className={cn(
                    'fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 md:translate-x-0 transform flex flex-col',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">HT</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-foreground">Habits Tracker</h1>
                            <p className="text-xs text-muted-foreground">Build Better Habits</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.href}
                                onClick={() => {
                                    navigate(item.href)
                                    setSidebarOpen(false)
                                }}
                                className={cn(
                                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                                    isActive(item.href)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-muted'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-border space-y-3">
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate('/habits/new')}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Habit
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="border-b border-border bg-card px-4 md:px-6 py-4 flex items-center justify-between">
                    <button
                        className="md:hidden text-foreground hover:bg-muted p-2 rounded-lg"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    <div className="flex-1 md:flex-none" />

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-foreground">
                                {user?.firstName || user?.username}
                            </p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                            {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-auto">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { AlertCircle } from 'lucide-react'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <AlertCircle className="h-24 w-24 mx-auto text-destructive opacity-50" />
                    <h1 className="text-5xl font-bold text-foreground">404</h1>
                    <p className="text-2xl font-semibold text-foreground">Page Not Found</p>
                    <p className="text-muted-foreground max-w-md">
                        The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <Link to="/">
                    <Button size="lg">Go Back Home</Button>
                </Link>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Spinner } from '@/components/ui/Spinner'
import { CheckCircle2, AlertCircle, LogOut } from 'lucide-react'

export default function ProfilePage() {
    const navigate = useNavigate()
    const { user, logout, updateProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        bio: user?.bio || '',
        theme: user?.theme || 'light',
        timezone: user?.timezone || 'UTC',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const result = await updateProfile(formData)
        if (result.success) {
            setSuccess('Profile updated successfully!')
            setTimeout(() => setSuccess(''), 3000)
        } else {
            setError(result.error)
        }
        setLoading(false)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            {success && (
                <Alert variant="success">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Account Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Username</Label>
                            <Input value={user?.username || ''} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={user?.email || ''} disabled className="bg-muted" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Member Since</Label>
                        <Input
                            value={
                                user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : 'N/A'
                            }
                            disabled
                            className="bg-muted"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Profile Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Tell us about yourself..."
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={loading}
                                rows={4}
                            />
                            <p className="text-xs text-muted-foreground">
                                {formData.bio.length}/500 characters
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme Preference</Label>
                                <Select
                                    name="theme"
                                    value={formData.theme}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="EST">EST (Eastern)</option>
                                    <option value="CST">CST (Central)</option>
                                    <option value="MST">MST (Mountain)</option>
                                    <option value="PST">PST (Pacific)</option>
                                    <option value="GMT">GMT</option>
                                    <option value="IST">IST (India)</option>
                                    <option value="JST">JST (Japan)</option>
                                    <option value="AEST">AEST (Australia)</option>
                                </Select>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading && <Spinner className="mr-2 h-4 w-4" />}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full justify-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

import React, { createContext, useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check for existing token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = useCallback(async (credentials) => {
        try {
            const response = await authService.login(credentials)
            const { token, user } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            setToken(token)
            setUser(user)

            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' }
        }
    }, [])

    const register = useCallback(async (userData) => {
        try {
            const response = await authService.register(userData)
            const { token, user } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            setToken(token)
            setUser(user)

            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' }
        }
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }, [])

    const updateProfile = useCallback(async (profileData) => {
        try {
            const response = await authService.updateProfile(profileData)
            const updatedUser = response.data.user

            localStorage.setItem('user', JSON.stringify(updatedUser))
            setUser(updatedUser)

            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Update failed' }
        }
    }, [])

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

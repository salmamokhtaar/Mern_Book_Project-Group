import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:3000';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Register a new user
    const createUser = async (name, email, password, role = 'user') => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                role
            });

            const { token, user } = response.data;

            // Save token to localStorage
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            setLoading(false);

            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // Login user
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

            const { token, user } = response.data;

            // Save token to localStorage
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            setLoading(false);

            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        return Promise.resolve();
    };

    // Check if user is authenticated on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    // Verify token by making a request to a protected endpoint
                    const response = await axios.get(`${API_URL}/users/${localStorage.getItem('userId')}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });

                    setUser(response.data);
                    setToken(storedToken);
                } catch (error) {
                    // If token is invalid, clear it
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setToken(null);
                    setUser(null);
                }
            }

            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    // Create axios instance with auth header
    const authAxios = axios.create({
        baseURL: API_URL
    });

    // Add auth token to all requests
    authAxios.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const authInfo = {
        user,
        loading,
        token,
        createUser,
        login,
        logout,
        authAxios
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
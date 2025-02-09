import React from 'react'
import LoginPage from './pages/auth/login'
import TasksPage from './pages/tasks'

import HomePage from './pages/home'

export type CustomComponent = React.ComponentType & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export const authRoutes = [
  { path: '/login', Component: LoginPage as CustomComponent },
]

export const navRoutes = [
  { path: '/', Component: HomePage as CustomComponent },
  { path: '/tasks', Component: TasksPage as CustomComponent },
]

export const allRoutes = [...authRoutes, ...navRoutes]

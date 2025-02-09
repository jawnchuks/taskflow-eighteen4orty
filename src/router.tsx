import React from 'react'
import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom'
import { allRoutes } from './routes'
import ErrorPage from './components/error-page'
import { isAuthenticated } from './utils/auth'
import AppLayout from './components/layout/app'
import { getDefaultLayout } from './components/layout'

const publicRoutes = ['/login']

function isPublicRoute(path: string) {
  return publicRoutes.includes(path)
}

function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const auth = isAuthenticated()
  return auth ? element : <Navigate to="/login" replace />
}

export function createRouter() {
  const routeWrappers: RouteObject[] = allRoutes.map((route) => {
    const getLayout = route.Component?.getLayout ?? getDefaultLayout

    const Component = route.Component!

    const isProtected = !isPublicRoute(route.path)

    const page = getLayout(
      isProtected ? (
        <ProtectedRoute
          element={
            <AppLayout>
              <Component />
            </AppLayout>
          }
        />
      ) : (
        <Component />
      )
    )

    return {
      ...route,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })

  return createBrowserRouter(routeWrappers)
}

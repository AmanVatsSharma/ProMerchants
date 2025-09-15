//middleware.ts
export async function middleware(request: any) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and auth pages
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/auth/') ||
    pathname === '/favicon.ico'
  ) {
    return
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/admin']
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // For protected routes, redirect to login if not authenticated
  if (isProtectedRoute) {
    // Check for session token in cookies
    const sessionToken = request.cookies.get('authjs.session-token') || 
                        request.cookies.get('__Secure-authjs.session-token')
    
    if (!sessionToken) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return Response.redirect(loginUrl)
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

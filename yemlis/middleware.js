//Include logic to authorize user access, such as checking for authentication tokens
//Not all routes require authorization. Use the matcher option in your Middleware
//to specify any routes that do not require authorization checks

//Middleware Logic

//Write logic to verify if a user is authenticated. Check user roles or permissions
//for route authorization

//Redirect unauthorized users to a login or error page as appropriate.

/* export function middleware(request) {
    const currentUser = request.cookies.get('currentUser')?.value
   
    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
   
    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url))
    }
  }
   
  export const config = {
    matcher: ['/dashboard'],
  } */
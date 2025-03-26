// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that should be publicly accessible.
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
]);

// Wrap your middleware with Clerk's middleware.
export default clerkMiddleware(async (auth, request) => {
  // If the requested route is not public, enforce authentication.
 
  
  // If the route is public or the user is authenticated, allow the request to proceed.
  return;
});

// Configure the matcher to run the middleware on all routes except for static assets.
export const config = {
  matcher: [
    // Exclude Next.js internals and static files (unless they match the API or TRPC routes).
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes.
    '/(api|trpc)(.*)',
  ],
};

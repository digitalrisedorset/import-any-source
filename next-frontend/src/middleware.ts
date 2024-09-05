import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//     canRewriteTo = (url: string) => {
//         return false
//         if (/^(?!\/(_next|api)\/).*$/.test(request.url)) {
//             return false
//         }
//
//         if (request.nextUrl.pathname === url) {
//             return false
//         }
//
//         return true
//     }
//
//     const token = request.cookies['auth-token'];
//
//     if (!token && canRewriteTo('/signin')) {
//         // Redirect to login page if not authenticated
//         return NextResponse.redirect(new URL('/signin', request.url))
//     }
//
//     // Allow the request to proceed
//     return NextResponse.next();
// }

export function middleware(request: NextRequest) {
    console.log("Current path:", request.nextUrl.pathname);
    const token = request.cookies['auth-token'];

    const canRewriteTo = (request, url: string) => {
        return false
        console.log('canRewriteTo request ', request.url, url)
        if (/^(?!\/(_next|api|static|image|favicon.ico)\/).*$/.test(request.url)) {
            return false
        }

        if (request.nextUrl.pathname.startsWith(url)) {
            return false
        }

        return true
        // if (/^(?!\/(_next|api)\/).*$/.test(request.url)) {
        //     return false
        // }
        //
        // if (request.nextUrl.pathname === url) {
        //     return false
        // }
        //
        // return true
    }

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    if (!token && canRewriteTo(request, '/signin')) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next({ headers });
}
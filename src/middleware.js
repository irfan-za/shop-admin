import { NextResponse } from "next/server"

export default async function middleware(req){
  const res= NextResponse.next()
  if(req.cookies.get('token')?.value){
    return res;
  }
  else{
    return NextResponse.redirect(new URL('/login', req.url));
  }
}


export const config = {
  matcher: ['/dashboard/:path*','/admin/:path*']
}
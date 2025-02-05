import { NextResponse } from "next/server";

export async function middleware() {
  const response = NextResponse.next();
  // Add some custom logic here
  return response;
}
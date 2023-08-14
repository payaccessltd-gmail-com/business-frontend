import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "lib/auth"

export async function GET(request: Request) {
  console.log("session", request)
  const session = await getServerSession(authOptions)

  return NextResponse.json({
    authenticated: !!session,
    session,
  })
}

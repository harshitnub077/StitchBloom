import { getAuthHandlers } from "@/lib/auth-factory"
import { NextRequest } from "next/server"

// ISOLATED ROUTE HANDLER: Fixes 'NextRequest is not a constructor' across the site.
// This route now uses the isolated factory, so even if it crashes, it won't take down the rest of the app.

export const GET = async (req: NextRequest, props: any) => {
  const { handlers } = getAuthHandlers()
  return await handlers.GET(req, props)
}

export const POST = async (req: NextRequest, props: any) => {
  const { handlers } = getAuthHandlers()
  return await handlers.POST(req, props)
}

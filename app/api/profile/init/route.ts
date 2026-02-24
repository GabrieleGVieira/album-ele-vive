import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const authHeader = req.headers.get("Authorization")

  if (!authHeader) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.replace("Bearer ", "")

  const {
    data: { user },
  } = await supabase.auth.getUser(token)

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  await supabase
    .from("user_profile")
    .upsert({
      auth_user_id: user.id,
    })

  return Response.json({ success: true })
}

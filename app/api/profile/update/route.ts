import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.parish_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: req.headers.get("Authorization")!,
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("user_profile")
      .upsert(
        {
          auth_user_id: user.id,
          name: body.name,
          parish_id: body.parish_id,
          phone_number: body.phone_number,
          birthday: body.birthday
        },
        { onConflict: "auth_user_id" }
      );

    if (error) {

    console.log(error)
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (err) {
    console.log(err)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      website = "",
      social_link = "",
      service = "",
      budget = "",
      country = "",
      message = ""
    } = data;

    await env.DB.prepare(`
      INSERT INTO leads (
        name,
        email,
        phone,
        company,
        website,
        social_link,
        service,
        budget,
        country,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      name,
      email,
      phone,
      company,
      website,
      social_link,
      service,
      budget,
      country,
      message
    )
    .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead submitted successfully"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

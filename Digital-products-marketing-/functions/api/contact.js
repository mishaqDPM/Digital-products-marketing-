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
    
await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    access_key: "e1cb087c-1bf0-43d7-9d7c-81dbfe2e3ac5",
    subject: "New Lead Received - Digital Products Marketing",
    from_name: "Digital Products Marketing",

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
  })
});
    
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

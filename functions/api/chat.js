
export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const data = await request.json();
    const message = (data.message || "").trim();

    if (!message) {
      return Response.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const webhookURL = env.MAKE_WEBHOOK_URL;

    if (!webhookURL) {
      throw new Error("Make webhook is not configured");
    }

    const makeResponse = await fetch(
      webhookURL + "?message=" + encodeURIComponent(message)
    );

    if (!makeResponse.ok) {
      throw new Error("Make.com connection failed");
    }

    const answer = await makeResponse.text();

    return Response.json({
      success: true,
      answer: answer
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "AI service temporarily unavailable"
      },
      { status: 500 }
    );
  }
}


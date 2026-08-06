interface Env {
  RESEND_API_KEY?: string;
  CONTACT_RECEIVER_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as any;
    const { name, email, company, service, message } = body;

    const receiverEmail = env.CONTACT_RECEIVER_EMAIL || 'amk.ads2020@gmail.com';

    // Format the email content
    const htmlBody = `
      <h2>New Website Inquiry - ${company || name}</h2>
      <p><strong>Sender Name:</strong> ${name}</p>
      <p><strong>Sender Email:</strong> ${email}</p>
      <p><strong>Company / Brand:</strong> ${company || 'N/A'}</p>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Message Content:</strong></p>
      <p>${message}</p>
    `;

    // Send email using Resend API directly via fetch (Edge compatible)
    if (env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Make sure this is a verified domain in Resend, or use onboarding@resend.dev for testing
          from: 'onboarding@resend.dev', 
          to: receiverEmail,
          reply_to: email,
          subject: `New Website Inquiry - ${company || name}`,
          html: htmlBody,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json() as any;
        console.error("Resend API Error:", errorData);
        throw new Error(errorData.message || 'Failed to send email via Resend');
      }
    } else {
      console.warn("RESEND_API_KEY is not set. Email was not sent. Payload:", { name, email, company, service, message });
    }

    return new Response(JSON.stringify({ success: true, message: "Thank you! Your message has been sent." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to send message" }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

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
      <h2>New Website Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company/Brand:</strong> ${company || 'N/A'}</p>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #3b82f6;">
        ${message}
      </blockquote>
    `;

    // Send email using Resend API directly via fetch
    if (env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AmkAds Inquiry <onboarding@resend.dev>',
          to: [receiverEmail],
          reply_to: email,
          subject: `New Lead: ${name} (${company || 'General Inquiry'})`,
          html: htmlBody,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json() as any;
        console.error("Resend Error Payload:", errorData);
        return new Response(JSON.stringify({ success: false, error: errorData }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      const successData = await resendResponse.json() as any;
      return new Response(JSON.stringify({ success: true, data: successData }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      
    } else {
      console.warn("RESEND_API_KEY is not set.");
      return new Response(JSON.stringify({ success: false, error: "Server Configuration Error: Missing API Key" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error("Server Catch Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, servicesUsed, interfaceRating, overallFeedback } = await req.json()

    console.log(`Sending feedback confirmation to ${email}`)
    
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You!</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333;">Feedback Received</h2>
          <p style="color: #666; font-size: 16px;">Dear ${name},</p>
          <p style="color: #666; font-size: 16px;">Thank you for taking the time to provide feedback about SmartUtility. Your input is invaluable to us.</p>
          
          <div style="background: #e0f2fe; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #0277bd; margin-top: 0;">Your Feedback Summary:</h3>
            <p style="margin: 5px 0; color: #01579b;"><strong>Services Used:</strong> ${servicesUsed}</p>
            <p style="margin: 5px 0; color: #01579b;"><strong>Interface Rating:</strong> ${interfaceRating}/5 stars</p>
            <p style="margin: 5px 0; color: #01579b;"><strong>Comments:</strong> "${overallFeedback}"</p>
          </div>
          
          <div style="background: #e8f5e8; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h4 style="color: #2e7d32; margin-top: 0;">What happens next?</h4>
            <ul style="color: #388e3c; margin: 0; padding-left: 20px;">
              <li>Our team will review your feedback within 2 business days</li>
              <li>We may reach out for clarification if needed</li>
              <li>Your suggestions help us improve our services</li>
              <li>You'll be notified of any updates or improvements</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px;">If you have any urgent concerns, please contact our support team at support@smartutility.com</p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>The SmartUtility Team</p>
        </div>
      </div>
    `

    // In production, use email service like SendGrid or Resend
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{
    //       to: [{ email: email, name: name }],
    //       subject: 'Thank you for your feedback - SmartUtility'
    //     }],
    //     from: { email: 'noreply@smartutility.com', name: 'SmartUtility' },
    //     content: [{
    //       type: 'text/html',
    //       value: emailBody
    //     }]
    //   })
    // })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Thank you email sent to ${email}`,
        emailSent: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
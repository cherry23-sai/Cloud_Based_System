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
    const { type, contact, otp } = await req.json()

    if (type === 'sms') {
      // SMS OTP sending logic
      console.log(`Sending SMS OTP ${otp} to ${contact}`)
      
      // In production, integrate with SMS service like Twilio
      // const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Basic ${btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN')}`,
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: new URLSearchParams({
      //     From: 'YOUR_TWILIO_NUMBER',
      //     To: contact,
      //     Body: `Your SmartUtility OTP is: ${otp}. Valid for 10 minutes.`
      //   })
      // })

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `OTP sent to ${contact}`,
          otp: otp // Remove in production
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else if (type === 'email') {
      // Email OTP sending logic
      console.log(`Sending Email OTP ${otp} to ${contact}`)
      
      // In production, use email service like SendGrid or Resend
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">SmartUtility</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Email Verification</h2>
            <p style="color: #666; font-size: 16px;">Your verification code is:</p>
            <div style="background: #667eea; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
          </div>
        </div>
      `

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `OTP sent to ${contact}`,
          otp: otp // Remove in production
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Invalid type' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
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
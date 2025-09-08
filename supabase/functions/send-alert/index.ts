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
    const { type, contact, message, userName, meterType, limit } = await req.json()

    if (type === 'sms') {
      // SMS Alert sending logic
      console.log(`Sending SMS Alert to ${contact}: ${message}`)
      
      // In production, integrate with SMS service
      const smsMessage = `SmartUtility Alert: ${userName}, your ${meterType} consumption limit has been set to ${limit}. You will receive notifications when approaching this limit.`

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Alert sent via SMS to ${contact}`,
          sentMessage: smsMessage
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else if (type === 'email') {
      // Email Alert sending logic
      console.log(`Sending Email Alert to ${contact}: ${message}`)
      
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">SmartUtility Alert</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Consumption Limit Set</h2>
            <p style="color: #666; font-size: 16px;">Dear ${userName},</p>
            <p style="color: #666; font-size: 16px;">Your ${meterType} consumption limit has been successfully set.</p>
            <div style="background: #e6fffa; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;"><strong>Limit Set:</strong> ${limit} ${meterType === 'electricity' ? 'kWh' : 'Liters'}</p>
              <p style="margin: 10px 0 0 0; color: #065f46;">You will receive notifications when you approach this limit.</p>
            </div>
            <p style="color: #666; font-size: 14px;">Thank you for using SmartUtility to manage your consumption efficiently.</p>
          </div>
        </div>
      `

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Alert sent via email to ${contact}`,
          emailSent: true
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
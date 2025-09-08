const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';

export const sendOTP = async (type: 'sms' | 'email', contact: string): Promise<{ success: boolean; otp?: string; message: string }> => {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        contact,
        otp
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, message: 'Failed to send OTP' };
  }
};

export const sendLimitAlert = async (
  type: 'sms' | 'email', 
  contact: string, 
  userName: string, 
  meterType: 'electricity' | 'water', 
  limit: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        contact,
        userName,
        meterType,
        limit,
        message: `Limit set for ${meterType}: ${limit}`
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending alert:', error);
    return { success: false, message: 'Failed to send alert' };
  }
};

export const sendFeedbackConfirmation = async (
  name: string,
  email: string,
  servicesUsed: string,
  interfaceRating: number,
  overallFeedback: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-feedback-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        servicesUsed,
        interfaceRating,
        overallFeedback
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending feedback confirmation:', error);
    return { success: false, message: 'Failed to send confirmation email' };
  }
};
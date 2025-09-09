// For demo purposes, we'll simulate OTP sending without actual API calls
const DEMO_MODE = true;

export const sendOTP = async (type: 'sms' | 'email', contact: string): Promise<{ success: boolean; otp?: string; message: string }> => {
  try {
    // In demo mode, simulate OTP sending
    if (DEMO_MODE) {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        otp: otp,
        message: `Demo OTP sent to ${contact}`
      };
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const response = await fetch(`/api/send-otp`, {
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
    // In demo mode, still return success with a demo OTP
    if (DEMO_MODE) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      return {
        success: true,
        otp: otp,
        message: `Demo OTP: ${otp}`
      };
    }
    return { success: false, message: 'Failed to send OTP. Please try again.' };
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
    // In demo mode, simulate alert sending
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        message: `Demo alert sent to ${contact} for ${meterType} limit: ${limit}`
      };
    }
    
    const response = await fetch(`/api/send-alert`, {
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
    if (DEMO_MODE) {
      return {
        success: true,
        message: `Demo alert sent to ${contact}`
      };
    }
    return { success: false, message: 'Failed to send alert. Please try again.' };
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
    // In demo mode, simulate email sending
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        message: `Demo confirmation email sent to ${email}`
      };
    }
    
    const response = await fetch(`/api/send-feedback-confirmation`, {
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
    if (DEMO_MODE) {
      return {
        success: true,
        message: `Demo confirmation email sent to ${email}`
      };
    }
    return { success: false, message: 'Failed to send confirmation email. Please try again.' };
  }
};
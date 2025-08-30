import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  dob: string;
  area: string;
  water_meter_no: string;
  electricity_meter_no: string;
  created_at: string;
}

export interface UserFeedback {
  id: string;
  user_id: string;
  name: string;
  email: string;
  services_used: string;
  performance: string;
  interface_rating: number;
  overall_feedback: string;
  created_at: string;
}

export interface MeterReading {
  id: string;
  user_id: string;
  meter_type: 'electricity' | 'water';
  meter_no: string;
  reading_value: number;
  consumption: number;
  bill_amount: number;
  reading_date: string;
}
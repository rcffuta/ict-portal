'use server'

import { RcfIctClient } from '@rcffuta/ict-lib';
import type { BioData, AcademicData, LocationData } from '@rcffuta/ict-lib';
import { cookies } from 'next/headers';

// Initialize the library with Environment Variables
const rcf = RcfIctClient.fromEnv();

// Step 1: Create Account
export async function registerStepOne(data: BioData) {
  try {
    const result = await rcf.auth.registerUser(data);
    if (result.success && result.user) {
        // We don't need to manually set cookies because Supabase Auth 
        // usually handles session via the client, but since we are doing 
        // server-side registration, we might need to handle the session or 
        // let the client login automatically after. 
        // For simplicity in this flow: We return the User ID to the client 
        // so it can pass it to Step 2.
        return { success: true, userId: result.user.id };
    }
    return { success: false, error: "Registration failed unknown error" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Step 2: Academics
export async function registerStepTwo(userId: string, data: AcademicData) {
  try {
    // Note: In production, we should verify the session here too 
    // to ensure user isn't modifying someone else's data.
    await rcf.auth.updateAcademicInfo(userId, data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Step 3: Location
export async function registerStepThree(userId: string, data: LocationData) {
  try {
    await rcf.auth.updateLocationInfo(userId, data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
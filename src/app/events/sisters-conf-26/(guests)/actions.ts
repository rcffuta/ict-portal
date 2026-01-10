'use server'

import { RcfIctClient } from "@rcffuta/ict-lib";

// We use the SLUG we defined in SQL, not the UUID
const EVENT_SLUG = "sisters-conf-26"; 

export async function getEventDetails() {
  const rcf = RcfIctClient.fromEnv();
  // Fetch event details using the new service method
  const event = await rcf.event.getEventBySlug(EVENT_SLUG);
  return event;
}

export async function registerSisterAction(formData: FormData) {
  const rcf = RcfIctClient.fromEnv();

  // 1. Get Event ID first (to ensure it exists)
  const event = await rcf.event.getEventBySlug(EVENT_SLUG);
  if (!event) return { success: false, error: "Event not found or inactive" };

  // 2. Extract Data
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const isGuest = formData.get("isGuest") === "true";
  
  // Logic: Guests don't have levels, so we just label them "Guest"
  const level = isGuest ? "Guest" : (formData.get("level") as string);

  try {
    // 3. Call the updated Library method
    const result = await rcf.event.register({
      eventId: event.id, // Pass the UUID resolved from slug
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      level, 
      // Note: Department is removed as requested
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Registration Error:", error);
    return { success: false, error: error.message };
  }
}
import { z } from "zod";

export const eventTypeOptions = ["Wedding", "Engagement", "Birthday", "Corporate Event", "Baby Shower", "Private Party", "Other"] as const;
export const experienceOptions = ["Chocolate Experience", "Fresh Waffle Station", "Live Crêpe Atelier", "Strawberry & Chocolate Bar", "Kunafeh Creations", "Signature Dessert Station", "Not Sure — Help Me Choose"] as const;

export const enquirySchema = z.object({
  eventType: z.enum(["", ...eventTypeOptions]).refine((value) => value !== "", "Choose an event type."),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid event date.").refine((value) => new Date(`${value}T00:00:00Z`).getTime() >= new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z").getTime(), "Choose today or a future date."),
  serviceTime: z.string().min(1, "Choose a preferred service time."),
  location: z.string().trim().min(2, "Enter the event location.").max(120),
  venue: z.string().trim().max(120).optional(),
  guestCount: z.string().regex(/^\d{1,5}$/, "Enter an estimated guest count."),
  experiences: z.array(z.enum(experienceOptions)).min(1, "Choose an experience or select help choosing."),
  requirements: z.string().max(1500, "Please keep this under 1,500 characters.").optional(),
  fullName: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().regex(/^[+()\d\s.-]{7,25}$/, "Enter a valid phone number.").refine((value) => value.replace(/\D/g, "").length >= 7, "Enter at least 7 digits."),
  contactMethod: z.enum(["Email", "Phone", "Either"]),
  message: z.string().max(2000, "Please keep this under 2,000 characters.").optional(),
  consent: z.boolean().refine((value) => value, "Please agree to the privacy notice before sending."),
  companyWebsite: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;
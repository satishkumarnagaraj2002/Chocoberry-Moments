import type { Metadata } from "next";
import { EnquiryWizard } from "@/components/forms/EnquiryWizard";

export const metadata: Metadata = { title: "Plan Your Event", description: "Share your event details and explore a proposed Chocoberry Moments live dessert experience.", alternates: { canonical: "/enquire" } };

type SearchParams = Promise<{ occasion?: string; experience?: string }>;

export default async function EnquirePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL && process.env.ENQUIRY_TO_EMAIL);
  return <main id="main-content"><section className="page-section"><div className="container form-layout"><aside className="form-aside"><p className="eyebrow">A sweeter celebration starts here</p><h1 className="section-heading">Let’s create<br /><em>something sweet.</em></h1><p>Tell us about your event, and we’ll explore how to make it unforgettable. This enquiry is not a booking or a confirmation of availability.</p><p className="demo-caption">Service areas, pricing, packages and availability are not yet confirmed.</p></aside><EnquiryWizard initialOccasion={params.occasion} initialExperience={params.experience} emailConfigured={emailConfigured} /></div></section></main>;
}
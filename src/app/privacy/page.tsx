import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = { title: "Privacy Policy Draft", description: "A draft privacy notice for Chocoberry Moments enquiries. Requires legal and business-owner review before launch.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <main id="main-content"><PageHero eyebrow="Draft · review required" title={<>Your privacy<br /><em>matters.</em></>} subtitle="This proposed privacy notice requires review and approval by the business owner and legal adviser before publication." image={experiences[4].image} alt={experiences[4].alt} />
    <section className="page-section"><div className="container privacy-copy"><p className="eyebrow">Privacy policy draft</p><p><strong>Not a legally approved policy.</strong> This draft describes intended handling for the enquiry form only. Confirm the legal business identity, applicable privacy laws, retention period, contact details, processors and final wording before launch.</p>
      <h2>Information you provide</h2><p>The event enquiry form may ask for your name, email address, phone number, event details, dessert interests and message. Please avoid including sensitive personal information that is not needed to discuss your event.</p>
      <h2>Why information is requested</h2><p>Submitted details are intended to be used to review and respond to your event enquiry. The website does not intentionally store enquiry submissions. If an email provider is configured, submitted information will be transmitted to that provider and the designated business recipient for handling.</p>
      <h2>When the form is not connected</h2><p>If email delivery is not configured or delivery fails, the form will explain that your enquiry was not sent. Do not enter personal information unless the form confirms that delivery is available.</p>
      <h2>Cookies and analytics</h2><p>No analytics or marketing scripts are included in this initial implementation. Confirm any future tracking, cookie use and consent requirements before enabling those services.</p>
      <h2>Retention and your rights</h2><p>The business owner must confirm how enquiry emails are secured, who can access them, how long they are retained and how people can exercise applicable privacy rights. Add approved contact details and jurisdiction-specific procedures before publication.</p>
      <h2>Contact</h2><p>Contact information has not yet been approved. Add the responsible business contact before this notice is published.</p>
    </div></section>
  </main>;
}
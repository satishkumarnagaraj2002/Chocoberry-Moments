"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { eventTypeOptions, experienceOptions, enquirySchema, type EnquiryInput, type EnquiryValues } from "@/lib/validation";

const steps = ["Celebration", "Experience", "Your details", "Review"];
const stepFields: Array<Array<keyof EnquiryInput>> = [
  ["eventType", "eventDate", "serviceTime", "location", "venue", "guestCount"],
  ["experiences", "requirements"],
  ["fullName", "email", "phone", "contactMethod", "message", "consent"],
  [],
];

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span className="field-error" id={`${id}-error`} role="alert">{message}</span> : null;
}

export function EnquiryWizard({ initialOccasion, initialExperience, emailConfigured }: { initialOccasion?: string; initialExperience?: string; emailConfigured: boolean }) {
  const [step, setStep] = useState(0);
  const [formMessage, setFormMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const occasionValue = eventTypeOptions.find((value) => value.toLowerCase() === initialOccasion?.toLowerCase()) || "";
  const normalizedExperience = initialExperience?.replace(/^The /i, "");
  const experienceValue = experienceOptions.find((value) => value.toLowerCase() === normalizedExperience?.toLowerCase());
  const { register, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } = useForm<EnquiryInput, undefined, EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      eventType: occasionValue,
      eventDate: "",
      serviceTime: "",
      location: "",
      venue: "",
      guestCount: "",
      experiences: experienceValue ? [experienceValue] : [],
      requirements: "",
      fullName: "",
      email: "",
      phone: "",
      contactMethod: "Email",
      message: "",
      consent: false,
      companyWebsite: "",
    },
    mode: "onTouched",
  });
  const values = getValues();

  async function nextStep() {
    setFormMessage("");
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit(valuesToSend: EnquiryValues) {
    setFormMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valuesToSend),
      });
      const result = await response.json() as { ok?: boolean; code?: string };
      if (!response.ok || !result.ok) {
        if (result.code === "not_configured") {
          setFormMessage("Demo mode: this enquiry form is not connected yet. Your details have not been sent. The business must configure its email delivery before accepting enquiries.");
        } else if (response.status === 429) {
          setFormMessage("Too many attempts were made from this connection. Please try again later.");
        } else {
          setFormMessage("We could not send your enquiry. Your details have not been confirmed as received. Please try again later.");
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setFormMessage("We could not reach the enquiry service. Your details have not been sent. Please try again later.");
    }
  }

  if (submitted) return <div className="form-panel success-panel" role="status"><p className="eyebrow" style={{ justifyContent: "center" }}>A note has been sent</p><h2>Thank you for your enquiry.</h2><p>We&apos;ve received your details and look forward to discussing your celebration.</p></div>;

  return <form className="form-panel" noValidate onSubmit={handleSubmit(submit)}>
    <div className="form-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
      {steps.map((label, index) => <div className={`form-progress-step${index === step ? " is-current" : index < step ? " is-complete" : ""}`} key={label} aria-current={index === step ? "step" : undefined}>{String(index + 1).padStart(2, "0")} {label}</div>)}
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="companyWebsite">Leave this field empty</label><input id="companyWebsite" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} /></div>

    {step === 0 && <section aria-labelledby="step-title"><h2 className="form-step-title" id="step-title">Your celebration</h2><div className="form-grid">
      <div className="field"><label htmlFor="eventType">Event type *</label><select id="eventType" aria-invalid={Boolean(errors.eventType)} aria-describedby={errors.eventType ? "eventType-error" : undefined} {...register("eventType")}><option value="">Choose an event type</option>{eventTypeOptions.map((option) => <option key={option}>{option}</option>)}</select><FieldError id="eventType" message={errors.eventType?.message} /></div>
      <div className="field"><label htmlFor="eventDate">Event date *</label><input id="eventDate" type="date" min={new Date().toISOString().slice(0, 10)} aria-invalid={Boolean(errors.eventDate)} aria-describedby={errors.eventDate ? "eventDate-error" : undefined} {...register("eventDate")} /><FieldError id="eventDate" message={errors.eventDate?.message} /></div>
      <div className="field"><label htmlFor="serviceTime">Preferred service time *</label><select id="serviceTime" aria-invalid={Boolean(errors.serviceTime)} aria-describedby={errors.serviceTime ? "serviceTime-error" : undefined} {...register("serviceTime")}><option value="">Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>To be discussed</option></select><FieldError id="serviceTime" message={errors.serviceTime?.message} /></div>
      <div className="field"><label htmlFor="location">Event location *</label><input id="location" autoComplete="address-level2" placeholder="Town or city" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? "location-error" : undefined} {...register("location")} /><FieldError id="location" message={errors.location?.message} /></div>
      <div className="field"><label htmlFor="venue">Venue name, if known</label><input id="venue" autoComplete="organization" {...register("venue")} /><FieldError id="venue" message={errors.venue?.message} /></div>
      <div className="field"><label htmlFor="guestCount">Estimated guest count *</label><input id="guestCount" type="number" min="1" max="99999" inputMode="numeric" aria-invalid={Boolean(errors.guestCount)} aria-describedby={errors.guestCount ? "guestCount-error" : undefined} {...register("guestCount")} /><FieldError id="guestCount" message={errors.guestCount?.message} /></div>
    </div></section>}

    {step === 1 && <section aria-labelledby="step-title"><h2 className="form-step-title" id="step-title">Your dessert experience</h2><div className="field field--wide"><span className="field-label">What are you interested in? *</span><div className="choice-grid">{experienceOptions.map((option) => <label className="choice" key={option}><input type="checkbox" value={option} aria-invalid={Boolean(errors.experiences)} {...register("experiences")} />{option}</label>)}</div><FieldError id="experiences" message={errors.experiences?.message} /></div><div className="field field--wide" style={{ marginTop: "1.2rem" }}><label htmlFor="requirements">Anything else you have in mind?</label><textarea id="requirements" maxLength={1500} {...register("requirements")} /><FieldError id="requirements" message={errors.requirements?.message} /></div></section>}

    {step === 2 && <section aria-labelledby="step-title"><h2 className="form-step-title" id="step-title">Your details</h2><div className="form-grid">
      <div className="field field--wide"><label htmlFor="fullName">Full name *</label><input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} /><FieldError id="fullName" message={errors.fullName?.message} /></div>
      <div className="field"><label htmlFor="email">Email address *</label><input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} /><FieldError id="email" message={errors.email?.message} /></div>
      <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} /><FieldError id="phone" message={errors.phone?.message} /></div>
      <div className="field"><label htmlFor="contactMethod">Preferred contact method *</label><select id="contactMethod" {...register("contactMethod")}><option>Email</option><option>Phone</option><option>Either</option></select></div>
      <div className="field field--wide"><label htmlFor="message">Additional message</label><textarea id="message" maxLength={2000} {...register("message")} /><FieldError id="message" message={errors.message?.message} /></div>
      <div className="field field--wide"><label className="checkline"><input type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} /><span>I agree that my details may be used to respond to this event enquiry, as described in the <a href="/privacy" target="_blank" rel="noreferrer"><u>privacy policy draft</u></a>. *</span></label><FieldError id="consent" message={errors.consent?.message} /></div>
    </div></section>}

    {step === 3 && <section aria-labelledby="step-title"><h2 className="form-step-title" id="step-title">Review your enquiry</h2><div className="review-list">
      {[
        { label: "Celebration", value: `${values.eventType} · ${values.eventDate} · ${values.serviceTime}`, target: 0 },
        { label: "Location", value: `${values.location}${values.venue ? ` · ${values.venue}` : ""}`, target: 0 },
        { label: "Guests", value: values.guestCount, target: 0 },
        { label: "Dessert ideas", value: values.experiences.join(", "), target: 1 },
        { label: "Your details", value: `${values.fullName} · ${values.email} · ${values.phone}`, target: 2 },
        { label: "Contact preference", value: values.contactMethod, target: 2 },
      ].map(({ label, value, target }) => <div className="review-row" key={label}><span>{label}</span><strong>{value || "—"}</strong><button className="text-link" type="button" onClick={() => setStep(target)}>Edit</button></div>)}
    </div><p className="form-notice">{emailConfigured ? "Your enquiry will be sent to the business email configured for this site." : "Demo mode: email delivery is not configured. The form will not transmit or store your enquiry."}</p></section>}

    {formMessage && <p className="form-notice" role="alert">{formMessage}</p>}
    <div className="form-controls">
      {step > 0 ? <button className="button button--muted" type="button" onClick={() => { setFormMessage(""); setStep((current) => current - 1); }}><ArrowLeft size={15} /> Back</button> : <span />}
      {step < 3 ? <button className="button button--dark" type="button" onClick={nextStep}>Continue <ArrowRight size={15} /></button> : <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send my enquiry"} {!isSubmitting && <ArrowUpRight size={15} />}</button>}
    </div>
  </form>;
}
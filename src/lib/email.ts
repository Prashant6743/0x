import emailjs from "@emailjs/browser";

export type LeadEmailPayload = {
  name: string;
  email: string;
  company?: string;
  services: string;
  budget?: string;
  message: string;
  referral?: string;
};

const serviceId =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
  "lead_from_OX";

const templateId =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) ||
  "template_0x_studio_leads";

const publicKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
  "5FBQhj9FWXxSW_L3w";

export async function sendLeadEmail(lead: LeadEmailPayload) {
  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "EmailJS credentials missing in .env.local (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Skipping email dispatch.",
    );
    return;
  }

  const templateParams = {
    client_name: lead.name,
    client_email: lead.email,
    company: lead.company || "Not specified",
    services: lead.services,
    budget: lead.budget || "Not specified",
    message: lead.message,
    referral: lead.referral || "Not specified",
    submitted_at: new Date().toLocaleString(),
  };

  return emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });
}

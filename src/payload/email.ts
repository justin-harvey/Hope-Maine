import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import { town } from "@/town.config";

/**
 * Outgoing email, used for the password-reset messages /admin sends.
 *
 * Active only when SMTP_HOST is set. Without it this returns undefined and
 * Payload falls back to writing emails to the server console — fine for local
 * development, but on a live site password reset will not actually send, so
 * SMTP must be configured before launch (see SETUP.md).
 *
 * Any SMTP provider works: the town's existing mailbox, or a transactional
 * service like Resend, SendGrid, or Mailgun via their SMTP endpoint. Only the
 * host, port, and credentials change.
 */
export function buildEmailAdapter() {
  const host = process.env.SMTP_HOST;
  if (!host) return undefined;

  return nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || town.contact.email,
    defaultFromName: process.env.EMAIL_FROM_NAME || town.legalName,
    transportOptions: {
      host,
      port: Number(process.env.SMTP_PORT || 587),
      // Port 465 is implicit TLS; 587 upgrades with STARTTLS. Override with
      // SMTP_SECURE=true only if your provider wants implicit TLS on 587.
      secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    },
  });
}

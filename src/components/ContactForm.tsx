"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <p className="rounded-md bg-forest-700/10 px-4 py-3 text-sm font-medium text-forest-700">
          Thanks — this demo form doesn&apos;t send messages yet. Connect it to an email
          service or backend before launch.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-950">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-navy-950/20 px-3 py-2 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-950">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-navy-950/20 px-3 py-2 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-navy-950">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-navy-950/20 px-3 py-2 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-950">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-md border border-navy-950/20 px-3 py-2 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
      >
        Send Message
      </button>
    </form>
  );
}

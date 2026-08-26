"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldHint, FieldLabel } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <Notice variant="warning" title="Not sent">
          This form is not connected yet. To reach the Town Office today, call (207) 763-4199 or
          e-mail admin@hopemaine.org.
        </Notice>
      )}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Your name</FieldLabel>
          <Input id="name" name="name" type="text" autoComplete="name" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <FieldHint id="email-hint">We will only use this to reply to you.</FieldHint>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby="email-hint"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="subject">What is your message about?</FieldLabel>
          <Input id="subject" name="subject" type="text" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Your message</FieldLabel>
          <Textarea id="message" name="message" rows={6} required />
        </Field>
      </FieldGroup>

      <Button type="submit" size="lg" className="justify-self-start">
        Send message
      </Button>
    </form>
  );
}

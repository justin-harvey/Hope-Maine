"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Input, Textarea } from "@/components/ui/input";
import { CharacterCount } from "@/components/forms/CharacterCount";
import { ErrorSummary, type FieldError } from "@/components/forms/ErrorSummary";
import { FormField } from "@/components/forms/FormField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { town } from "@/town.config";

const NETLIFY_FORM_NAME = "road-report";
const DESCRIPTION_MAX = 800;

type Step = "location" | "problem" | "details" | "contact" | "check" | "done";

const FLOW: Step[] = ["location", "problem", "details", "contact", "check"];

type Data = {
  location: string;
  landmark: string;
  problem: string;
  severity: string;
  description: string;
  name: string;
  email: string;
  phone: string;
};

const EMPTY: Data = {
  location: "",
  landmark: "",
  problem: "",
  severity: "",
  description: "",
  name: "",
  email: "",
  phone: "",
};

const PROBLEM_OPTIONS = [
  { value: "Pothole or broken pavement", label: "Pothole or broken pavement" },
  { value: "Washout or erosion", label: "Washout or erosion", hint: "Including damage after heavy rain" },
  { value: "Fallen tree or branch", label: "Fallen tree or branch" },
  { value: "Drainage or culvert", label: "Drainage or culvert", hint: "Standing water, blocked culvert, or ditch" },
  { value: "Snow plowing or sanding", label: "Snow plowing or sanding" },
  { value: "Damaged or missing sign", label: "Damaged or missing sign" },
  { value: "Something else", label: "Something else" },
];

const SEVERITY_OPTIONS = [
  {
    value: "Dangerous now",
    label: "It is dangerous right now",
    hint: "The road is blocked or unsafe to drive",
  },
  { value: "Needs attention soon", label: "It needs attention soon" },
  { value: "Not urgent", label: "It is not urgent" },
];

const LABELS: Record<keyof Data, string> = {
  location: "Road name",
  landmark: "Nearest landmark or house number",
  problem: "Type of problem",
  severity: "How urgent is it",
  description: "Description",
  name: "Your name",
  email: "Email address",
  phone: "Phone number",
};

// Which step owns each field, so "Change" links and error links land in the
// right place.
const FIELD_STEP: Record<keyof Data, Step> = {
  location: "location",
  landmark: "location",
  problem: "problem",
  severity: "details",
  description: "details",
  name: "contact",
  email: "contact",
  phone: "contact",
};

function validate(step: Step, data: Data): FieldError[] {
  const errors: FieldError[] = [];

  if (step === "location") {
    if (!data.location.trim()) {
      errors.push({ field: "location", message: "Enter the name of the road" });
    }
  }

  if (step === "problem" && !data.problem) {
    errors.push({ field: "problem", message: "Select the type of problem" });
  }

  if (step === "details") {
    if (!data.severity) {
      errors.push({ field: "severity", message: "Select how urgent the problem is" });
    }
    if (!data.description.trim()) {
      errors.push({ field: "description", message: "Describe the problem" });
    } else if (data.description.length > DESCRIPTION_MAX) {
      errors.push({
        field: "description",
        message: `Description must be ${DESCRIPTION_MAX} characters or fewer`,
      });
    }
  }

  if (step === "contact") {
    if (!data.name.trim()) {
      errors.push({ field: "name", message: "Enter your name" });
    }
    if (!data.email.trim() && !data.phone.trim()) {
      errors.push({
        field: "email",
        message: "Enter an email address or a phone number so we can reach you",
      });
    } else if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.push({ field: "email", message: "Enter an email address in the correct format" });
    }
  }

  return errors;
}

export function RoadReportForm() {
  const [step, setStep] = useState<Step>("location");
  const [data, setData] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const [reference, setReference] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const set = (key: keyof Data, value: string) => setData((d) => ({ ...d, [key]: value }));
  const errorFor = (field: keyof Data) => errors.find((e) => e.field === field)?.message;

  // Moving between steps is a navigation, so send focus to the new heading.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (errors.length === 0) headingRef.current?.focus();
  }, [step, errors.length]);

  function goNext() {
    const found = validate(step, data);
    setErrors(found);
    if (found.length > 0) return;
    const index = FLOW.indexOf(step);
    setStep(FLOW[index + 1]);
  }

  function goBack() {
    setErrors([]);
    const index = FLOW.indexOf(step);
    if (index > 0) setStep(FLOW[index - 1]);
  }

  async function submit() {
    setSubmitting(true);
    setSubmitFailed(false);

    // Keyed by form-name, and posted to the static file that declares the
    // fields — see public/__forms.html. Posting to "/" is the older Netlify
    // pattern and no longer works under @netlify/plugin-nextjs v5, which
    // serves "/" from the Next runtime rather than as a form endpoint.
    const body = new URLSearchParams({ "form-name": NETLIFY_FORM_NAME, ...data });

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setReference(`HR-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      setStep("done");
    } catch {
      // Never claim a report was filed when it was not.
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  }

  const stepNumber = FLOW.indexOf(step) + 1;

  if (step === "done") {
    return (
      <div>
        <div className="border-2 border-green bg-green-wash p-6">
          <h1 className="heading-lg text-ink">Report received</h1>
          <p className="mt-3 body-lg text-ink">
            Your reference number is <span className="font-bold">{reference}</span>
          </p>
        </div>
        <h2 className="mt-8 heading-md text-ink">What happens next</h2>
        <p className="mt-2 measure body text-ink">
          The Town Office will review your report and pass it to the Road Commissioner. If you
          left contact details, someone will be in touch if more information is needed.
        </p>
        <p className="mt-3 measure body text-ink">
          If the road is dangerous right now and you have not heard back, call the Town Office on{" "}
          <a href={`tel:${town.contact.phone}`} className="prose-link font-semibold">
            {town.contact.phone}
          </a>
          . In an emergency, dial 911.
        </p>
        <p className="mt-6">
          <Link
            href="/"
            className="inline-flex min-h-[var(--tap-min)] items-center body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
          >
            Return to the home page
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="overline text-ink-muted">
        Step {stepNumber} of {FLOW.length}
      </p>

      <div className="mt-4">
        <ErrorSummary errors={errors} />
      </div>

      {submitFailed && (
        <div className="mt-4">
          <Notice variant="danger" title="Your report was not sent">
            Something went wrong sending your report, so nothing has been filed. Please try again,
            or call the Town Office on {town.contact.phone}.
          </Notice>
        </div>
      )}

      {step === "location" && (
        <section className="mt-6">
          <h1 ref={headingRef} tabIndex={-1} className="heading-lg text-ink outline-none">
            Where is the problem?
          </h1>
          <div className="mt-6 grid gap-8">
            <FormField
              id="location"
              label={LABELS.location}
              hint="For example, Hatchet Mountain Road"
              error={errorFor("location")}
            >
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  value={data.location}
                  onChange={(e) => set("location", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  autoComplete="off"
                />
              )}
            </FormField>

            <FormField
              id="landmark"
              label={LABELS.landmark}
              hint="Optional. Anything that helps us find the exact spot."
            >
              {({ id, describedBy }) => (
                <Input
                  id={id}
                  value={data.landmark}
                  onChange={(e) => set("landmark", e.target.value)}
                  aria-describedby={describedBy}
                  autoComplete="off"
                />
              )}
            </FormField>
          </div>
        </section>
      )}

      {step === "problem" && (
        <section className="mt-6">
          <h1 ref={headingRef} tabIndex={-1} className="heading-lg text-ink outline-none">
            What kind of problem is it?
          </h1>
          <div className="mt-6">
            <FormField id="problem" label={LABELS.problem} error={errorFor("problem")} legend>
              {({ describedBy }) => (
                <RadioGroup
                  name="problem"
                  firstId="problem"
                  options={PROBLEM_OPTIONS}
                  value={data.problem}
                  onChange={(v) => set("problem", v)}
                  describedBy={describedBy}
                />
              )}
            </FormField>
          </div>
        </section>
      )}

      {step === "details" && (
        <section className="mt-6">
          <h1 ref={headingRef} tabIndex={-1} className="heading-lg text-ink outline-none">
            Tell us about the problem
          </h1>
          <div className="mt-6 grid gap-8">
            <FormField id="severity" label={LABELS.severity} error={errorFor("severity")} legend>
              {({ describedBy }) => (
                <RadioGroup
                  name="severity"
                  firstId="severity"
                  options={SEVERITY_OPTIONS}
                  value={data.severity}
                  onChange={(v) => set("severity", v)}
                  describedBy={describedBy}
                />
              )}
            </FormField>

            <FormField
              id="description"
              label={LABELS.description}
              hint="Describe what you saw and roughly when."
              error={errorFor("description")}
            >
              {({ id, describedBy, invalid }) => (
                <>
                  <Textarea
                    id={id}
                    rows={6}
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                    aria-describedby={`${describedBy ?? ""} ${id}-count`.trim()}
                    aria-invalid={invalid}
                  />
                  <CharacterCount id={`${id}-count`} value={data.description} max={DESCRIPTION_MAX} />
                </>
              )}
            </FormField>
          </div>
        </section>
      )}

      {step === "contact" && (
        <section className="mt-6">
          <h1 ref={headingRef} tabIndex={-1} className="heading-lg text-ink outline-none">
            How can we reach you?
          </h1>
          <p className="mt-3 measure body text-ink">
            We only use these details to follow up on your report.
          </p>
          <div className="mt-6 grid gap-8">
            <FormField id="name" label={LABELS.name} error={errorFor("name")}>
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  autoComplete="name"
                />
              )}
            </FormField>

            <FormField
              id="email"
              label={LABELS.email}
              hint="Give an email address or a phone number, whichever suits you."
              error={errorFor("email")}
            >
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  autoComplete="email"
                />
              )}
            </FormField>

            <FormField id="phone" label={LABELS.phone}>
              {({ id, describedBy }) => (
                <Input
                  id={id}
                  type="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-describedby={describedBy}
                  autoComplete="tel"
                />
              )}
            </FormField>
          </div>
        </section>
      )}

      {step === "check" && (
        <section className="mt-6">
          <h1 ref={headingRef} tabIndex={-1} className="heading-lg text-ink outline-none">
            Check your answers
          </h1>
          <dl className="mt-6 border-t border-line">
            {(Object.keys(LABELS) as (keyof Data)[]).map((key) => (
              <div
                key={key}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3"
              >
                <dt className="body-sm font-bold text-ink">{LABELS[key]}</dt>
                <dd className="flex items-baseline gap-4">
                  <span className="body-sm text-ink">
                    {data[key] || <span className="text-ink-muted">Not provided</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(FIELD_STEP[key])}
                    className="body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                  >
                    Change<span className="sr-only"> {LABELS[key].toLowerCase()}</span>
                  </button>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Button type="button" size="lg" onClick={submit} disabled={submitting}>
              {submitting ? "Sending…" : "Submit report"}
            </Button>
          </div>
        </section>
      )}

      {step !== "check" && (
        <div className="mt-8">
          <Button type="button" size="lg" onClick={goNext}>
            Continue
          </Button>
        </div>
      )}

      {stepNumber > 1 && (
        <p className="mt-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body text-blue-link underline underline-offset-2 hover:decoration-[3px]"
          >
            <Icon name="chevron-right" size="xs" className="rotate-180" />
            Back
          </button>
        </p>
      )}
    </div>
  );
}

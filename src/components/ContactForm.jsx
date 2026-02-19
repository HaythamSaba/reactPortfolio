import { useForm, ValidationError } from "@formspree/react";
import GreenButton from "./GreenButton";

function ContactForm() {
  const [state, handleSubmit] = useForm("xvgbobnr");

  if (state.succeeded) {
    return (
      <div className="md:w-1/2 w-full gap-4 flex flex-col items-center justify-center bg-primary-200/10 p-8 rounded-md">
        <h3 className="text-center text-primary-400">Message Sent!</h3>
        <p className="text-center text-slate-300">
          Thanks for reaching out — I'll reply as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 w-full gap-4 flex flex-col bg-primary-200/10 p-6 rounded-md"
    >
      <input type="text" name="_gotcha" style={{ display: "none" }} />

      <h3 className="text-center mb-2">Let's get in touch</h3>

      <div className="flex flex-col gap-4">
        {/* Name */}
        <label htmlFor="name" className="text-slate-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          required 
          className="bg-transparent border border-primary-300 p-2 rounded-md text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-400 transition-colors"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email" className="text-slate-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          required
          className="bg-transparent border border-primary-300 p-2 rounded-md text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-400 transition-colors"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        {/* Message */}
        <label htmlFor="message" className="text-slate-300">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Your message"
          required
          rows={5}
          className="bg-transparent border border-primary-300 p-4 rounded-md text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-400 transition-colors resize-none"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <GreenButton
          type="submit"
          disabled={state.submitting}
          text={state.submitting ? "Sending..." : "Send Message"}
          className={`${
            state.submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </form>
  );
}

export default ContactForm;

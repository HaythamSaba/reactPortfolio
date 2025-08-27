import { useForm, ValidationError } from "@formspree/react";
import GreenButton from "./GreenButton";

function ContactForm() {
  const [state, handleSubmit] = useForm("xvgbobnr");
  if (state.succeeded) {
    return (
      <div className="md:w-1/2 w-full gap-4 flex flex-col bg-primary-200/10 p-4 rounded-md">
        <h3 className="text-center">Thanks for your message!</h3>
        <p className="text-center">I'll Replay as soon as possible</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 w-full gap-4 flex flex-col bg-primary-200/10 p-4 rounded-md"
    >
      <input type="text" name="_website" style={{ display: "none" }} />
      <h3 className="text-center">Let's get in touch</h3>
      <div className="flex flex-col gap-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          className="bg-transparent border border-primary-300 p-2 rounded-md"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="_replyto"
          id="email"
          placeholder="Your email"
          className="bg-transparent border border-primary-300 p-2 rounded-md"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="Your message"
          className="bg-transparent border border-primary-300 p-4 rounded-md"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <GreenButton
          type="submit"
          disabled={state.submitting}
          text="Send Message"
          className="px-6 py-3 bg-primary-500 text-background rounded-full shadow-lg outline-none"
        />
      </div>
    </form>
  );
}

export default ContactForm;

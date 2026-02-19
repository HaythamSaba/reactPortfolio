import { motion } from "framer-motion";
import { FaLinkedin, FaTelegram, FaGithub, FaInstagram } from "react-icons/fa"; // ✅ GitHub instead of Instagram
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    // ✅ Added bg-darkBackground, template, py-16
    <div id="contact" className="template bg-darkBackground min-h-screen py-16">
      <motion.div
        className="flex flex-col gap-6 mb-12 text-center items-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ✅ Responsive heading */}
        <h2 className="text-3xl md:text-7xl font-extrabold tracking-wide text-slate-100 text-center">
          Get in <span className="text-primary-400">Touch</span>
        </h2>
        {/* ✅ w-full on mobile, w-1/2 on desktop */}
        <p className="w-full md:w-1/2 text-slate-300 text-center">
          Let's make a difference together. Here is my contact information. If
          you have any questions or would like to work together, please don't
          hesitate to contact me.
        </p>
      </motion.div>

      <div className="flex justify-center gap-6 md:flex-row flex-col">
        <div className="md:w-1/2 w-full gap-6 flex flex-col">
          <ContactInfo />

          {/* Social Links */}
          <div className="flex flex-col justify-center items-center shadow-box px-8 py-4 rounded-full w-fit m-auto">
            <h5>Connect with me</h5>
            <div className="flex gap-4 mt-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/haytham-saba-401148278/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-300" // ✅ added transition
                aria-label="Visit my LinkedIn profile"
              >
                <FaLinkedin className="w-7 h-7" />
              </a>

              {/* GitHub — ✅ replaced Instagram */}
              <a
                href="https://github.com/HaythamSaba"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors duration-300"
                aria-label="Visit my GitHub profile"
              >
                <FaGithub className="w-7 h-7" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/someone_10110"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors duration-300"
                aria-label="Visit my Telegram profile"
              >
                <FaTelegram className="w-7 h-7" />
              </a>
              <a
                href="https://www.instagram.com/haytham_saba/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
                aria-label="Visit my Instagram profile"
              >
                <FaInstagram className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;

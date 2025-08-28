import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaTelegram } from "react-icons/fa";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div id="contact" className="min-h-screen">
      <motion.section
        className="flex flex-col gap-10 mb-10 overflow-hidden text-center justify-center items-center mt-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.h2 className="text-7xl font-extrabold tracking-wide text-slate-100 text-center">
          Get in <span className="text-primary-400">Touch</span>
        </motion.h2>
        <motion.p className="w-1/2">
          Let's make a difference.
          <br />
          Here is my contact information. If you have any questions or would
          like to work together, please don't hesitate to contact me.
        </motion.p>
      </motion.section>
      <div className="flex justify-center template gap-6 md:flex-row flex-col">
        <div className="md:w-1/2 w-full gap-4 flex flex-col">
          <ContactInfo />
          <div className="flex flex-col justify-center items-center shadow-box px-8 py-4 rounded-full w-fit m-auto">
            <h5>Connect with me</h5>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/haytham-saba-401148278/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaLinkedin className="w-7 h-7" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/haytham_saba/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram className="w-7 h-7" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/someone_20111"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500"
              >
                <FaTelegram className="w-7 h-7" />
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

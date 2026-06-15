import { motion } from "framer-motion";
import {
  InstagramIcon,
  FaLinkedinIcon,
  FaGithubIcon,
} from "../../icons/TechIcons";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SectionHeader from "../../ui/SectionHeader";
import SectionLayout from "../../layout/SectionLayout";

function Contact() {
  return (
    <SectionLayout>
      <SectionHeader
        title="Get in"
        secondEmphasisTitle="Touch"
        description="Let's make a difference together. Here is my contact information. If
          you have any questions or would like to work together, please don't
          hesitate to contact me."
      />

      <div className="flex w-full gap-6 md:gap-12 flex-col md:flex-row">
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
                className="hover:text-blue-500 transition-colors duration-300"
                aria-label="Visit my LinkedIn profile"
              >
                <FaLinkedinIcon className="w-7 h-7" />
              </a>

              <a
                href="https://github.com/HaythamSaba"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors duration-300"
                aria-label="Visit my GitHub profile"
              >
                <FaGithubIcon className="w-7 h-7" />
              </a>

              <a
                href="https://www.instagram.com/haytham_saba/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors duration-300"
                aria-label="Visit my Instagram profile"
              >
                <InstagramIcon className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </SectionLayout>
  );
}

export default Contact;

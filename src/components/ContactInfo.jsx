import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const contactItems = [
  {
    icon: <EnvelopeIcon className="w-8 h-8" />,
    label: "Email",
    value: "haythamsaba@gmail.com",
    href: "mailto:haythamsaba@gmail.com",
  },
  {
    icon: <MapPinIcon className="w-8 h-8" />,
    label: "Location",
    value: "Ljubljana, Slovenia",
    href: null,
  },
  {
    icon: <PhoneIcon className="w-8 h-8" />,
    label: "Availability",
    value: "Open to opportunities",
    href: null,
  },
];

function ContactInfo() {
  return (
    <div className="flex flex-col">
      <h3 className="text-center mb-6">Contact Information</h3>
      <div className="flex flex-col m-auto md:m-0 gap-4">
        {contactItems.map((item) => (
          <div key={item.label} className="flex gap-4 items-center">
            <span className="text-primary-800 p-4 hover:bg-background rounded-full bg-primary-300 hover:text-darkBackground transition-colors duration-300 shrink-0">
              {item.icon}
            </span>
            <div>
              <h4>{item.label}</h4>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-slate-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-slate-300">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;

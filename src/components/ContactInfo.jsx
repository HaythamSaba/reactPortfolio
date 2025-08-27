import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
function ContactInfo({ width = 8, hieght = 8, padding = 4 }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-center mb-4">Contact Information</h3>
      <div className=" flex flex-col m-auto md:m-0 justify-center md:justify-start">
        <div className="flex gap-4 items-center mb-4">
          <span className={`text-primary-800 p-${padding} hover:bg-background rounded-full bg-primary-300 hover:text-darkBackground transition-colors duration-300`}>
            <EnvelopeIcon className={`w-${width} h-${hieght} `} />
          </span>
          <div>
            <h4>Email</h4>
            <p>haythamsaba@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <span className={`text-primary-800 p-${padding} hover:bg-background rounded-full bg-primary-300 hover:text-darkBackground transition-colors duration-300`}>
            <PhoneIcon className={`w-${width} h-${hieght} `} />
          </span>
          <div>
            <h4>Phone</h4>
            <p>+386 31015236</p>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <span className={`text-primary-800 p-${padding} hover:bg-background rounded-full bg-primary-300 hover:text-darkBackground transition-colors duration-300`}>
            <MapPinIcon className={`w-${width} h-${hieght} `} />
          </span>
          <div>
            <h4>Address</h4>
            <p>Ljubljana, Slovenia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

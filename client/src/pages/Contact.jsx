import { EmailIcon, PhoneIcon } from "../assets/image";
import ContactForm from "../ui/ContactForm";
import RowOfLinks from "../ui/RowOfLinks";

const Contact = () => {
  return (
    <>
      <RowOfLinks currentPage="contact" />
      <div className="Container my-14 flex flex-wrap gap-8">
        <div className="order-2 w-full rounded-md px-9 pb-12 pt-10 shadow-lg shadow-neutral-200  md:order-1 md:w-[340px]  ">
          <div className="border-b border-black pb-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 ">
                <img src={PhoneIcon} alt="phone icon" />
                <strong className="text-base font-medium">Call To Us</strong>
              </div>
              <div>
                <p className="mb-4 text-[13.5px] font-medium">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-[13.5px] font-medium">
                  Phone: +8801611112222
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 ">
                <img src={EmailIcon} alt="Email icon" />
                <strong className="text-base font-medium">Write To US</strong>
              </div>
              <div>
                <p className="mb-4 text-[13.5px] font-medium">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mb-4 text-[13.5px] font-medium">
                  Emails: customer@exclusive.com
                </p>
                <p className="text-[13.5px] font-medium">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 flex-1 rounded-md px-8 py-10 shadow-lg shadow-neutral-200 md:order-2 ">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;

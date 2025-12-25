import { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn, fadeIn } from '../utils/motion';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="-mt-[4rem] xs:-mt-[6rem] sm:-mt-[8rem] flex flex-col items-center justify-center min-h-[300px] xs:min-h-[400px] px-4">
        <motion.div
          variants={fadeIn('up', 'spring', 0.1, 0.75)}
          className="bg-white p-6 xs:p-8 sm:p-12 rounded-2xl text-center max-w-xl shadow-lg">
          <h3 className={`text-gray-800 font-black text-[24px] xs:text-[30px] sm:text-[48px] md:text-[60px] font-poppins mb-4 xs:mb-6`}>Thank You!</h3>
          <p className="text-gray-600 text-[14px] xs:text-[16px] sm:text-[18px] leading-[22px] xs:leading-[26px] sm:leading-[30px]">
            We have received your quote request and will get back to you as soon as possible.
            Our team typically responds within 24-48 business hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="-mt-[4rem] xs:-mt-[6rem] sm:-mt-[10rem] xl:flex-row flex-col-reverse flex gap-6 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-1 bg-white p-4 xs:p-6 rounded-2xl shadow-lg">
        <p className={`${styles.sectionSubText} text-gray-500`}>Request a Quote</p>
        <h3 className={`text-gray-800 font-black text-[22px] xs:text-[26px] sm:text-[40px] md:text-[48px] font-poppins`}>Contact.</h3>

        <div className="mt-2 xs:mt-3 mb-3 xs:mb-4 p-2 xs:p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 text-[12px] xs:text-[14px] leading-[18px] xs:leading-[22px]">
            Please include: <span className="text-[#4fb3d9] font-semibold">aircraft type</span> (make, model), <span className="text-[#4fb3d9] font-semibold">condition</span>, and <span className="text-[#4fb3d9] font-semibold">services needed</span>.
          </p>
        </div>

        <form
          name="quote-request"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={() => setSubmitted(true)}
          className="flex flex-col gap-2 xs:gap-3 font-poppins">
          <input type="hidden" name="form-name" value="quote-request" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1.5 xs:mb-2 text-[13px] xs:text-[14px]">Your Name *</span>
              <input
                type="text"
                name="name"
                required
                placeholder="John Smith"
                className="bg-gray-50 py-2.5 xs:py-3 px-3 xs:px-4
                placeholder:text-gray-400
                text-gray-800 rounded-lg outline-none
                border border-gray-200 font-medium focus:border-[#4fb3d9] transition-colors text-[13px] xs:text-[14px]"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1.5 xs:mb-2 text-[13px] xs:text-[14px]">Your Email *</span>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="bg-gray-50 py-2.5 xs:py-3 px-3 xs:px-4
                placeholder:text-gray-400
                text-gray-800 rounded-lg outline-none
                border border-gray-200 font-medium focus:border-[#4fb3d9] transition-colors text-[13px] xs:text-[14px]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1.5 xs:mb-2 text-[13px] xs:text-[14px]">Phone Number</span>
              <input
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                className="bg-gray-50 py-2.5 xs:py-3 px-3 xs:px-4
                placeholder:text-gray-400
                text-gray-800 rounded-lg outline-none
                border border-gray-200 font-medium focus:border-[#4fb3d9] transition-colors text-[13px] xs:text-[14px]"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-1.5 xs:mb-2 text-[13px] xs:text-[14px]">Aircraft Type</span>
              <input
                type="text"
                name="aircraft-type"
                placeholder="e.g., Cessna 172, Gulfstream G650"
                className="bg-gray-50 py-2.5 xs:py-3 px-3 xs:px-4
                placeholder:text-gray-400
                text-gray-800 rounded-lg outline-none
                border border-gray-200 font-medium focus:border-[#4fb3d9] transition-colors text-[13px] xs:text-[14px]"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1.5 xs:mb-2 text-[13px] xs:text-[14px]">
              Message / Project Details *
            </span>
            <textarea
              rows="3"
              name="message"
              required
              placeholder="Please describe the current condition of your aircraft and the services you're interested in..."
              className="bg-gray-50 py-2.5 xs:py-3 px-3 xs:px-4
              placeholder:text-gray-400
              text-gray-800 rounded-lg outline-none
              border border-gray-200 font-medium resize-none focus:border-[#4fb3d9] transition-colors text-[13px] xs:text-[14px]"
            />
          </label>

          <button
            type="submit"
            className="flex justify-center text-[13px] xs:text-[14px] sm:text-[16px] text-white
            font-bold font-poppins items-center py-2.5 xs:py-3 px-4 xs:px-6
            rounded-lg bg-[#4fb3d9]
            hover:bg-[#3a9dc3]
            transition duration-300 ease-in-out uppercase tracking-wider shadow-md mt-1 xs:mt-2">
            Submit Quote Request
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

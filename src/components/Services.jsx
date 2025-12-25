import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { vacuum, brightwork, ceramic, polish, wash, detailing } from '../assets';

const serviceData = [
  {
    title: "Interior Detailing",
    description: "Complete interior refinement to restore your aircraft cabin to pristine condition.",
    backDescription: "Our interior detailing includes cockpit touchup, thorough vacuuming, and comprehensive disinfecting. For an additional cost, we offer premium services such as leather seat cleaning and conditioning, as well as carpet extractions and shampoo treatments.",
    image: vacuum
  },
  {
    title: "Wet Wash",
    description: "Thorough deep cleaning using water-based methods for a comprehensive wash.",
    backDescription: "Our wet wash service includes pre-soak treatment, bug removal, belly grease removal, complete scrub down and removal of all gunk underneath the aircraft. We also perform deep cleaning on gears (gear wells not included) and finish with a full wash of your entire aircraft.",
    image: wash
  },
  {
    title: "Basic Exterior Detailing",
    description: "Professional exterior cleaning without the use of water for a quick refresh.",
    backDescription: "Our basic exterior detailing provides full cleaning of all exterior surfaces without the use of water. This dry cleaning method is ideal for regular maintenance and keeps your aircraft looking sharp between more intensive washes.",
    image: detailing
  },
  {
    title: "Paint Polish",
    description: "Restore your aircraft's exterior finish to a brilliant, showroom shine.",
    backDescription: "We offer full exterior paint polish services to restore and enhance your aircraft's painted surfaces. Our professional polishing removes oxidation, minor scratches, and imperfections, leaving your aircraft with a brilliant, mirror-like finish.",
    image: polish
  },
  {
    title: "Ceramic Coating",
    description: "Advanced protective coating for long-lasting shine and protection.",
    backDescription: "Our ceramic coating service provides a durable, hydrophobic layer that protects your aircraft's paint from UV rays, environmental contaminants, and oxidation. Benefits include easier cleaning, enhanced gloss, reduced maintenance, and protection that lasts significantly longer than traditional wax.",
    image: ceramic
  },
  {
    title: "Brightwork",
    description: "Specialized polishing and restoration of metal surfaces and trim.",
    backDescription: "Brightwork service focuses on polishing and restoring all metal surfaces including chrome, stainless steel, and aluminum trim. This service removes tarnish, oxidation, and corrosion, bringing back the original luster and protecting these surfaces from future degradation. Proper brightwork maintenance enhances appearance and extends the life of metal components.",
    image: brightwork
  },
];

const ServiceCard = ({ index, title, description, backDescription, image }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5 * index, 0.75)}
      className="w-full xs:w-[320px] sm:w-[350px] h-[400px] xs:h-[420px] perspective-1000 mx-auto">
      <div
        className={`relative w-full h-full transition-transform duration-700 cursor-pointer`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={() => setIsFlipped(!isFlipped)}>

        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-white rounded-[20px] shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}>
          <div className="h-[180px] xs:h-[200px] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 xs:p-6">
            <h3 className="text-gray-800 text-[18px] xs:text-[20px] font-bold text-center mb-3 xs:mb-4">
              {title}
            </h3>
            <p className="text-gray-600 text-[13px] xs:text-[14px] text-center leading-[20px] xs:leading-[22px]">
              {description}
            </p>
            <p className="text-[#4fb3d9] text-[11px] xs:text-[12px] text-center mt-3 xs:mt-4 font-medium">
              Tap to learn more →
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-[#4fb3d9] rounded-[20px] shadow-lg overflow-hidden p-4 xs:p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}>
          <h3 className="text-white text-[18px] xs:text-[20px] font-bold text-center mb-3 xs:mb-4">
            {title}
          </h3>
          <p className="text-white text-[12px] xs:text-[14px] text-center leading-[20px] xs:leading-[24px]">
            {backDescription}
          </p>
          <p className="text-white/80 text-[11px] xs:text-[12px] text-center mt-3 xs:mt-4 font-medium">
            ← Tap to flip back
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="mt-4">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-gray-500`}>What We Offer</p>
        <h2 className={`${styles.sectionHeadText}`}>Services.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-gray-600 text-[16px] xs:text-[18px] max-w-3xl leading-[26px] xs:leading-[30px]">
          At Ascend Aviation Refinement, we offer a comprehensive range of services designed to keep your
          aircraft looking and performing at its best. Each service is performed by our trained specialists
          using premium products and proven techniques.
        </motion.p>
      </div>

      <div className="mt-10 xs:mt-16 flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10">
        {serviceData.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Services, 'services');

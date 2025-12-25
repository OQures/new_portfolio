import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const About = () => {
  return (
    <div className="-mt-[3rem] xs:-mt-[4rem] sm:-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-gray-500`}>Who We Are</p>
        <h2 className={styles.sectionHeadText}>About Us.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-3 xs:mt-4 text-gray-600 text-[15px] xs:text-[16px] sm:text-[18px] max-w-3xl leading-[24px] xs:leading-[26px] sm:leading-[30px]">
        <b className='text-gray-800'>Ascend Aviation Refinement</b> is a premier aircraft detailing and restoration company
        dedicated to elevating your aviation experience. With years of expertise in the industry, our team of skilled
        professionals treats every aircraft with the precision and care it deserves.
      </motion.p>

      <motion.p
        variants={fadeIn('', '', 0.2, 1)}
        className="mt-3 xs:mt-4 text-gray-600 text-[15px] xs:text-[16px] sm:text-[18px] max-w-3xl leading-[24px] xs:leading-[26px] sm:leading-[30px]">
        We understand that your aircraft is more than just a mode of transportation—it's an investment, a statement,
        and often a passion. That's why we use only the <b className='text-gray-800'>highest quality products</b> and
        <b className='text-gray-800'> industry-leading techniques</b> to deliver results that exceed expectations.
      </motion.p>

      <motion.p
        variants={fadeIn('', '', 0.3, 1)}
        className="mt-3 xs:mt-4 text-gray-600 text-[15px] xs:text-[16px] sm:text-[18px] max-w-3xl leading-[24px] xs:leading-[26px] sm:leading-[30px]">
        Whether you own a single-engine propeller aircraft, a corporate jet, or a vintage restoration project,
        our comprehensive services are tailored to meet your specific needs. We take pride in our
        <b className='text-gray-800'> attention to detail</b>, <b className='text-gray-800'>commitment to excellence</b>,
        and <b className='text-gray-800'>passion for aviation</b>.
      </motion.p>
    </div>
  );
};

export default SectionWrapper(About, 'about');

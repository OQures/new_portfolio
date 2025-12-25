import { motion } from 'framer-motion';
import { styles } from '../styles';

const Hero = () => {
  return (
    <>
      <section
        className="relative flex sm:flex-row flex-col w-full min-h-screen mx-auto overflow-hidden">
        {/* Full-screen Gulfstream Jet Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Gulfstream private jet"
            className="w-full h-full object-cover object-center"
          />
          {/* White overlay for better text readability */}
          <div className="absolute inset-0 bg-white/60" />
        </div>

        {/* Content area */}
        <div
          className={`relative z-10 top-[120px] xs:top-[140px] sm:top-[200px]
          lg:top-[180px] xl:top-[200px] ${styles.paddingX}
          max-w-7xl mx-auto flex flex-row items-start
          justify-between gap-3`}>
          <div className="flex flex-col justify-center items-center mt-5 ml-1 xs:ml-3">
            <div className="w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-[#4fb3d9] sm:hidden" />
            <div className="w-1 sm:h-80 h-32 xs:h-40 bg-gradient-to-b from-[#4fb3d9] to-transparent sm:hidden" />
          </div>

          <div className="max-w-2xl flex-1">
            <h1
              className={`text-gray-800 font-poppins uppercase font-black text-[28px] xs:text-[35px] sm:text-[55px] lg:text-[70px] leading-[36px] xs:leading-[45px] sm:leading-[65px] lg:leading-[85px] mt-2`}>
              Elevate Your{' '}
              <span
                className="text-[#4fb3d9] text-[35px] xs:text-[45px] sm:text-[70px] lg:text-[80px] font-mova
                font-extrabold uppercase block xs:inline">
                Aircraft
              </span>
            </h1>
            <p className={`mt-3 xs:mt-4 text-gray-700 text-[15px] xs:text-[16px] sm:text-[18px] lg:text-[22px] max-w-xl leading-[24px] xs:leading-[26px] sm:leading-[30px] font-poppins`}>
              Premium aviation refinement services that bring your aircraft to showroom condition.
              From meticulous interior detailing to flawless exterior polishing, we deliver excellence at every altitude.
            </p>
            <a href="#contact">
              <button className="mt-6 xs:mt-8 px-6 xs:px-8 py-3 xs:py-4 bg-[#4fb3d9] text-white text-[14px] xs:text-[16px] font-bold font-poppins rounded-lg
                hover:bg-[#3a9dc3] transition duration-300 ease-in-out uppercase tracking-wider shadow-lg">
                Request a Quote
              </button>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 xs:bottom-10 w-full z-20
          flex justify-center items-center">
          <a href="#about">
            <div
              className="w-[30px] h-[54px] xs:w-[35px] xs:h-[64px] rounded-3xl border-4
            border-[#4fb3d9] flex
            justify-center items-start p-2 bg-black/30 backdrop-blur-sm">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-[#4fb3d9] mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;

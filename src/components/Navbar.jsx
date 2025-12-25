import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-1 xs:py-2 fixed
      top-0 z-20 bg-black sm:opacity-[0.97] shadow-sm`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}>
          <img
            src={logo}
            alt="Ascend Aviation Refinement"
            className="w-[140px] h-[65px] xs:w-[180px] xs:h-[80px] sm:w-[240px] sm:h-[110px] object-contain"
          />
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-8 lg:gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-[#4fb3d9]' : 'text-white'
              } hover:text-[#4fb3d9] text-[16px] lg:text-[18px] font-medium font-poppins
                uppercase tracking-[2px] lg:tracking-[3px] cursor-pointer transition duration-300`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* mobile */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          {toggle ? (
            <div
              className={`p-4 xs:p-6 bg-black opacity-[0.98] absolute
                top-0 left-0 w-screen h-[100vh] z-10 menu ${
                  toggle ? 'menu-open' : 'menu-close'
                }`}>
              <div className="flex justify-end">
                <div
                  className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer text-white text-2xl"
                  onClick={() => setToggle(!toggle)}>
                  ✕
                </div>
              </div>
              <ul
                className="list-none flex flex-col gap-6 xs:gap-8
                items-center justify-center mt-[6rem] xs:mt-[8rem]">
                {navLinks.map((nav) => (
                  <li
                    id={nav.id}
                    key={nav.id}
                    className={`${
                      active === nav.title ? 'text-[#4fb3d9]' : 'text-white'
                    } text-[26px] xs:text-[32px] font-bold font-poppins
                      uppercase tracking-[2px] cursor-pointer`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}>
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className="w-[30px] h-[30px] xs:w-[34px] xs:h-[34px] flex items-center justify-center cursor-pointer text-white text-xl xs:text-2xl"
              onClick={() => setToggle(!toggle)}>
              ☰
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

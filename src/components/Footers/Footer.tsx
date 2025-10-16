"use client";
import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <>
      <footer className='relative bg-primary py-15'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
            {/* Left column: Logo, Socials, Copyright */}
            <div className='px-4'>
              <div className='flex items-center justify-center lg:justify-start mb-2'>
                <img
                  src='/BLUE_LOGO.jpg'
                  alt='RegLex Logo'
                  className='h-12 w-auto object-contain'
                />
              </div>

              <div className='mt-2 flex justify-center lg:justify-start'>
                <a
                  href='https://linkedin.com/company/reglex-global'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-blue-600 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-flex hover:bg-blue-700 transition-colors duration-200'
                >
                  <i className='fab fa-linkedin'></i>
                </a>
                <a
                  href='https://instagram.com/reglexglobal'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-pink-500 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-flex hover:bg-pink-600 transition-colors duration-200'
                >
                  <i className='fab fa-instagram'></i>
                </a>
                <a
                  href='https://wa.me/971501234567'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-green-500 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-flex hover:bg-green-600 transition-colors duration-200'
                >
                  <i className='fab fa-whatsapp'></i>
                </a>
                <a
                  href='mailto:info@reglexglobal.com'
                  className='bg-red-500 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-flex hover:bg-red-600 transition-colors duration-200'
                >
                  <i className='fas fa-envelope'></i>
                </a>
              </div>
              <div className='mt-4 text-center lg:text-left text-gray-200 text-sm'>
                Copyright © {new Date().getFullYear()} RegLex. All rights
                reserved.
              </div>
            </div>

            {/* Center column: Contact CTA */}
            <div className='px-4 flex flex-col  justify-center text-justify'>
              <h4 className='text-2xl font-semibold text-white mb-3'>
                Contact Us
              </h4>
              <p className='text-gray-200 mb-4'>Partner with RegLex to navigate complex regulations confidently and achieve seamless compliance.</p>
              <div className='flex flex-col sm:flex-row gap-3'>
                {
                  <button
                    onClick={onOpenContact}
                    className='px-3 py-2 bg-white text-primary text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200'
                  >
                    Contact Us
                  </button>
                }
              </div>
            </div>

            {/* Right column: Links */}
            <div className='px-4'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <span className='block uppercase text-white text-sm font-semibold mb-2'>
                    Useful Links
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <Link
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='/#about-reglex'
                      >
                        About RegLex
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='/#reglex-edge'
                      >
                        RegLex Edge
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='/#founding-insight'
                      >
                        Founding Insight
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='/#advisory-portfolio'
                      >
                        Advisory Portfolio
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <span className='block uppercase text-white text-sm font-semibold mb-2'>
                    Other Resources
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <a
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='https://github.com'
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='https://github.com'
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-200 hover:text-white font-semibold block pb-2 text-sm'
                        href='mailto:admin@rlgc.ae'
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

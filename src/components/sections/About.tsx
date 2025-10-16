"use client";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id='about-reglex' className='py-20 bg-gray-100 scroll-mt-24'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          {/* Image - Fade & Slide In from Right */}
          <motion.div
            className='w-full lg:w-5/12 order-1 lg:order-2'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src='/reglexAbout.jpeg'
              alt='About RegLex'
              className='w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg'
            />
          </motion.div>

          {/* Content - Fade & Slide In from Left */}
          <motion.div
            className='w-full lg:w-7/12 order-2 lg:order-1'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='mb-8 lg:mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4'>
                About Us
              </h2>
              <motion.div
                className='w-20 h-1 bg-primary mb-6 lg:mb-8'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <div className='space-y-6 text-justify'>
              <p className='text-base sm:text-lg  leading-relaxed text-slate-600'>
                RegLex Global Consultancy LLC ("RegLex" or "RLGC") is a boutique
                regulatory and compliance advisory firm built on the principles
                of precision, discretion, and depth. We partner with select
                clients across financial and non-financial sectors to design,
                implement, and enhance governance, risk, and compliance
                frameworks that meet the highest international standards.
              </p>

              <p className='text-base sm:text-lg leading-relaxed text-slate-600'>
                We operate at the intersection of law, regulation, and
                operational execution, helping institutions navigate complex UAE
                and cross-border regulatory landscapes with clarity and
                confidence. Every engagement is bespoke—tailored to the client's
                business model, regulatory exposure, and jurisdictional
                footprint.
              </p>

              <p className='text-base sm:text-lg leading-relaxed text-slate-600'>
                Our focus lies in delivering advisory that is practical,
                defensible, and regulator-ready—bridging the gap between
                compliance theory and operational reality.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

export default function FoundingInsight() {
  return (
    <section
      id='founding-insight'
      className='py-16 sm:py-20 bg-white scroll-mt-24'
    >
      <div className='container mx-auto px-4'>
        {/* Heading */}
        <motion.div
          className='mb-8 lg:mb-16'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4'>
            Founding Insight
          </h2>
          <motion.div
            className='w-20 h-1 bg-primary mb-8'
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-12'>
          {/* Image/Profile column */}
          <motion.div
            className='w-full lg:w-5/12 order-1 lg:order-1'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            viewport={{ once: true }}
          >
            <div className='text-center flex flex-col items-center '>
              <div className='relative w-full h-72 sm:h-96 lg:h-[32rem] mb-6 rounded-lg shadow-lg overflow-hidden'>
                <Image
                  src='/founding.webp'
                  alt='Jibran Ahmed Tak'
                  fill
                  sizes='(max-width: 1024px) 100vw, 40vw'
                  className='object-cover'
                  priority={false}
                />
              </div>
              <motion.h3
                className='text-xl sm:text-2xl font-bold text-primary mb-2'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                JIBRAN AHMED TAK
              </motion.h3>
              <motion.p
                className='text-base sm:text-lg font-semibold text-primary mb-2'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                FOUNDER & MANAGING DIRECTOR
              </motion.p>
              <motion.p
                className='text-base sm:text-lg font-semibold text-primary mb-2'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                LAWYER | REGULATORY & COMPLIANCE SPECIALIST
              </motion.p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className='w-full lg:w-7/12 order-2 lg:order-2 text-justify'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            viewport={{ once: true }}
          >
            <div className='space-y-6 text-slate-700'>
              {[
                "At RegLex, our vision is simple — to redefine compliance as a discipline of precision, not paperwork.",
                "Over the years, I have seen that true regulatory excellence is not achieved through templates or tick-boxes, but through a deep understanding of the law, the regulator's intent, and the client's business reality.",
                "As a lawyer and an authorized MLRO and Compliance Officer under the DFSA, I've had the privilege of working across multiple regulatory regimes — including the CBUAE, SCA, VARA, and DNFBPs — guiding institutions through both challenge and change.",
                "That experience shapes our philosophy: we don't just advise; we partner, interpret, and implement.",
                "RegLex Global was built to serve a select group of clients who value accuracy, discretion, and insight. We measure success not by volume, but by the trust we earn and the standards we uphold.",
                "Because in an evolving regulatory world, clarity is the ultimate competitive edge — and that's what we deliver.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className='text-base sm:text-lg leading-relaxed'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                className='mt-8 lg:-ml-8'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className='relative w-80 h-20'>
                  <Image
                    src='/image.webp'
                    alt='Jibran Ahmed Tak Signature'
                    fill
                    sizes='320px'
                    className='object-contain'
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

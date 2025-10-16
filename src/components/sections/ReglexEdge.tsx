"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ReglexEdge() {
  return (
    <section id='reglex-edge' className='py-20 bg-gray-100 scroll-mt-24'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>

          {/* Image - Mobile First */}
          <motion.div
            className='w-full lg:w-5/12 order-1 lg:order-1'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src='/reglexEdge.jpeg'
              alt='RegLex Edge'
              className='w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg'
            />
          </motion.div>

          {/* Content - Mobile First */}
          <motion.div
            className='w-full lg:w-6/12 order-2 lg:order-2'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='mb-8 lg:mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4'>
                Reglex Edge
              </h2>
              <motion.div
                className='w-20 h-1 bg-primary mb-6 lg:mb-8'
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <p className='text-base sm:text-lg text-justify text-slate-700 mb-6 leading-relaxed'>
              Our distinction lies not in scale — but in substance, selectivity,
              and precision. We work with a limited number of clients, ensuring
              every mandate receives the depth and focus it deserves.
            </p>

            <ul className='space-y-4 text-base sm:text-lg text-slate-600'>
              {[
                {
                  title: "Regulatory Depth",
                  desc: "Advisory rooted in rulebook interpretation and practical understanding of DFSA, CBUAE, SCA, VARA, and MOE frameworks.",
                },
                {
                  title: "Boutique by Design",
                  desc: "We are deliberately selective — offering unmatched confidentiality, responsiveness, and quality of execution.",
                },
                {
                  title: "Cross-Sector Expertise",
                  desc: "Experience spanning financial institutions, fintechs, insurers, exchange houses, DNFBPs, and corporates.",
                },
                {
                  title: "Bespoke Solutions",
                  desc: "Every policy, framework, or assessment is designed from the ground up — no templates, no shortcuts.",
                },
                {
                  title: "Assurance Through Discretion",
                  desc: "We operate with the confidentiality and discipline expected of a strategic advisor. Our reputation rests on trust, not promotion.",
                },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className='flex items-start text-justify'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className='text-primary mr-3 mt-1 font-bold'>•</span>
                  <div>
                    <span className='font-semibold text-slate-700'>
                      {item.title}:
                    </span>{" "}
                    {item.desc}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

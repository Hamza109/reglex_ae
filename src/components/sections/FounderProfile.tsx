"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FounderProfile() {
  return (
    <section id='founder-profile' className='py-20 bg-primary scroll-mt-24'>
      <div className='container mx-auto px-4'>
        {/* Heading */}
        <motion.div
          className='mb-16'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className='text-5xl font-bold text-white mb-4'>
            Founder Profile
          </h2>
          <motion.div
            className='w-20 h-1 bg-white mb-8'
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        <div className='flex flex-wrap items-start -mx-4'>
          <motion.div
            className='w-full px-4 mt-8 md:mt-0'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className='space-y-8'>
              {/* Professional Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className='text-2xl font-bold text-white mb-4'>
                  Professional Summary
                </h4>
                <p className='text-lg text-gray-200 leading-relaxed'>
                  Jibran Ahmed Tak is a distinguished lawyer and regulatory
                  compliance specialist with over 15 years of experience in the
                  UAE financial services sector. As an authorized MLRO and
                  Compliance Officer under the DFSA, he has successfully guided
                  numerous institutions through complex regulatory landscapes.
                </p>
              </motion.div>

              {/* Professional Qualifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className='text-2xl font-bold text-white mb-4'>
                  Professional Qualifications
                </h4>
                <div className='bg-white bg-opacity-10 p-6 rounded-lg'>
                  <ul className='space-y-3 font-semibold text-slate-500'>
                    {[
                      "B.A.LLB (Hons)",
                      "Enrolled Advocate – Bar Council of India",
                      "Associate Member - International Compliance Association",
                      "Dubai Financial Services Authority (DFSA) Approved Money Laundering Reporting Officer/Compliance Officer",
                      "Post Graduate Diploma in International Trade and Business Law",
                      "International Compliance Association Certificate in Anti Money Laundering",
                      "International Compliance Association/Ministry of Economy Certificate in AML/CFT for DNFBPs",
                    ].map((item, i) => (
                      <li key={i} className='flex items-start'>
                        <span className='text-slate-700 mr-3'>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Regulatory Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className='text-2xl font-bold text-white mb-4'>
                  Regulatory Expertise
                </h4>
                <div className='grid md:grid-cols-2 gap-4'>
                  {[
                    {
                      title: "DFSA (Dubai Financial Services Authority)",
                      desc: "Authorized MLRO and Compliance Officer with extensive experience in DIFC regulations",
                    },
                    {
                      title: "CBUAE (Central Bank of UAE)",
                      desc: "Deep understanding of UAE banking regulations and compliance requirements",
                    },
                    {
                      title: "SCA (Securities and Commodities Authority)",
                      desc: "Expertise in securities regulations and capital markets compliance",
                    },
                    {
                      title: "VARA (Virtual Assets Regulatory Authority)",
                      desc: "Specialized knowledge in digital assets and cryptocurrency regulations",
                    },
                    {
                      title: "DNFBPs (Designated Non-Financial Businesses)",
                      desc: "Comprehensive experience with DNFBP compliance and Ministry of Economy inspections",
                    },
                    {
                      title: "Cross-Border Compliance",
                      desc: "Expert in multi-jurisdictional regulatory coordination and international standards",
                    },
                  ].map((item, i) => (
                    <div key={i} className='border-l-4 border-white pl-4'>
                      <h5 className='font-semibold text-white mb-2'>{item.title}</h5>
                      <p className='text-gray-200'>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Current Roles & Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className='text-2xl font-bold text-white mb-4'>
                  Current Roles & Achievements
                </h4>
                <ul className='space-y-3 text-gray-200'>
                  {[
                    "Serves as MLRO for multiple DNFBPs across various sectors",
                    "Successfully represented entities during numerous Ministry of Economy inspections",
                    "Ensured full regulatory alignment and continuous compliance improvement for clients",
                    "Guided institutions through regulatory challenges and regulatory change management",
                    "Built RegLex Global as a boutique advisory firm serving select clients with precision and discretion",
                  ].map((item, i) => (
                    <li key={i} className='flex items-start'>
                      <span className='text-white mr-3 mt-1'>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Quote */}
              <motion.div
                className='bg-opacity-10 p-6 rounded-lg'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className='text-lg text-white leading-relaxed italic'>
                  "True regulatory excellence is not achieved through templates
                  or tick-boxes, but through a deep understanding of the law,
                  the regulator's intent, and the client's business reality. We
                  don't just advise; we partner, interpret, and implement."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { motion, easeOut } from "framer-motion";

const fadeInLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: easeOut },
  viewport: { once: true },
};

const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: easeOut },
  viewport: { once: true },
};

export default function AdvisoryPortfolio() {
  return (
    <section id='advisory-portfolio' className='py-20 bg-gray-900'>
      <div className='container mx-auto px-4'>
        {/* Heading */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl font-bold text-white mb-4'>
            Our Advisory Portfolio
          </h2>
          <p className='text-lg text-gray-200 max-w-4xl mx-auto'>
            At RegLex Global, we provide boutique, precision-led regulatory and
            compliance advisory — tailored to the risks, opportunities, and
            regulatory frameworks of our clients. Every service line is designed
            to be deep, defensible, and discreet.
          </p>
        </motion.div>

        {/* 🔁 Service Sections */}
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`flex flex-wrap items-center mb-20 -mx-4 ${
              service.reverse ? "flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              className='w-full md:w-6/12 px-4'
              {...(service.reverse ? fadeInRight : fadeInLeft)}
            >
              <div className='relative'>
                <img
                  src={service.image}
                  alt={service.title}
                  className='w-full h-96 object-cover rounded-lg shadow-lg'
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className='w-full md:w-6/12 px-4 mt-8 md:mt-0'
              {...(service.reverse ? fadeInLeft : fadeInRight)}
              transition={{ ...fadeInRight.transition, delay: 0.2 }}
            >
              <h3 className='text-3xl font-bold text-white mb-6'>
                {service.title}
              </h3>
              <ul className='space-y-4 text-lg text-gray-200 '>
                {service.points.map((point, i) => (
                  <li key={i} className='flex items-start text-justify'>
                    <span className='text-white mr-3 mt-1'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

const services = [
  {
    title: "Regulatory & Supervisory Advisory",
    image: "/advisory1.png",
    reverse: false,
    points: [
      "Licensing applications, regulatory submissions, and ongoing compliance monitoring for financial institutions.",
      "Preparation for regulatory inspections, remediation planning, and supervisory engagement support.",
      "Cross-border regulatory coordination and multi-jurisdictional compliance frameworks.",
    ],
  },
  {
    title: "AML/CFT & Sanctions Programs",
    image: "/advisory2.png",
    reverse: true,
    points: [
      "Design and implementation of comprehensive AML/CFT frameworks aligned with UAE and international standards.",
      "Sanctions compliance programs, screening systems, and OFAC/UN sanctions advisory.",
      "Transaction monitoring, suspicious activity reporting, and financial crime risk assessments.",
    ],
  },
  {
    title: "Independent MLRO & Compliance Officer Services",
    image: "/advisory3.png",
    reverse: false,
    points: [
      "Provision of outsourced or interim MLRO / Compliance Officer functions for regulated firms.",
      "Oversight of compliance operations, transaction reviews, internal investigations, and escalation reporting.",
      "Board and senior management assurance through periodic reports, regulatory submissions, and audit coordination.",
    ],
  },
  {
    title: "Governance, Risk & Control Architecture",
    image: "/advisory4.png",
    reverse: true,
    points: [
      "Design and enhancement of Board and Committee frameworks, governance charters, and accountability structures.",
      "Implementation of Enterprise Risk Management (ERM) systems, control mapping, and process documentation.",
      "Control testing and monitoring programs integrated with Management Information (MI) systems.",
    ],
  },
  {
    title: "Financial Crime & Conduct Risk Diagnostics",
    image: "/advisory5.png",
    reverse: false,
    points: [
      "Comprehensive diagnostics including EWRA, PFNRA, and Anti-Bribery & Corruption (ABC) reviews.",
      "Development of Conduct Risk frameworks, culture assessments, and behavior-based control enhancements.",
      "Preparation of remediation plans with measurable KPIs and implementation oversight.",
    ],
  },
  {
    title: "Specialized Sector & Emerging Risks",
    image: "/advisory6.png",
    reverse: true,
    points: [
      "Regulatory and compliance advisory for DNFBPs (Real Estate, Precious Metals, Legal, Notaries, Accounting).",
      "Advisory on Virtual Assets / Crypto regulations, VARA readiness, and licensing pathways.",
      "Integration of ESG and sustainability risks into governance, risk, and compliance programs.",
    ],
  },
  {
    title: "Training & Regulatory Capacity Building",
    image: "/advisory7.png",
    reverse: false,
    points: [
      "Tailored training programs for Boards, Senior Management, and Compliance Teams.",
      "Interactive workshops, scenario-based simulations, and thematic case studies aligned with regulatory updates.",
      "Ongoing capacity-building support to embed a sustainable compliance culture.",
    ],
  },
];

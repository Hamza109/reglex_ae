"use client";
import React from "react";

interface CtaProps {
  onOpenContact: () => void;
}

export default function Cta({ onOpenContact }: CtaProps) {
  return (
    <section className='py-10 md:py-20 bg-primary'>
      <div className='container mx-auto px-4'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Ready to Get Started?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Contact us today to discuss your regulatory compliance needs and
            discover how RegLex can help your organization navigate complex
            regulatory landscapes with confidence.
          </p>
          <div className='flex justify-center'>
            <button
              onClick={onOpenContact}
              className='bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

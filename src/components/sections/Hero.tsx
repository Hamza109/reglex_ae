import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative pt-20 pb-16 lg:pt-32 lg:pb-20 flex items-center min-h-screen scroll-mt-24 overflow-hidden'
    >
      {/* Optimized background image (bottom layer) */}
      <div className='absolute inset-0 z-10'>
        <Image
          src='/hero.webp'
          alt='RegLex Hero Background'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      </div>
      {/* Content (top layer) */}
      <div className='container mx-auto px-4 relative z-20'>
        <div className='w-full max-w-4xl '>
          <div className='text-center lg:text-left sm:-mt-40  rounded-lg  '>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl  font-bold text-primary  leading-tight mb-6'>
              RegLex Global Consulting
            </h1>
            <p className='text-base  sm:text-lg lg:text-xl font-medium leading-relaxed text-white max-w-3xl mx-auto lg:mx-0 mb-8'>
              Where Regulation Meets Strategy.
            </p>
          </div>

          <div className='text-center lg:text-justify rounded-lg '>
            <p className='text-base  sm:text-lg lg:text-xl font-medium leading-relaxed text-white max-w-3xl mx-auto lg:mx-0 mb-8'>
              We help regulated institutions navigate complexity with clarity —
              delivering tailored, intelligent compliance frameworks built to
              meet the highest international benchmarks.
            </p>
          </div>
        </div>
      </div>
      {/* Overlay (middle layer) */}
      <div className='absolute inset-0 bg-black/40 z-10'></div>
      {/* Overlay for better text readability */}
    </section>
  );
}

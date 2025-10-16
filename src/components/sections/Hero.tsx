import React from "react";

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative pt-20 pb-16 lg:pt-32 lg:pb-20 flex items-center min-h-screen bg-white scroll-mt-24 bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundAttachment:"fixed",
        backgroundOrigin:"border-box",
        backgroundClip:"border-box",
       

      }}
    >
      <div className='container mx-auto px-4 relative z-10'>
        <div className='w-full max-w-4xl'>

        <div className='text-center lg:text-left sm:-mt-40  rounded-lg '>
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

      {/* Overlay for better text readability */}
{/* Overlay for better text readability */}
<div className='absolute inset-0 bg-black/40'></div>
    </section>
  );
}

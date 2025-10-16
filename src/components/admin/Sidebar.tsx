"use client";

import Link from "next/link";
import { useState } from "react";

export function Sidebar() {
  const [openBlogs, setOpenBlogs] = useState(false);
  const [openTestimonials, setOpenTestimonials] = useState(false);

  return (
    <aside className='text-white bg-primary p-6 shadow-xl flex flex-col'>
      <div className='flex items-center gap-3 justify-center'>
        <div className='relative h-16 w-24 bg-white/10 backdrop-blur'>
          <img src='/BLUE_LOGO.webp' alt='Reglex' className='h-20 w-[200px]' />
        </div>
      </div>

      <div className='h-px bg-white/15 mt-5' />

      <nav className='grid gap-2 text-[15px] mt-5 '>
        <Link
          href='/admin'
          className='group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors'
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            className='opacity-90'
          >
            <path
              d='M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z'
              stroke='currentColor'
              strokeWidth='1.5'
            />
          </svg>
          <span className='capitalize'>home</span>
        </Link>

        <button
          onClick={() => setOpenBlogs((v) => !v)}
          className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10'
        >
          <span className='flex items-center gap-3'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              className='opacity-90'
            >
              <path
                d='M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z'
                stroke='currentColor'
                strokeWidth='1.5'
              />
              <path
                d='M15 3v4a2 2 0 0 0 2 2h4'
                stroke='currentColor'
                strokeWidth='1.5'
              />
            </svg>
            Blogs
          </span>
          <span>{openBlogs ? "−" : "+"}</span>
        </button>
        {openBlogs && (
          <div className='ml-6 grid'>
            <Link
              href='/admin/blogs/add'
              className='px-3 py-1.5 rounded hover:bg-white/10'
            >
              Add Blog
            </Link>
            <Link
              href='/admin/blogs/view'
              className='px-3 py-1.5 rounded hover:bg-white/10'
            >
              View Blogs
            </Link>
          </div>
        )}

        <button
          onClick={() => setOpenTestimonials((v) => !v)}
          className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10'
        >
          <span className='flex items-center gap-3'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              className='opacity-90'
            >
              <path
                d='M4 4h16v14H7l-3 3V4Z'
                stroke='currentColor'
                strokeWidth='1.5'
              />
            </svg>
            Testimonials
          </span>
          <span>{openTestimonials ? "−" : "+"}</span>
        </button>
        {openTestimonials && (
          <div className='ml-6 grid'>
            <Link
              href='/admin/testimonials/add'
              className='px-3 py-1.5 rounded hover:bg-white/10'
            >
              Add Testimonial
            </Link>
            <Link
              href='/admin/testimonials/view'
              className='px-3 py-1.5 rounded hover:bg-white/10'
            >
              View Testimonials
            </Link>
          </div>
        )}
      </nav>

      <div className='mt-auto pt-6'>
        <div className='h-px bg-white/15 mb-3' />
        <Link
          href='/login'
          className='w-full flex items-center justify-center px-3 py-2 rounded-lg bg-white text-primary font-medium hover:opacity-95'
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}

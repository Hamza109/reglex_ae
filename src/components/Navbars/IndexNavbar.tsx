"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface IndexNavbarProps {
  fixed?: boolean;
  onOpenContact?: () => void;
}

export default function IndexNavbar({
  fixed,
  onOpenContact,
}: IndexNavbarProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className='fixed top-0 z-50 w-full bg-white shadow-sm transition-all duration-300'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <Link href='/' className='flex items-center'>
              <img
                src='/WHITE_LOGO.jpg'
                alt='RegLex Logo'
                className='h-12 w-auto object-contain'
              />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { href: "/#about-reglex", label: "About RegLex" },
    { href: "/#reglex-edge", label: "RegLex Edge" },
    { href: "/#founding-insight", label: "Founding Insight" },
    { href: "/#advisory-portfolio", label: "Advisory Portfolio" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <img
              src='/WHITE_LOGO.png'
              alt='RegLex Logo'
              className='h-55 w-auto object-contain max-w-full'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-sm font-medium text-primary hover:text-slate-700 transition-colors duration-200 relative group'
              >
                {item.label}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-700 transition-all duration-200 group-hover:w-full'></span>
              </Link>
            ))}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className='text-sm font-medium text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200'
              >
                Contact Us
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-700 hover:bg-slate-50 transition-colors duration-200'
            aria-label='Toggle menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {navbarOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            navbarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className='py-4 space-y-2 border-t border-slate-200'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setNavbarOpen(false)}
                className='block px-4 py-3 text-sm font-medium text-primary hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors duration-200'
              >
                {item.label}
              </Link>
            ))}
            {onOpenContact && (
              <button
                onClick={() => {
                  setNavbarOpen(false);
                  onOpenContact();
                }}
                className='block w-full text-left px-4 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200'
              >
                Contact Us
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

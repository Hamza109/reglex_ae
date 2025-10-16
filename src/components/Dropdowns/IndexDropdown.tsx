"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function IndexDropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = React.useRef<HTMLDivElement>(null);

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        btnDropdownRef.current &&
        popoverDropdownRef.current &&
        !btnDropdownRef.current.contains(event.target as Node) &&
        !popoverDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownPopoverShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="text-blueGray-400 fas fa-cog text-lg leading-lg mr-2" />
        <span className="lg:hidden inline-block ml-2">Settings</span>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          href="/admin"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          <i className="fas fa-tachometer-alt mr-2"></i>
          Dashboard
        </Link>
        <Link
          href="/admin/blogs"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          <i className="fas fa-blog mr-2"></i>
          Blogs
        </Link>
        <Link
          href="/admin/testimonials"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          <i className="fas fa-quote-left mr-2"></i>
          Testimonials
        </Link>
        <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
        <Link
          href="/simple"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          <i className="fas fa-edit mr-2"></i>
          Editor
        </Link>
      </div>
    </>
  );
}

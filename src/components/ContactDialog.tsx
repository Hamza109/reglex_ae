"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          to_email: "admin@rlgc.ae", // Your receiving email
        }
      );

      if (result.status === 200) {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
        setShowSuccessDialog(true);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, failed to send. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-none sm:rounded-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-primary'>
            Contact RegLex Global
          </DialogTitle>
          <DialogDescription className='text-slate-600'>
            Get in touch with our regulatory compliance experts. We'll respond
            within 1-2 business days.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-slate-700 mb-2'
              >
                Full Name *
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Enter your full name'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-slate-700 mb-2'
              >
                Email Address *
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Enter your email'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='company'
                className='block text-sm font-medium text-slate-700 mb-2'
              >
                Company
              </label>
              <input
                type='text'
                id='company'
                name='company'
                value={formData.company}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Enter your company name'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-slate-700 mb-2'
              >
                Phone Number
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Enter your phone number'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-slate-700 mb-2'
            >
              Message *
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y'
              placeholder='Tell us about your regulatory compliance needs...'
            />
          </div>

          <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 w-full sm:w-auto'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto'
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </DialogContent>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className='w-full max-w-[400px] p-8 rounded-lg'>
          <div className='text-center'>
            <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4'>
              <i className='fas fa-envelope text-2xl text-primary'></i>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Message Sent Successfully!
            </h3>
            <p className='text-gray-600 mb-6'>
              Thank you for contacting RegLex Global. We'll get back to you
              soon.
            </p>
            <button
              onClick={handleSuccessClose}
              className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200'
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}

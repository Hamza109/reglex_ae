// This file is kept for backward compatibility
// Database models are now defined in Prisma schema

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
};

export const testimonialsStore: Testimonial[] = [];

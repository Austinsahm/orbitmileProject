import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;


export const siteSchema = z.object({
  id: z.number(), // Unique identifier for the site
  name: z.string(), // Name of the site
  location: z.string(), // Location of the site
  description: z.string(), // Description of the site
  image_url: z.string(), // URL to an image of the site
  coordinates: z.object({ // Coordinates of the site
    latitude: z.number(), // Latitude of the site
    longitude: z.number(), // Longitude of the site
  }),
  category: z.string(), // Category of the site
  reviews: z.array(z.object({ // Array of reviews for the site
    user: z.string(), // User who made the review
    rating: z.number().min(0).max(5), // Rating given by the user
    comment: z.string(), // Comment by the user
  })),
});

export type Sites = z.infer<typeof siteSchema>;
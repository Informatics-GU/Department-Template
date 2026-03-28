import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const programs = defineCollection({
  loader: glob({ base: "./src/content/programs", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    degree: z.string(),
    description: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { programs, news };

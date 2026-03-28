# GU Department Theme

An [Astro](https://astro.build) theme for building Gonzaga department websites. Ships with content collections for programs and news, a design token system based on GU brand guidelines, and responsive layouts out of the box.

The default configuration is set up for the School of Business Administration, but every department-specific detail lives in a single config file and content directory, making it straightforward to adapt for any department.

![Astro](https://img.shields.io/badge/Astro-5.x-blue?logo=astro)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Content Collections** -- Programs and news articles managed as Markdown files with schema validation
- **Design Token System** -- GU brand colors, typography, and spacing defined as CSS custom properties in one file
- **Responsive Design** -- Mobile-first layouts with adaptive navigation, card grids, and typography
- **SEO Ready** -- Dynamic page titles, meta descriptions, canonical URLs, and Open Graph tags
- **Accessible** -- Semantic HTML, ARIA attributes, screen-reader utilities, and keyboard-friendly navigation
- **Zero JavaScript** -- The only JS is a small mobile menu toggle; everything else is static HTML and CSS
- **Fast** -- Static site generation means every page is pre-rendered HTML

## Quick Start

### Option 1: Use as a GitHub template

Click the **Use this template** button at the top of this repository to create your own copy.

Then:

```bash
git clone https://github.com/<your-username>/<your-new-repo>.git
cd <your-new-repo>
npm install
npm run dev
```

### Option 2: Use the Astro CLI

```bash
npm create astro@latest -- --template Informatics-GU/Department-Template
```

### Option 3: Clone directly

```bash
git clone https://github.com/Informatics-GU/Department-Template.git
cd Department-Template
npm install
npm run dev
```

## Project Structure

```
src/
  config.ts              # Department name, contact info, CTAs, social links
  content.config.ts      # Content collection schemas (Zod validation)
  components/
    BaseHead.astro       # <head> metadata, fonts, Open Graph
    Header.astro         # Sticky nav with mobile hamburger menu
    Footer.astro         # Multi-column footer with quick links and social
    Hero.astro           # Full-width banner with title, subtitle, CTAs
    ProgramCard.astro    # Card for program listings
    NewsCard.astro       # Card for news articles
  layouts/
    BaseLayout.astro     # Page wrapper (head + header + slot + footer)
  pages/
    index.astro          # Home page
    programs/
      index.astro        # All programs listing
      [...slug].astro    # Individual program pages (generated from Markdown)
    news/
      index.astro        # All news listing
      [...slug].astro    # Individual article pages (generated from Markdown)
  content/
    programs/*.md        # Program entries
    news/*.md            # News articles
  styles/
    tokens.css           # Design tokens (colors, typography, spacing)
    global.css           # Reset, utilities, button system, card grids
public/
  images/                # Logos and decorative assets
  fonts/                 # Custom font files (if needed)
```

## Customization

### 1. Update department info

Edit `src/config.ts` to set your department's name, contact details, social links, and calls to action:

```ts
export const DEPARTMENT = {
  name: "Your Department Name",
  university: "Gonzaga University",
  tagline: "Your department tagline.",
  phone: "(509) 555-0000",
  email: "dept@gonzaga.edu",
  address: "502 East Boone Avenue, Spokane, WA 99258",
  building: "Your Building",
  social: {
    linkedin: "https://www.linkedin.com/...",
    instagram: "https://www.instagram.com/...",
    facebook: "https://www.facebook.com/...",
  },
  ctas: {
    primary: { text: "Apply Now", url: "https://www.gonzaga.edu/apply" },
    secondary: { text: "Request Info", url: "https://www.gonzaga.edu/request-info" },
    tertiary: { text: "Visit Campus", url: "https://www.gonzaga.edu/visit" },
  },
};
```

### 2. Update the site URL

Set `site` and `base` in `astro.config.mjs` so that links and assets resolve correctly. See the [Deployment](#deployment) section for details.

### 3. Add content

**Programs** -- Create Markdown files in `src/content/programs/`:

```md
---
title: "Program Name"
degree: "B.A."
description: "A short description for card listings."
order: 1
featured: true
---

Full program description in Markdown.
```

**News** -- Create Markdown files in `src/content/news/`:

```md
---
title: "Article Title"
date: 2026-01-15
description: "Preview text for the news listing."
featured: false
---

Full article content in Markdown.
```

### 4. Adjust the design

Brand colors, font stacks, spacing scale, and breakpoints are all in `src/styles/tokens.css`. Change values there and they propagate everywhere:

| Token | Default | Purpose |
|---|---|---|
| `--color-primary` | `#06274F` (GU Blue) | Primary brand color |
| `--color-link` | `#5E8AB4` (Spokane River) | Link color |
| `--font-sans` | Proxima Nova, Figtree | Body text |
| `--font-serif` | Adelle, Figtree | Headings |
| `--container-max-width` | `1170px` | Content width |

## Deployment

This theme includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site to [GitHub Pages](https://pages.github.com/) on every push to `main`.

1. **Set your site URL** -- In `astro.config.mjs`, set `site` to your GitHub Pages URL. For public repos, the URL follows a predictable pattern:

   - **User/org site** (repo named `<username>.github.io`) → `https://<username>.github.io`
   - **Project site** (any other repo name) → `https://<username>.github.io/<repo-name>/`

   ```js
   export default defineConfig({
     site: "https://<your-username>.github.io",
   });
   ```

   > **Private repos:** GitHub Pages on private repos (requires GitHub Enterprise or Teams) uses an obfuscated URL that isn't known until after the first deploy. Run an initial deploy, find the URL in **Settings > Pages**, then update `site` in `astro.config.mjs` and deploy again.

2. **Set `base` if needed** -- If your repository is **not** named `<your-username>.github.io`, add `base` with your repository name:

   ```js
   export default defineConfig({
     site: "https://<your-username>.github.io",
     base: "/your-repo-name/",
   });
   ```

3. **Commit your lockfile** -- Make sure your package manager's lockfile (`package-lock.json`, `yarn.lock`, etc.) is committed so GitHub can detect your dependencies.

4. **Enable GitHub Pages** -- In your repository's **Settings > Pages**, select **GitHub Actions** as the source.

5. **Enable automatic deploys** -- The workflow is set to manual-only by default. To deploy on every push, uncomment the `push` trigger in `.github/workflows/deploy.yml`:

   ```yaml
   on:
     workflow_dispatch:
     push:
       branches: [main]
   ```

You can also trigger a deploy manually at any time from the **Actions** tab.

If you'd like to use a custom domain (e.g., `yourdept.gonzaga.edu`) instead of the default GitHub Pages URL, see [Change your GitHub URL to a custom domain](https://docs.astro.build/en/guides/deploy/github/#change-your-github-url-to-a-custom-domain).

See Astro's [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) guide for full details.

## Build with AI

Astro has built-in support for working with AI tools. You can use AI locally to add features, create content, and customize your site.

See Astro's [Build with AI](https://docs.astro.build/en/guides/build-with-ai/) guide for full details.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `dist/` |
| `npm run preview` | Preview the production build locally |

## License

The **theme source code** is freely available for use, modification, and distribution under the terms of the [MIT License](https://opensource.org/licenses/MIT).

The `LICENSE` file included in this repository defaults to **All Rights Reserved** to protect department content. When you create a site from this template, update the `LICENSE` file with your department name and year — your content is yours.

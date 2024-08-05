This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Next.js Starter Project

This is a simple Next.js starter project that displays a blog post on the landing page. The project is set up using TypeScript and Tailwind CSS.

## What the Platform Does

The current implementation of the platform displays a simple landing page that showcases a blog post. The blog post includes a title, description, publication date, and a link to read more. The date is formatted using `day.js`.

### Components

- **BlogPost**: A reusable component that takes in props for the title, description, date, and link, and displays the blog post information.

### Utilities

- **formatDate**: A utility function that uses `day.js` to format a given date string into a readable format.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### notes

#### Passing Data from Server to Client Components

When passing data from a Server Component to a Client Component (for example, as props), the data must be serializable. Complex objects, like Mongoose document instances, are not serializable and will cause an error.
Mongoose documents are complex objects with methods, not plain data, which causes the error you saw.

**Error Example:**

> Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.

This typically happens when you fetch data using Mongoose and pass the result directly to a client-side component.

**Initial Solution & Its Problem:**

A common first attempt is to use the `.lean()` method on a Mongoose query.

```javascript
const events = await Event.find().lean(); // Returns plain JS objects
```

While this returns plain JavaScript objects and fixes the serialization error, it has a significant drawback: **it strips away Mongoose virtuals**. This means the convenient `id` field (a string version of `_id`) will be missing from the objects.

**Recommended Solution:**

To preserve virtuals like `id`, you should manually convert the Mongoose document to a plain object. The most reliable way is to stringify the object and then parse it back. This correctly applies `toJSON` transformations defined in your schema, including virtuals.

```javascript
// 1. Fetch the full Mongoose document(s)
const eventsFromDB = await Event.find();

// 2. Serialize the document(s) to plain objects
const plainEvents = JSON.parse(JSON.stringify(eventsFromDB));

// Now, `plainEvents` can be safely passed to Client Components with the `id` field intact.
```

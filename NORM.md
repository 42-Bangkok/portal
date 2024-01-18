# Norm

## Naming a page.tsx's page component

Do this:

```
export default function Page() {
  ...
  return ...
}
```

Not this:

```
export default function ContactPage() {
  ...
  return ...
}
---
const ContactPage = () => {
  ...
  return ...
}
export default ContactPage
```

Why?

- We know right away which component renders the page since the name is always Page

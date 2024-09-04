Next.js
Install and configure Next.js.
Create project
Start by creating a new Next.js project using create-next-app:

npx create-next-app@latest my-app --typescript --tailwind --eslint
Copy
Run the CLI
Run the shadcn-ui init command to setup your project:

npx shadcn-ui@latest init
Copy
Configure components.json
You will be asked a few questions to configure components.json:

Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Do you want to use CSS variables for colors? › no / yes
Copy
Fonts
I use Inter as the default font. Inter is not required. You can replace it with any other font.

Here's how I configure Inter for Next.js:

1. Import the font in the root layout:

import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        ...
      </body>
    </html>
  )
}
Copy
2. Configure theme.extend.fontFamily in tailwind.config.js

const { fontFamily } = require("tailwindcss/defaultTheme")
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
}
Copy
App structure
Here's how I structure my Next.js apps. You can use this as a reference:

.
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
Copy
I place the UI components in the components/ui folder.
The rest of the components such as <PageHeader /> and <MainNav /> are placed in the components folder.
The lib folder contains all the utility functions. I have a utils.ts where I define the cn helper.
The styles folder contains the global CSS.
That's it
You can now start adding components to your project.

npx shadcn-ui@latest add button
Copy
The command above will add the Button component to your project. You can then import it like this:

import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
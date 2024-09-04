Next.js
Adding dark mode to your next app.
Dark mode
Install next-themes
Start by installing next-themes:

npm install next-themes
Copy
Create a theme provider
components/theme-provider.tsx
"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
Copy
Wrap your root layout
Add the ThemeProvider to your root layout.

app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
Copy
Add a mode toggle
Place a mode toggle on your site to toggle between light and dark mode.

Preview
Code

Style:
Default
Copy

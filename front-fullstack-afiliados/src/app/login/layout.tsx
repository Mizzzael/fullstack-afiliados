import '../globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import ThemeProvider from "@root/provider/ThemeProvider";
import Theme from "@root/values/theme";

export const metadata: Metadata = {
  title: 'Teste - Login',
  description: 'Página de login e ou cadastro.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <ThemeProvider theme={Theme}>
          {children}
        </ThemeProvider>
  )
}

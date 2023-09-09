import './globals.css'
import type { Metadata } from 'next'
import ThemeProvider from "@root/provider/ThemeProvider";
import Theme from "@root/values/theme";
import {Roboto} from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teste - Dashboard',
  description: 'Painel de usuário.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
        <body className={roboto.className}>
            <ThemeProvider theme={Theme}>
                {children}
            </ThemeProvider>
        </body>
    </html>
  )
}

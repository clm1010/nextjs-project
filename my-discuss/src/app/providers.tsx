'use client'
import { SessionProvider } from 'next-auth/react'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute='class' enableColorScheme={false}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  )
}

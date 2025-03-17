'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '@heroui/use-theme'
import { Moon, SunMoon } from 'lucide-react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div onClick={toggleTheme}>
      {theme === 'light' ? <Moon size={20} /> : <SunMoon size={20} className='dark:text-gray-200' />}
    </div>
  )
}

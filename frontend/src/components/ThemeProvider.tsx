'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme'
import { monkeytypeThemes } from '@/lib/monkeytype-themes'

function applyTheme(theme: 'dark' | 'light') {
  const html = document.documentElement
  html.removeAttribute('data-palette')
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light')
  } else {
    html.removeAttribute('data-theme')
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const palette = theme.startsWith('monkeytype:')
      ? monkeytypeThemes[theme.slice(11)]
      : undefined
    if (palette) {
      const html = document.documentElement
      html.removeAttribute('data-theme')
      html.setAttribute('data-palette', theme)
      Object.entries(palette).forEach(([key, value]) =>
        html.style.setProperty(
          `--mt-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`,
          value
        )
      )
      return
    }
    if (theme === 'dark' || theme === 'light') {
      applyTheme(theme)
      return
    }

    // System: follow OS preference
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      applyTheme(e.matches ? 'light' : 'dark')
    }
    handler(mq)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return <>{children}</>
}

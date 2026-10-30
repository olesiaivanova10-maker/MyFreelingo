'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { monkeytypeThemes } from '@/lib/monkeytype-themes'
import { useThemeStore } from '@/store/theme'

export function AppearanceSection({ title }: { title?: string } = {}) {
  const t = useTranslations('settings')
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const [search, setSearch] = useState('')

  return (
    <div className="border-fl-border bg-fl-surface border p-6">
      <div className="border-fl-border mb-5 flex items-center gap-2 border-b pb-4">
        <span className="text-fl-label text-fl-muted-2">●</span>
        <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
          {title ?? t('sectionAppearance')}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-fl-fg font-mono text-xs tracking-wide">
            {t('theme')}
          </p>
          <p className="text-fl-label text-fl-muted-2 mt-0.5 font-mono">
            {theme === 'dark'
              ? t('darkActive')
              : theme === 'light'
                ? t('lightActive')
                : theme === 'system'
                  ? t('systemActive')
                  : theme.replace(/^monkeytype:/, '').replaceAll('_', ' ')}
          </p>
        </div>
        <div className="flex gap-1">
          {(['system', 'dark', 'light'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setTheme(opt)}
              className={`text-fl-label border px-3 py-2 font-mono tracking-widest uppercase transition-colors ${
                theme === opt
                  ? 'border-fl-border-2 text-fl-fg bg-fl-surface-2'
                  : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
              }`}
            >
              {opt === 'system'
                ? t('themeSystem')
                : opt === 'dark'
                  ? t('themeDark')
                  : t('themeLight')}
            </button>
          ))}
        </div>
      </div>
      <div className="border-fl-border mt-6 border-t pt-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-fl-fg font-mono text-xs">Monkeytype themes</p>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search themes"
            aria-label="Search themes"
            className="bg-fl-bg border-fl-border text-fl-fg border px-3 py-2 font-mono text-xs"
          />
        </div>
        <div className="grid max-h-96 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(monkeytypeThemes)
            .filter(([name]) =>
              name.replaceAll('_', ' ').includes(search.toLowerCase().trim())
            )
            .map(([name, palette]) => (
              <button
                key={name}
                type="button"
                aria-pressed={theme === `monkeytype:${name}`}
                onClick={() => setTheme(`monkeytype:${name}`)}
                className="rounded border p-3 text-left font-mono text-xs transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2"
                style={{
                  backgroundColor: palette.bg,
                  color: palette.text,
                  borderColor:
                    theme === `monkeytype:${name}`
                      ? palette.main
                      : palette.subAlt,
                }}
              >
                <span className="block truncate font-semibold">
                  {name.replaceAll('_', ' ')}
                </span>
                <span className="mt-2 block" style={{ color: palette.sub }}>
                  learn <span style={{ color: palette.main }}>something</span>{' '}
                  new
                </span>
                <span className="mt-2 flex gap-1" aria-hidden="true">
                  {[palette.bg, palette.main, palette.sub, palette.text].map(
                    (color, i) => (
                      <span
                        key={i}
                        className="h-3 w-3 rounded-full border border-current"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

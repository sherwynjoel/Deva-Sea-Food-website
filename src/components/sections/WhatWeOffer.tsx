import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight, Globe2, Route, Snowflake, Tag, Waves } from 'lucide-react'
import { siteContent } from '../../content/siteContent'
import { Reveal } from '../motion/Reveal'
import { cn } from '../../lib/cn'
import { GlassCard } from '../ui/GlassCard'
import { Section } from '../ui/Section'

const iconByIndex = [Tag, BadgeCheck, Snowflake, Route, Globe2]

// Background images for each offer slide
const slideBackgrounds = [
  '/Premium Seafood Expertise.png',
  '/Uncompromising Quality & Safety.png',
  '/End-to-End Cold Chain Management.png',
  '/Consistency & Traceability.png',
  '/Reliable Global Partner.png',
]

export function WhatWeOffer() {
  const items = siteContent.offer.points
  const [active, setActive] = useState(0)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const regionRef = useRef<HTMLDivElement | null>(null)

  const icons = useMemo(() => items.map((_, i) => iconByIndex[i % iconByIndex.length]), [items])

  function scrollToIndex(index: number) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const children = Array.from(scroller.querySelectorAll<HTMLElement>('[data-slide]'))
    const clamped = Math.max(0, Math.min(index, children.length - 1))
    const target = children[clamped]
    if (!target) return
    scroller.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const children = Array.from(scroller.querySelectorAll<HTMLElement>('[data-slide]'))
        if (!children.length) return
        const x = scroller.scrollLeft
        let bestIdx = 0
        let bestDist = Number.POSITIVE_INFINITY
        for (let i = 0; i < children.length; i++) {
          const dist = Math.abs(children[i].offsetLeft - x)
          if (dist < bestDist) {
            bestDist = dist
            bestIdx = i
          }
        }
        setActive(bestIdx)
      })
    }

    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!items.length) return

    const AUTOPLAY_MS = 4000
    const id = window.setInterval(() => {
      scrollToIndex((active + 1) % items.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(id)
  }, [active, items.length])

  return (
    <Section id="what-we-offer">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-4">
          <p className="text-xs font-semibold tracking-[0.22em] text-ocean-950/70">
            {siteContent.offer.titleSmall}
          </p>
          <h2 className="heading-font mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteContent.offer.headline}
          </h2>

          <GlassCard className="mt-6 p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Waves className="h-5 w-5 text-ocean-200" />
              </span>
              <div className="min-w-0">

                <div className="mt-4 flex flex-wrap gap-2">
                  {siteContent.hero.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-full bg-ocean-100/50 px-2.5 py-1 text-xs font-medium text-ocean-900 ring-1 ring-ocean-900/10"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="lg:col-span-8 min-w-0">
          <Reveal>
            <div
              ref={regionRef}
              className="glass rounded-3xl border border-ocean-900/10 p-4 sm:p-5 overflow-hidden"
              role="region"
              aria-roledescription="carousel"
              aria-label="What we offer"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-sm font-semibold text-ocean-950/85 whitespace-nowrap">
                  Offer highlights <span className="text-ocean-950/55">({active + 1}/{items.length})</span>
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="glass-focus glass inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                    onClick={() => scrollToIndex(active - 1)}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5 text-ocean-950/85" />
                  </button>
                  <button
                    type="button"
                    className="glass-focus glass inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                    onClick={() => scrollToIndex(active + 1)}
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5 text-ocean-950/85" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollerRef}
                className={cn(
                  'no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto',
                  '-mx-4 px-4 sm:-mx-5 sm:px-5',
                )}
              >
                {items.map((p, idx) => {
                  const Icon = icons[idx]
                  const bgImage = slideBackgrounds[idx % slideBackgrounds.length]
                  return (
                    <div
                      key={p.title}
                      data-slide
                      className="flex shrink-0 snap-center justify-center px-1"
                      style={{ width: 'calc(100vw - 4rem)', maxWidth: '640px' }}
                    >
                      <div className="relative flex w-full min-h-[280px] sm:min-h-[320px] flex-col rounded-2xl border border-white/15" style={{ overflow: 'hidden' }}>
                        {/* Background image */}
                        <div className="absolute inset-0">
                          <img
                            src={bgImage}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                          />
                          {/* Dark overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-7">
                          {/* Top row: number and icon */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <p
                                className="text-4xl sm:text-5xl font-bold text-white/20"
                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                              >
                                {String(idx + 1).padStart(2, '0')}
                              </p>
                            </div>
                            <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-2 ring-white/20">
                              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-ocean-200" />
                            </span>
                          </div>

                          {/* Title and body */}
                          <div className="mt-auto">
                            <h3
                              className="text-xl sm:text-2xl font-bold text-white break-words"
                              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                              {p.title}
                            </h3>
                            <p
                              className="mt-3 text-sm sm:text-base leading-relaxed text-white/90 break-words"
                              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                            >
                              {p.body}
                            </p>

                            <div className="mt-4 pt-4 border-t border-white/20">
                              <div className="flex items-center gap-2 text-sm font-semibold text-ocean-200">
                                <span className="h-2 w-2 rounded-full bg-ocean-200 shrink-0" />
                                <span>Export-focused execution</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      'glass-focus h-2.5 w-2.5 rounded-full border shrink-0',
                      i === active ? 'border-white/40 bg-ocean-200/70' : 'border-white/20 bg-white/10',
                    )}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to item ${i + 1}`}
                    aria-current={i === active ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}



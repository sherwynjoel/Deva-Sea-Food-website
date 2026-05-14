import { siteContent } from '../../content/siteContent'
import { cn } from '../../lib/cn'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function NavButtons() {
  const [activeId, setActiveId] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = siteContent.nav.map(item => {
        const element = document.getElementById(item.id)
        return { id: item.id, element, top: element?.getBoundingClientRect().top || 0 }
      })

      const current = sections
        .filter(s => s.top <= 100 && s.top >= -200)
        .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0]

      if (current) {
        setActiveId(current.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="glass-focus sr-only fixed left-4 top-4 z-[70] rounded-full bg-black/40 px-4 py-2 text-xs font-semibold text-white/90 focus:not-sr-only"
      >
        Skip to content
      </a>

      {/* Navigation Bar with integrated logo */}
      <nav className="fixed top-3 sm:top-4 lg:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div
          className={cn(
            'glass border border-white/20 backdrop-blur-3xl transition-all duration-300',
            'bg-gradient-to-b from-white/40 via-white/10 to-white/5',
            'shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]',
            'px-3 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3',
            isMenuOpen ? 'rounded-3xl bg-white/20' : 'rounded-full'
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              {/* Logo on the left */}
              <a
                href="#top"
                className="glass-focus shrink-0 flex items-center gap-2 sm:gap-3 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 pr-2 sm:pr-3"
              >
                <img
                  src="/logo.png"
                  alt="Deva Sea Food Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-cover rounded-full ring-2 ring-white/20"
                />
                <span className="block text-sm sm:text-base lg:text-lg font-black text-ocean-950/90 whitespace-nowrap">
                  Deva Sea Food
                </span>
              </a>

              {/* Desktop Navigation links on the right */}
              <div className="hidden lg:flex items-center gap-0.5 sm:gap-1 lg:gap-2">
                {siteContent.nav.map((item) => {
                  const isActive = activeId === item.id
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        'glass-focus flex items-center justify-center gap-2',
                        'shrink-0 px-3 py-2.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-xl transition-all duration-300 ease-out',
                        'hover:bg-white/10 active:scale-95',
                        isActive && 'bg-white/20 shadow-sm'
                      )}
                    >
                      <span
                        className={cn(
                          'text-xs font-medium leading-none transition-all duration-300 whitespace-nowrap',
                          isActive ? 'text-ocean-950 font-bold' : 'text-ocean-950/80'
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-ocean-950 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="pt-4 pb-2 flex flex-col gap-2 border-t border-white/10 mt-2">
                    {siteContent.nav.map((item) => {
                      const isActive = activeId === item.id
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={() => {
                            setActiveId(item.id)
                            setIsMenuOpen(false)
                          }}
                          className={cn(
                            'glass-focus flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                            isActive ? 'bg-white/20 shadow-sm' : 'hover:bg-white/10'
                          )}
                        >
                          <span
                            className={cn(
                              'text-sm font-medium',
                              isActive ? 'text-ocean-950 font-bold' : 'text-ocean-950/90'
                            )}
                          >
                            {item.label}
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  )
}

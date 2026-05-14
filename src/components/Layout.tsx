
import { Outlet, useLocation } from 'react-router-dom'
import { NavButtons } from './sections/NavButtons'
import { Footer } from './sections/Footer'
import { LiquidBackground } from './ui/LiquidBackground'
import { ScrollProgress } from './motion/ScrollProgress'
import { StructuredData } from './StructuredData'
import { useEffect } from 'react'
import { BackToTop } from './ui/BackToTop'

export function Layout() {
    const { pathname, hash } = useLocation();

    // Handle scroll to top or hash on route change
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <StructuredData />
            <LiquidBackground />
            <ScrollProgress />
            <div className="relative z-10">
                <NavButtons />
                <Outlet />
                <Footer />
            </div>
            <BackToTop />
        </div>
    )
}

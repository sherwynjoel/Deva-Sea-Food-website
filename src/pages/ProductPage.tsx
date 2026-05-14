import { useParams, Link } from 'react-router-dom'
import { siteContent } from '../content/siteContent'
import { Container } from '../components/ui/Container'
import { ArrowLeft, Fish } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { Reveal } from '../components/motion/Reveal'

export function ProductPage() {
    const { slug } = useParams()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const product = siteContent.portfolio.products.find((p) => p.slug === slug)

    if (!product) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-white">
                <h1 className="text-3xl font-bold">Product Not Found</h1>
                <Link to="/" className="mt-4 text-ocean-200 hover:text-white underline">
                    Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 sm:pt-40 sm:pb-28">
            <Container>
                <Link
                    to="/#portfolio"
                    className="inline-flex items-center gap-2 text-sm font-medium text-ocean-950/80 hover:text-ocean-950 transition-colors mb-8 bg-white/40 px-4 py-2 rounded-full border border-ocean-950/5 hover:bg-white/60"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to Products
                </Link>

                <Reveal>
                    <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-ocean-950/10 bg-white/40 px-3 py-1 text-xs font-medium text-ocean-900 w-fit">
                            <Fish className="h-3 w-3" aria-hidden="true" />
                            {product.scientific}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-ocean-950 tracking-tight mt-2">{product.name}</h1>
                        <div className="flex gap-2 mt-4">
                            {product.tags.map(tag => (
                                <span key={tag} className="glass px-3 py-1 rounded-full text-sm font-medium text-ocean-950/80 bg-white/60">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <div className="grid gap-8 mt-12 lg:grid-cols-2">
                    <Reveal delay={0.1}>
                        {/* Product Description / Overview Placeholder */}
                        <div className="prose prose-lg text-ocean-950/80">
                            <p>
                                Our premium <strong className="text-ocean-950">{product.name}</strong> ({product.scientific}) is sourced responsibly and processed with strict adherence to food safety standards.
                                Known for its texture and flavor, it is a preferred choice for our global partners.
                            </p>
                            <p className="mt-4">
                                Available in various cuts and specifications to meet your market needs.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <GlassCard className="p-6">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-6 border-b border-ocean-950/10 pb-4">Available Specifications</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {product.subProducts.map((sub, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/30 border border-white/40">
                                        <div className="h-10 w-10 rounded-full bg-ocean-100 flex items-center justify-center shrink-0 text-ocean-600">
                                            <Fish className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <span className="font-medium text-ocean-900">{sub}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </Reveal>
                </div>

            </Container>
        </div>
    )
}

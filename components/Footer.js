// components/Footer.js
import Link from 'next/link'
import Image from 'next/image'

export default function Footer({ settings }) {
  const tagline    = settings?.footerTagline    || "Kenya's curated holiday rental platform. Discover and book the finest stays across Kenya — coast to safari."
  const disclaimer = settings?.footerDisclaimerText || "StaycationKE is an affiliate website. When you book through our links, we may earn a commission at no extra cost to you."
  const igUrl      = settings?.instagramUrl     || 'https://www.instagram.com/staycation.ke/'
  const twUrl      = settings?.twitterUrl       || '#'
  const tkUrl      = settings?.tiktokUrl        || '#'

  return (
    <footer className="bg-[#111] text-white px-8 pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-start gap-12 mb-12 flex-wrap">
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src="/logo.png"
                alt="StaycationKE"
                width={180}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-[0.82rem] text-white/40 max-w-[260px] leading-[1.7] font-light">{tagline}</p>
            {/* Social */}
            <div className="flex gap-[10px] mt-5">
              {[
                { href: igUrl, label: 'IG' },
                { href: twUrl, label: '𝕏' },
                { href: tkUrl, label: 'TK' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[0.72rem] font-bold text-white/50 hover:border-white hover:text-white hover:-translate-y-[2px] transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Cols */}
          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/30 mb-4">Explore</h4>
              {[
                { href: '/#properties', label: 'All Properties' },
                { href: '/#destinations', label: 'Top Destinations' },
                { href: '/#activities', label: 'Experiences' },
              ].map(({ href, label }) => (
                <Link key={label} href={href} className="block text-[0.82rem] text-white/50 mb-[7px] font-light hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <h4 className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/30 mb-4">Information</h4>
              {[
                { href: '/privacy',   label: 'Privacy Policy' },
                { href: '/terms',     label: 'Terms of Use' },
                { href: '/affiliate', label: 'Affiliate Disclosure' },
              ].map(({ href, label }) => (
                <Link key={label} href={href} className="block text-[0.82rem] text-white/50 mb-[7px] font-light hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-[0.75rem] text-white/25 font-light">
            © {new Date().getFullYear()} StaycationKE. All rights reserved.
          </p>
          {/* <span className="text-[0.72rem] text-white/25">
            Rates &amp; booking via <strong className="text-white/50">Expedia</strong>
          </span> */}
        </div>
        {/* <p className="text-[0.7rem] text-white/[0.18] mt-4 leading-[1.7] font-light">
          {disclaimer}{' '}
          <Link href="/affiliate" className="text-white/35 underline">Affiliate Disclosure</Link>.
        </p> */}
      </div>
    </footer>
  )
}

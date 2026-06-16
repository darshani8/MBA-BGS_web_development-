import Link from 'next/link';
import { asset } from '@/lib/basePath';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="f-brand">
            <img width="500" height="95" src={asset('/assets/logo-wordmark-trim.png')} alt="BGSCET MBA" />
            <p>
              BGSKH Education Trust (R.) — a unit of Sri Adichunchanagiri Shikshana Trust (R.). Building
              leaders through Knowledge Mastery and Personality Growth.
            </p>
            <div className="f-approve">
              <span>AICTE Approved</span>
              <span>VTU Affiliated</span>
            </div>
            <div className="f-social">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" /></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 7A1.94 1.94 0 105 5.06 1.94 1.94 0 006.94 7zM5.5 9h2.9v9.5H5.5zM10 9h2.8v1.3h.04a3.07 3.07 0 012.76-1.52c2.95 0 3.5 1.94 3.5 4.46v5.26h-2.9v-4.66c0-1.11 0-2.54-1.55-2.54s-1.78 1.21-1.78 2.46v4.74H10z" /></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 002 8.2 31 31 0 002 12a31 31 0 00.1 3.8A3 3 0 004.1 18c1.9.5 7.9.5 7.9.5s6 0 7.9-.6a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.1-3.8zM10 15V9l5 3z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about/">About Us</Link></li>
              <li><Link href="/programs/">Programs</Link></li>
              <li><Link href="/admissions/">Admissions</Link></li>
              <li><Link href="/#placements">Placements</Link></li>
              <li><Link href="/#campus">Campus Life</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog/">Blog &amp; News</Link></li>
              <li><Link href="/sitemap/">Sitemap</Link></li>
              <li><a href="#">Download Brochure</a></li>
              <li><Link href="/contact/">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reach Us</h4>
            <ul className="f-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-5.7-7-11a7 7 0 0114 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                CA Site No. 6 &amp; 7, 3rd Main, Pipeline Road, Chord Rd, adj. to Mahalakshmi Metro Station, 2nd
                Phase, Stage 2, Mahalakshmipuram, Bengaluru, Karnataka 560086
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" /></svg>
                <a href="tel:+917676637525">+91 7676637525, +919845099083</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                <a href="mailto:mbainfo@bgscet.ac.in">mbainfo@bgscet.ac.in</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-gurudev">
          <img width="284" height="55" src={asset('/assets/jai-sri-gurudev.png')} alt="Jai Sri Gurudev" />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BGSCET MBA. All rights reserved.</span>
          <nav className="f-legal">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/terms-of-use/">Terms of Use</Link>
            <Link href="/sitemap/">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

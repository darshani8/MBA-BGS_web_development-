'use client';

import { useEffect, useState } from 'react';
import { asset } from '@/lib/basePath';

/* Single-page "bento" academic profile (Profile · About · Research · Teaching).
   Client component because it owns the research tab state and the one-shot
   entrance animation. Styling lives in styles/scholar.css, scoped under the
   .scholar-site wrapper rendered by the portfolio layout. */
export default function Bento() {
  const [tab, setTab] = useState('published');
  const [anim, setAnim] = useState(false);

  // Add `.anim` after first paint so the transform-only entrance plays on load
  // (and never hides content for print/PDF/screenshots).
  useEffect(() => setAnim(true), []);

  return (
    <div className="shell">
      <main className={`bento${anim ? ' anim' : ''}`}>
        {/* PROFILE */}
        <section className="card a-profile c1">
          <div className="photo">
            <img src={asset('/assets/scholar/naveen-kumar.png')} alt="Portrait of Naveen Kumar G" />
            <span className="badge">BGSCET · MBA</span>
          </div>
          <div className="pbody">
            <h1>
              Naveen<br />
              <em>Kumar</em> G
            </h1>
            <p className="role">
              <b>Founding Director</b>, MBA Program &amp; <b>Assistant Professor of Economics</b>.
            </p>
            <div className="links">
              {/* Gmail compose (new tab) instead of mailto: — a plain mailto
                  does nothing on devices with no default mail app configured,
                  which is what made this button feel "broken". This opens a
                  pre-addressed Gmail compose window for anyone signed in. */}
              <a
                className="primary"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nkumar1@bgscet.ac.in&su=Enquiry"
                target="_blank"
                rel="noopener"
              >
                Email me <span className="ar">→</span>
              </a>
              <a href={asset('/assets/scholar/naveen-kumar-g-cv.pdf')} target="_blank" rel="noopener">
                Curriculum Vitae <span className="ar">→</span>
              </a>
              <a
                href="https://scholar.google.com/citations?hl=en&user=msRYgo0AAAAJ"
                target="_blank"
                rel="noopener"
              >
                Google Scholar <span className="ar">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="card a-about c2">
          <p className="lead">
            I serve as the <em>Founding Director of the MBA Program</em> at{' '}
            <a className="inline" href="https://mba.bgscet.ac.in/" target="_blank" rel="noopener">
              BGS College of Engineering &amp; Technology
            </a>
            , Bengaluru.
          </p>
          <p>
            I received a PhD in Economics from the University of Illinois Chicago, a Master&apos;s in
            Management from the London School of Economics and Political Science, and a Bachelor&apos;s
            degree in Engineering from Visvesvaraya Technological University.
          </p>
          <p>
            My research interests span Applied Microeconomics, Economics of Education, Development
            Economics, and Sustainable Agriculture. Broadly, my work studies how institutions,
            incentives, and public policy shape educational and economic outcomes in developing
            countries.
          </p>
          <p>
            I am an Invited Researcher at{' '}
            <a className="inline" href="https://www.povertyactionlab.org/" target="_blank" rel="noopener">
              J-PAL South Asia
            </a>
            .
          </p>
        </section>

        {/* RESEARCH */}
        <section className="card a-research c4">
          <div className="tabs" role="tablist">
            <button
              className={`tab${tab === 'published' ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === 'published'}
              onClick={() => setTab('published')}
            >
              Published <span className="ct">1</span>
            </button>
            <button
              className={`tab${tab === 'working' ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === 'working'}
              onClick={() => setTab('working')}
            >
              Working Papers <span className="ct">3</span>
            </button>
            <button
              className={`tab${tab === 'wip' ? ' active' : ''}`}
              role="tab"
              aria-selected={tab === 'wip'}
              onClick={() => setTab('wip')}
            >
              In Progress <span className="ct">3</span>
            </button>
          </div>
          <div className="tabpanes">
            <div className={`pane${tab === 'published' ? ' active' : ''}`} id="pane-published">
              <a
                className="pub"
                href="https://www.sciencedirect.com/science/article/abs/pii/S0272775723001127"
                target="_blank"
                rel="noopener"
              >
                <div className="pt">
                  <span>Improving Public School Productivity: Evidence from Model Schools in India</span>
                  <span className="ar">→</span>
                </div>
                <div className="meta">Sole-authored</div>
                <div className="tagrow">
                  <span className="venue">Economics of Education Review · Vol. 97 · 2023</span>
                  <span className="award">EER 2023 Best Paper</span>
                  <span className="award">James Doti Award · UIC</span>
                </div>
              </a>
            </div>
            <div className={`pane${tab === 'working' ? ' active' : ''}`} id="pane-working">
              <div className="pub">
                <div className="pt">
                  <span>Pitfalls of Government Dashboards: Experimental Evidence from India</span>
                </div>
                <div className="meta">
                  <span className="with">
                    with A. Arun (UC Irvine), S. Brownstone (UCSD), S. George (NUS) &amp; K.
                    Muralidharan (UCSD)
                  </span>
                </div>
              </div>
              <div className="pub">
                <div className="pt">
                  <span>
                    Learning in Isolation: The Human &amp; Social Capital Effects of Targeted Schooling
                    Systems
                  </span>
                </div>
                <div className="meta">
                  <span className="with">with Kartik Srivastava (Harvard)</span>
                </div>
              </div>
              <div className="pub">
                <div className="pt">
                  <span>Measuring College Quality and Its Determinants</span>
                </div>
                <div className="meta">
                  <span className="with">
                    with A. Aiyer (UPenn), G. Khanna (UCSD) &amp; K. Muralidharan (UCSD)
                  </span>
                </div>
              </div>
            </div>
            <div className={`pane${tab === 'wip' ? ' active' : ''}`} id="pane-wip">
              <div className="pub">
                <div className="pt">
                  <span>Effects of Residential School Education on Senior-Secondary Outcomes</span>
                </div>
                <div className="meta">
                  <span className="with">with T. Chakravorty (UCSD) &amp; S. Ramachandran (UCSD)</span>
                </div>
              </div>
              <div className="pub">
                <div className="pt">
                  <span>Incentivising Sustainable Paddy Cultivation in India</span>
                </div>
                <div className="meta">
                  <span className="with">with Nicholas Ryan (Yale) &amp; S. Brownstone (UCSD)</span>
                </div>
              </div>
              <div className="pub">
                <div className="pt">
                  <span>Impact of Public-Funded Residential Schools on the Local School Market</span>
                </div>
                <div className="meta">
                  <span className="with">
                    with J. Nadal (Michigan State), V. Varghese (Alma) &amp; A. Acharya (UCSD)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEACHING */}
        <section className="card a-teaching c3">
          <div className="glow" />
          <div className="card-label">Teaching</div>
          <div className="teach-split">
            <div className="teach-col">
              <div className="th">Undergraduate</div>
              <ul>
                <li>Microeconomics</li>
                <li>Economics of Sports</li>
                <li>Karnataka Economy</li>
                <li>Rural Economics</li>
                <li>Business Environment</li>
              </ul>
            </div>
            <div className="teach-col">
              <div className="th">Graduate</div>
              <ul>
                <li>Economics for Decision Making (MBA)</li>
              </ul>
            </div>
          </div>
          <div className="teach-honour">
            <b>Winifred Geldard Memorial Award</b> — 2017 &amp; 2020, Dept. of Economics, UIC.
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { asset } from '@/lib/basePath';

export const metadata = {
  title: 'Dr. Naveen Kumar G — Economist | BGSCET',
  description:
    'Naveen Kumar G — Founding Director of the MBA Program and Assistant Professor of Economics at BGS College of Engineering & Technology, Bengaluru. Invited Researcher at J-PAL South Asia.',
};

export default function NaveenKumarGAboutPage() {
  return (
    <main className="sch-main">
      <section className="sch-about">
        <div className="sch-photo">
          <img
            src={asset('/assets/scholar/naveen-kumar-g.webp')}
            width="600"
            height="700"
            alt="Naveen Kumar G"
          />
        </div>

        <div className="sch-bio">
          <p>
            I serve as the <strong>Founding Director of the MBA Program</strong> and an{' '}
            Assistant Professor of Economics at BGS College of Engineering &amp; Technology,
            Bangalore.
          </p>

          <p>
            I obtained a Ph.D. in Economics from the University of Illinois Chicago in 2020 and
            completed postdoctoral studies at the University of California San Diego (2020–22). I hold
            an MSc in Management from the London School of Economics (2015) and a BE in Electronics
            &amp; Communication from Visvesvaraya Technological University (2012).
          </p>

          <p>
            I am an Invited Researcher at the{' '}
            <a href="https://www.povertyactionlab.org/" target="_blank" rel="noopener noreferrer">
              Jameel Poverty Action Lab (J-PAL) South Asia
            </a>
            .
          </p>

          <p className="sch-meta">
            <strong>Research Interests:</strong> Development Economics, Applied Microeconomics,
            Economics of Education, Agricultural Economics
          </p>

          <p className="sch-meta">
            <strong>Courses Taught:</strong> Microeconomics: Theory &amp; Applications, The Economics
            of Sports, Karnataka Economy, Rural Economics, Business Environment, Economics for
            Decision Making (MBA)
          </p>

          <p className="sch-meta">
            <strong>Contact:</strong>{' '}
            <a href="mailto:nkumar1@bgscet.ac.in">nkumar1@bgscet.ac.in</a>
          </p>

          <div className="sch-actions">
            <a className="sch-btn" href={asset('/assets/scholar/naveen-kumar-g-cv.pdf')} download>
              Download CV
            </a>
            <Link className="sch-btn sch-btn-ghost" href="/Naveen-Kumar-G/research/">
              Go to Research
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

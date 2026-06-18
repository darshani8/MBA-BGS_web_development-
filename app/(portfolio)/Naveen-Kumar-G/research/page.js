import Link from 'next/link';
import { asset } from '@/lib/basePath';

export const metadata = {
  title: 'Research — Dr. Naveen Kumar G | BGSCET',
  description:
    'Published articles, working papers and work in progress by Naveen Kumar G — development economics, economics of education and agricultural economics.',
};

export default function NaveenKumarGResearchPage() {
  return (
    <main className="sch-main">
      <div className="sch-research">
        <header className="sch-research-head">
          <h1>Research</h1>
          <p>
            My work spans development economics, the economics of education and agricultural
            economics, with a focus on India.
          </p>
        </header>

        <section className="sch-pubs">
          <h2>Published Articles</h2>
          <ul>
            <li>
              <span className="sch-pub-title">
                “Improving Public School Productivity: Evidence from Model Schools in India.”
              </span>{' '}
              <em>Economics of Education Review</em> 97, 2023.
              <ul className="sch-awards">
                <li><em>Economics of Education Review</em> 2023 Best Paper Award</li>
                <li><em>James Doti Award</em>, Dept. of Economics, UIC</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="sch-pubs">
          <h2>Working Papers</h2>
          <ul>
            <li>
              <span className="sch-pub-title">
                “Should You Manage What You Can Measure? The Promises and Pitfalls of Monitoring
                Bureaucrat Performance”
              </span>{' '}
              <span className="sch-coauthors">
                with Advitha Arun (UC Irvine), Steven Brownstone (UC San Diego), Siddharth George
                (NUS), Karthik Muralidharan (UC San Diego)
              </span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Long Run Effects of Residential School Education: Evidence from Social Welfare
                Schools in India”
              </span>{' '}
              <span className="sch-coauthors">with Kartik Srivastava (Harvard)</span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Measuring College Quality and its Determinants”
              </span>{' '}
              <span className="sch-coauthors">
                with Advait Aiyer (UPenn), Gaurav Khanna (UC San Diego), Karthik Muralidharan (UC San
                Diego)
              </span>
            </li>
          </ul>
        </section>

        <section className="sch-pubs">
          <h2>Work in Progress</h2>
          <ul>
            <li>
              <span className="sch-pub-title">
                “Effects of Residential School Education on Senior-Secondary School Outcomes”
              </span>{' '}
              <span className="sch-coauthors">
                with Torsha Chakravorty (UC San Diego), Sabareesh Ramachandran (UC San Diego)
              </span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Incentivising Sustainable Paddy Cultivation in Karnataka”
              </span>{' '}
              <span className="sch-coauthors">
                with Nicholas Ryan (Yale), Steven Brownstone (UC San Diego)
              </span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Addressing Lack of Information, Access to Role Models, Financial Constraints and
                Parents’ Preferences to Improve Career Mapping”
              </span>{' '}
              <span className="sch-coauthors">
                with Torsha Chakravorty (UC San Diego), Sabareesh Ramachandran (ISB)
              </span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Impact of Public-Funded Residential Schools on Local School Market”
              </span>{' '}
              <span className="sch-coauthors">
                with Josep Nadal (Michigan State University), Vinitha Varghese (Alma Michigan), Aditi
                Acharya (UC San Diego)
              </span>
            </li>
            <li>
              <span className="sch-pub-title">
                “Learning Loss among Students from Low Socio-Economic Communities during COVID-19”
              </span>{' '}
              <span className="sch-coauthors">
                with Arun Jyothi (J-PAL), Sabareesh Ramachandran (ISB)
              </span>
            </li>
          </ul>
        </section>

        <section className="sch-pubs">
          <h2>Professional Experience</h2>
          <ul className="sch-exp">
            <li>Assistant Professor of Economics, BGS College of Engineering &amp; Technology, 2023–present</li>
            <li>Founding Director, MBA, BGS College of Engineering &amp; Technology, 2023–present</li>
            <li>Invited Researcher, Jameel Poverty Action Lab (J-PAL) South Asia, 2024–present</li>
            <li>Consultant, Centre for Effective Governance of Indian States (CEGIS), India, 2024–present</li>
            <li>Postdoctoral Fellow, Jameel Poverty Action Lab, 2022–2023</li>
            <li>Faculty Affiliate, Takshashila Institution, India, 2020–present</li>
            <li>Consultant, Jan Sahas, India, 2019–2023</li>
            <li>Consultant, Outline India, India, 2018</li>
            <li>Research Intern, United Nations Development Programme, India, 2018</li>
            <li>Associate Consultant, Oracle Financial Software Services, India, 2012–2013</li>
          </ul>
        </section>

        <section className="sch-pubs">
          <h2>Awards &amp; Service</h2>
          <p className="sch-meta">
            <strong>Teaching Award:</strong> Graduate Winifred Geldard Memorial Award, 2017 &amp;
            2020, Dept. of Economics, UIC
          </p>
          <p className="sch-meta">
            <strong>Referee:</strong> Journal of Human Resources · Journal of Development Economics ·
            Journal of Policy Analysis and Management · Education Economics · Economics of Education
            Review
          </p>
        </section>

        <div className="sch-actions">
          <a className="sch-btn" href={asset('/assets/scholar/naveen-kumar-g-cv.pdf')} download>
            Download Full CV
          </a>
          <Link className="sch-btn sch-btn-ghost" href="/Naveen-Kumar-G/">
            Back to About
          </Link>
        </div>
      </div>
    </main>
  );
}

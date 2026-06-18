import PageContent from '@/lib/PageContent';
import JourneyScripts from '@/app/components/JourneyScripts';

export const metadata = {
  title: 'The MBA Journey — Reboot · Excel · Elevate | BGSCET MBA',
  description:
    'The BGSCET MBA 3-stage transformation, on a single futuristic timeline: the 18-day Reboot bootcamp, the 180-day Excel core with a 30-day organizational immersion, and the 180-day Elevate stage with placement assistance and industry exposure.',
};

export default function JourneyPage() {
  return (
    <>
      <PageContent name="journey" tag="div" />
      <JourneyScripts />
    </>
  );
}

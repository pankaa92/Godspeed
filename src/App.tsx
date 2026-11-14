import {useEffect, useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {ContactAndFooter} from './components/ContactAndFooter';
import {FleetSection} from './components/FleetSection';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {RoutesAndEstimator} from './components/RoutesAndEstimator';

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4FAFF] text-slate-900">
      {mapsQuotaExceeded && (
        <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-950 underline hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar />
      <main>
        <HeroSection />
        <RoutesAndEstimator />
        <FleetSection />
        <AboutSection />
        <ContactAndFooter />
      </main>
    </div>
  );
}

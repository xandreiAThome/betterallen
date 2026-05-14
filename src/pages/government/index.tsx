import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { getBannerConfig } from '@/data/govBannerConfig';
import Section from '../../components/ui/Section';
import ElectedOfficialsNav from '../../components/gov-components/ElectedOfficialsNav';
import PageBanner from '@/components/ui/PageBanner';
import GovernmentNav from '@/components/gov-components/GovernmentNav';

const Government: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isElectedOfficialsRoute = currentPath.startsWith(
    '/government/elected-officials'
  );

  // FIX: Safety Redirect. If user hits exactly /government, bounce them to elected-officials
  if (currentPath === '/government' || currentPath === '/government/') {
    return <Navigate to="/government/elected-officials" replace />;
  }

  // Extract route key from path (e.g., /government/elected-officials → elected-officials, /government/elected-officials/committees → elected-officials/committees)
  const pathAfterGovernment =
    currentPath.split('/government/')[1] || 'elected-officials';
  const bannerConfig = getBannerConfig(pathAfterGovernment);

  return (
    <>
      {/* Let child page handles its own SEO */}
      {/* Dynamic banner config for all govt subroutes */}
      {bannerConfig && (
        <PageBanner
          title={bannerConfig.title}
          description={bannerConfig.description}
          titleSize={bannerConfig.titleSize}
        />
      )}

      <Section aria-label="Government information sections">
        <GovernmentNav />

        {isElectedOfficialsRoute && (
          <nav className="mt-6" aria-label="Elected officials navigation">
            <ElectedOfficialsNav />
          </nav>
        )}

        {/* Nested content area for subroutes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </Section>
    </>
  );
};

export default Government;

import { Outlet } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const About: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Reimplementation of redirect from goverment/index.tsx
  if (currentPath === '/about' || currentPath === '/about/') {
    return <Navigate to="/about/allen" replace />;
  }

  return (
    <>
      <SEO
        title="About"
        description="Learn about Allen municipality and the BetterGov initiative."
        keywords="Allen, municipality, BetterGov, BetterLGU, local government"
      />
      <main className="grow">
        {/* Child route renders here */}
        <Outlet />
      </main>
    </>
  );
};

export default About;

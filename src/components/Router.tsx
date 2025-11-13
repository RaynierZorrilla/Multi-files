import { useState, useEffect, ReactNode } from 'react';

interface Route {
  path: string;
  component: ReactNode;
}

interface RouterProps {
  routes: Route[];
}

export const Router = ({ routes }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentRoute = routes.find((route) => route.path === currentPath) || routes[0];

  return <>{currentRoute.component}</>;
};

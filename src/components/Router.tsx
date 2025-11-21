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

    // Escuchar cambios en el historial del navegador
    window.addEventListener('popstate', handlePopState);
    
    // También escuchar eventos personalizados de navegación
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('navigation', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigation', handleNavigation as EventListener);
    };
  }, []);

  const currentRoute = routes.find((route) => route.path === currentPath) || routes[0];

  return <>{currentRoute.component}</>;
};

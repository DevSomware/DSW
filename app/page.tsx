'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@/app/components/Hero';
import  ContentSection  from '@/app/components/ContentSection';
import Preloader from '@/app/components/Preloader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-white z-[9999]" />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="w-full bg-black">
      <Hero />
      <ContentSection />
    </main>
  );
}

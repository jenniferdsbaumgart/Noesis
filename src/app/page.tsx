import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Architecture } from '@/components/architecture';
import { UseCases } from '@/components/use-cases';
import { Numbers } from '@/components/numbers';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Numbers />
      <Features />
      <Architecture />
      <UseCases />
      <Contact />
      <Footer />
    </main>
  );
}

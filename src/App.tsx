import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectionConcept } from './components/SectionConcept';
import { SectionStory } from './components/SectionStory';
import { SectionCategories } from './components/SectionCategories';
import { SectionFeedback } from './components/SectionFeedback';
import { Footer } from './components/Footer';
import { ProductPreviewModal, type PreviewProductData } from './components/ProductPreviewModal';
import { FestiveFrame } from './components/DiwaliDecor';

export function App() {
  const [previewProduct, setPreviewProduct] = useState<PreviewProductData | null>(null);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#FBF3E9] text-[#F5EFEB] selection:bg-[#D49B44] selection:text-[#4A1702]">
      <Navbar />
      <main>
        <HeroSection onExplore={() => scrollTo('categories')} onShareFeedback={() => scrollTo('feedback')} />
        <div className="theme-story festive-section"><FestiveFrame /><SectionStory /></div>
        <SectionConcept />
        <div className="theme-store festive-section"><FestiveFrame /><SectionCategories onPreviewProduct={setPreviewProduct} onShareFeedback={() => scrollTo('feedback')} /></div>
        <SectionFeedback />
      </main>
      <Footer />
      <ProductPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} onShareFeedback={() => { setPreviewProduct(null); scrollTo('feedback'); }} />
    </div>
  );
}

export default App;

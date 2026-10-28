export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#422211] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div><div className="inline-flex rounded-2xl bg-[#F5D9C8] px-3 py-1 shadow-lg"><img src="/brand/harsun-logo-transparent.png" alt="HarSun Chocolates" className="h-20 w-auto" /></div><p className="text-sm text-neutral-300 mt-4 max-w-md">A family inspired chocolate idea in the planning stage. Your feedback will help us shape it.</p></div>
        <div className="flex flex-wrap gap-5 text-sm text-neutral-300"><a href="#story" className="hover:text-[#F5D394]">Our Story</a><a href="#vision" className="hover:text-[#F5D394]">Vision &amp; Plans</a><a href="#categories" className="hover:text-[#F5D394]">Our Store</a><a href="#feedback" className="hover:text-[#F5D394]">Reviews &amp; Feedback</a></div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-neutral-500">© {new Date().getFullYear()} HarSun Chocolates · Pre-launch concept · Two Names. One Sweet Dream.</div>
    </footer>
  );
}

import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, MessageCircle, Send, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';

type Interest = 'yes' | 'maybe' | 'no';
type Product = 'bars' | 'handmade' | 'gifts' | 'unsure';
interface Summary { responses: number; interested: number }

export function SectionFeedback() {
  const reduced = useReducedMotion();
  const [interest, setInterest] = useState<Interest | ''>('');
  const [product, setProduct] = useState<Product | ''>('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [email, setEmail] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const progress = Number(name.trim().length >= 2) + Number(rating > 0) + Number(Boolean(interest)) + Number(Boolean(product)) + Number(opinion.trim().length >= 10);

  useEffect(() => {
    fetch('/api/feedback/summary').then(r => r.ok ? r.json() : null).then(data => { if (data) setSummary(data); }).catch(() => {});
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2 || !rating || !interest || !product || opinion.trim().length < 10) { setError('Please complete your name, rating, and feedback questions.'); return; }
    if (email && !contactConsent) { setError('Please agree to be contacted, or leave your email blank.'); return; }
    setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), rating, interest, product, opinion: opinion.trim(), email: email.trim(), contactConsent, website }) });
      if (!response.ok) { const result = await response.json().catch(() => null); throw new Error(result?.error || 'Feedback could not be saved. Please try again.'); }
      setStatus('success');
      setSummary(previous => previous ? { responses: previous.responses + 1, interested: previous.interested + (interest === 'yes' ? 1 : 0) } : previous);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Feedback could not be saved.'); setStatus('error'); }
  };

  return (
    <section id="feedback" className="theme-feedback px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
      <Reveal direction="up" className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div className="space-y-5"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5D394]"><MessageCircle className="w-4 h-4" /> Reviews &amp; Feedback</span><h2 className="text-4xl sm:text-5xl font-bold leading-tight">What do <span className="apple-gold-gradient italic">you think?</span></h2><p className="text-neutral-300 leading-relaxed">We want honest reactions before we make anything official. Tell us what interests you, what you would change, and whether you might buy from us after launch. Every answer helps.</p><p className="text-sm text-neutral-400">Feedback is shared privately with the HarSun team. We will not publish your words or contact you unless you choose to leave an email and give permission.</p>{summary && summary.responses > 0 && <div className="rounded-2xl border border-[#D49B44]/25 bg-[#D49B44]/10 p-5"><p className="text-2xl font-bold text-[#F5D394]">{summary.responses} {summary.responses === 1 ? 'person has' : 'people have'} shared feedback</p><p className="text-sm text-neutral-300 mt-1">{summary.interested} said they would be interested in buying after launch.</p></div>}<Reveal direction="scale" delay={0.15} className="pt-4"><div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"><img src="/brand/editorial/feedback-note.jpg" alt="A blank note card and chocolate inviting visitors to share their thoughts" loading="lazy" decoding="async" width="1448" height="1086" className="w-full h-full object-cover object-center" /></div></Reveal></div>
        <div className="apple-bento-card rounded-3xl p-6 sm:p-9 text-[#F5EFEB]">
          {status === 'success' ? <div role="status" className="py-10 text-center space-y-4"><CheckCircle2 className="w-12 h-12 text-[#F5D394] mx-auto" /><h3 className="text-2xl font-bold">Thank you for helping us begin.</h3><p className="text-neutral-300">Your feedback was sent and will help us shape HarSun.</p></div> :
          <form onSubmit={submit} className="space-y-7">
            <div><h3 className="text-xl font-bold">Share your honest view</h3><p className="text-sm text-neutral-400 mt-1">About two minutes · No account needed</p></div>
            <div aria-label={`${progress} of 5 feedback fields answered`} className="h-1.5 rounded-full bg-white/10 overflow-hidden"><motion.div animate={{ width: `${(progress / 5) * 100}%` }} transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394]" /></div>
            <div className="grid sm:grid-cols-2 gap-5 items-end">
              <label className="block text-sm font-semibold">Your name <span className="text-[#F5D394]">*</span><input type="text" autoComplete="name" required minLength={2} maxLength={80} value={name} onChange={event => setName(event.target.value)} placeholder="Your name" className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 p-3.5 text-white placeholder:text-neutral-500 outline-none focus:border-[#D49B44] font-normal" /></label>
              <fieldset><legend className="text-sm font-semibold mb-3">Rate our idea <span className="text-[#F5D394]">*</span></legend><div className="flex gap-1.5" aria-label="Rate the HarSun idea from 1 to 5 stars">{([1, 2, 3, 4, 5] as const).map(value => <label key={value} className={`feedback-choice flex h-10 w-10 items-center justify-center rounded-lg border cursor-pointer ${rating >= value ? 'border-[#D49B44] bg-[#D49B44]/20 text-[#F5D394]' : 'border-white/15 bg-white/5 text-neutral-400 hover:border-[#D49B44]/60'}`} title={`${value} of 5 stars`}><input className="sr-only" type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} of 5 stars`} /><Star className={`h-5 w-5 ${rating >= value ? 'fill-current' : ''}`} /></label>)}</div></fieldset>
            </div>
            <fieldset className="space-y-3"><legend className="text-sm font-semibold text-white mb-3">Would you consider buying HarSun chocolates when we launch? <span className="text-[#F5D394]">*</span></legend><div className="flex flex-wrap gap-2">{([['yes', 'Yes, I would'], ['maybe', 'Maybe'], ['no', 'Probably not']] as const).map(([value, label]) => <label key={value} className={`feedback-choice px-4 py-2.5 rounded-full border text-sm cursor-pointer transition-colors ${interest === value ? 'bg-[#D49B44] text-[#120A05] border-[#D49B44]' : 'bg-white/5 text-neutral-200 border-white/15 hover:border-[#D49B44]/60'}`}><input className="sr-only" type="radio" name="interest" value={value} checked={interest === value} onChange={() => setInterest(value)} required />{label}</label>)}</div></fieldset>
            <fieldset className="space-y-3"><legend className="text-sm font-semibold text-white mb-3">Which idea interests you most? <span className="text-[#F5D394]">*</span></legend><div className="grid sm:grid-cols-2 gap-2">{([['bars', 'Everyday chocolate bars'], ['handmade', 'Handmade treats'], ['gifts', 'Chocolate gift boxes'], ['unsure', 'Not sure yet']] as const).map(([value, label]) => <label key={value} className={`feedback-choice px-4 py-3 rounded-xl border text-sm cursor-pointer transition-colors ${product === value ? 'bg-[#D49B44]/20 text-[#F5D394] border-[#D49B44]' : 'bg-white/5 text-neutral-200 border-white/15 hover:border-[#D49B44]/60'}`}><input className="sr-only" type="radio" name="product" value={value} checked={product === value} onChange={() => setProduct(value)} required />{label}</label>)}</div></fieldset>
            <label className="block text-sm font-semibold">What do you like, or what should we change? <span className="text-[#F5D394]">*</span><textarea required minLength={10} maxLength={2000} value={opinion} onChange={e => setOpinion(e.target.value)} rows={4} placeholder="Flavours, packaging, price expectations, concerns, or any honest thought..." className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 p-4 text-white placeholder:text-neutral-500 outline-none focus:border-[#D49B44] resize-y font-normal" /></label>
            <div className="space-y-3 border-t border-white/10 pt-6"><label className="block text-sm font-semibold">Email for a possible follow-up <span className="font-normal text-neutral-400">(optional)</span><input type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 p-3.5 text-white placeholder:text-neutral-500 outline-none focus:border-[#D49B44] font-normal" /></label><label className="flex gap-3 text-xs text-neutral-400 cursor-pointer"><input type="checkbox" checked={contactConsent} onChange={e => setContactConsent(e.target.checked)} className="mt-0.5 accent-[#D49B44]" />You may contact me about my feedback and the eventual launch. No marketing list is created from this form.</label></div>
            <label className="hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
            {error && <p role="alert" className="text-sm text-[#F4B7B7]">{error}</p>}
            <button disabled={status === 'sending'} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D49B44] to-[#F5D394] px-6 py-3.5 text-[#120A05] font-bold cursor-pointer disabled:opacity-60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"><Send className="w-4 h-4" />{status === 'sending' ? 'Sending...' : 'Send feedback'}</button>
          </form>}
        </div>
      </Reveal>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import {
  ArrowRight,
  Bike,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Facebook,
  Globe2,
  Instagram,
  MapPin,
  Menu,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Twitter,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swift — Book, track & deliver anything, anywhere" },
      { name: "description", content: "On-demand logistics for individuals and businesses. Live tracking, verified riders, transparent pricing across 42 cities." },
      { property: "og:title", content: "Swift — On-demand logistics platform" },
      { property: "og:description", content: "Book deliveries in seconds. Track in real time. Scale your fleet with Swift." },
    ],
  }),
  component: Landing,
});

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Become a Rider", href: "#rider-cta" },
  { label: "Contact", href: "#contact" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Hero />
      <Trusted />
      <Services />
      <HowItWorks />
      <LiveTracking />
      <Cities />
      <Pricing />
      <Testimonials />
      <FAQ />
      <MobileApp />
      <RiderCTA />
      <Footer />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
        <Logo />
        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Link to="/track" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Track Delivery</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="hidden text-sm font-medium text-foreground hover:text-brand sm:inline-block">Login</Link>
          <Button asChild className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 shadow-[var(--shadow-glow)]">
            <Link to="/book">Book Delivery</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} className="text-base font-medium text-foreground">{l.label}</a>
                ))}
                <Link to="/track" className="text-base font-medium text-foreground">Track Delivery</Link>
                <Link to="/login" className="text-base font-medium text-foreground">Login</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-info/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <Zap className="h-3.5 w-3.5" /> Live in 42 cities
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Move anything.<br />
            <span className="text-gradient-brand">Anywhere, in minutes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Same-day pickup and drop-off with verified riders, live tracking, and transparent pricing — for individuals and businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-brand text-brand-foreground shadow-[var(--shadow-glow)] hover:bg-brand/90">
              <Link to="/book">Book a delivery <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/track">Track package</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { v: "2.4M+", l: "Deliveries" },
              { v: "18k", l: "Active riders" },
              { v: "4.9★", l: "Rider rating" },
              { v: "12min", l: "Avg pickup" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-bold text-foreground">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <MapPlaceholder className="h-[480px] shadow-[var(--shadow-elegant)]" label="Lagos — Live Fleet" />
          <div className="absolute -bottom-6 -left-6 w-64 rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success"><CheckCircle2 className="h-5 w-5" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Delivery #SW-8241</p>
                <p className="text-sm font-semibold">Arrived in 14 min</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 top-8 w-56 rounded-2xl border border-border bg-card p-4 shadow-xl">
            <p className="text-xs text-muted-foreground">ETA to drop-off</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">6 min</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trusted() {
  const brands = ["Jumia", "Konga", "Paystack", "Flutterwave", "Chowdeck", "Bolt", "Kuda"];
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trusted by teams shipping every day</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {brands.map((b) => (
            <span key={b} className="font-display text-xl font-bold tracking-tight text-foreground/60">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Bike, title: "Motorbike", desc: "Fast small package delivery under 20kg. Best for documents & food.", price: "from ₦1,500" },
    { icon: Package, title: "Car", desc: "Mid-size loads up to 300kg. Ideal for e-commerce and grocery.", price: "from ₦3,800" },
    { icon: Truck, title: "Van & Truck", desc: "Bulk moves, furniture, and full fleet operations.", price: "from ₦12,000" },
    { icon: Globe2, title: "Interstate", desc: "Overnight and next-day shipping across cities and states.", price: "from ₦4,500" },
  ];
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand">Services</span>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">One platform, every shipment</h2>
        <p className="mt-4 text-muted-foreground">From an envelope across town to a truck across the country — Swift routes it, tracks it, and delivers it.</p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, desc, price }) => (
          <div key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-brand transition group-hover:scale-110"><Icon className="h-6 w-6" /></div>
            <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            <p className="mt-4 text-sm font-semibold text-brand">{price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: MapPin, title: "Set pickup & drop-off", desc: "Pin locations or search addresses. See price and ETA instantly." },
    { n: "02", icon: Bike, title: "Get matched with a rider", desc: "Verified riders accept within seconds. Track them live on the map." },
    { n: "03", icon: ShieldCheck, title: "Delivered securely", desc: "Recipients confirm with a one-time code. You get a receipt." },
  ];
  return (
    <section id="how" className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">How it works</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Three steps. Under a minute.</h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, title, desc }) => (
            <div key={n} className="relative rounded-2xl border border-border bg-card p-8">
              <span className="font-display text-6xl font-bold text-brand/15">{n}</span>
              <div className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-brand text-brand-foreground"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveTracking() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:px-8">
      <div>
        <span className="text-sm font-semibold uppercase tracking-widest text-brand">Live Tracking</span>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Every meter, on the map.</h2>
        <p className="mt-4 text-muted-foreground">Watch your delivery in real time, share tracking links with recipients, and get precise ETAs down to the minute.</p>
        <ul className="mt-8 space-y-3">
          {["Second-by-second GPS updates", "Verified pickup and drop-off photos", "Shareable public tracking link", "SMS + email + push notifications"].map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-foreground">
              <CheckCircle2 className="h-5 w-5 text-brand" /> {f}
            </li>
          ))}
        </ul>
      </div>
      <MapPlaceholder className="h-[420px] shadow-[var(--shadow-elegant)]" label="Tracking #SW-8241" />
    </section>
  );
}

function Cities() {
  const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Accra", "Nairobi", "Kigali", "Cape Town", "Kampala", "Dakar", "Dar es Salaam"];
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">Coverage</span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">Available in 42 cities</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-brand">View all →</a>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {cities.map((c) => (
            <div key={c} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-brand" /> {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Personal", price: "Pay as you go", desc: "For occasional deliveries.", features: ["Live tracking", "Cash or wallet", "In-app support"], cta: "Get started" },
    { name: "Business", price: "₦0/mo", desc: "Best for growing merchants.", features: ["Bulk booking", "API & webhooks", "Dedicated ops manager", "Invoice billing"], cta: "Talk to sales", featured: true },
    { name: "Enterprise", price: "Custom", desc: "For fleets & 3PLs.", features: ["Custom SLA", "White-label rider app", "Dedicated fleet", "SSO & audit logs"], cta: "Contact us" },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand">Pricing</span>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Transparent, per delivery.</h2>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className={`relative rounded-2xl border p-8 ${t.featured ? "border-brand bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]" : "border-border bg-card"}`}>
            {t.featured && <span className="absolute right-6 top-6 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">Popular</span>}
            <p className="font-display text-lg font-bold">{t.name}</p>
            <p className={`mt-3 font-display text-4xl font-bold ${t.featured ? "" : "text-foreground"}`}>{t.price}</p>
            <p className={`mt-2 text-sm ${t.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t.desc}</p>
            <ul className={`mt-6 space-y-2.5 text-sm ${t.featured ? "text-primary-foreground/90" : "text-foreground"}`}>
              {t.features.map((f) => <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> {f}</li>)}
            </ul>
            <Button className={`mt-8 w-full rounded-full ${t.featured ? "bg-brand text-brand-foreground hover:bg-brand/90" : ""}`} variant={t.featured ? "default" : "outline"}>
              {t.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Chidi Obi", role: "Founder, Prints & Co", quote: "Swift cut our delivery time in half. The dashboard is the cleanest we've used.", rating: 5 },
    { name: "Amaka Nwosu", role: "Ops Lead, HealthMart", quote: "Real-time tracking means fewer WISMO calls. Our support tickets dropped 60%.", rating: 5 },
    { name: "Tunde Balogun", role: "Rider · 3 years", quote: "Best rider app I've used. Payouts hit weekly without fail.", rating: 5 },
  ];
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">Loved by</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Customers and riders</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}</div>
              <p className="mt-4 text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-brand-foreground text-xs font-bold">{t.name.split(" ").map((n) => n[0]).join("")}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How fast will my delivery arrive?", a: "Most deliveries within 45 minutes in urban areas. Interstate typically same or next day." },
    { q: "How does payment work?", a: "Pay by card, wallet, bank transfer, or cash on delivery. Business accounts are invoiced monthly." },
    { q: "Are packages insured?", a: "Yes. Every delivery is covered up to ₦100,000; enterprise plans include higher coverage." },
    { q: "Can I become a rider?", a: "Absolutely. Sign up in the Rider portal, complete verification, and you can start earning within 48 hours." },
    { q: "Do you offer an API?", a: "Yes. Business and Enterprise plans include a REST API and webhooks for bookings and status." },
  ];
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 lg:px-8">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand">FAQ</span>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Frequently asked</h2>
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i${i}`} className="rounded-xl border border-border bg-card px-5 mb-3">
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function MobileApp() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground lg:p-16">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">Mobile</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Swift in your pocket.</h2>
            <p className="mt-4 text-primary-foreground/70">Book, track, and manage on the go. Available on iOS and Android.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-xl bg-white/10 px-5 py-3 text-left text-sm ring-1 ring-white/20 hover:bg-white/20">
                <p className="text-[10px] uppercase text-primary-foreground/60">Download on</p>
                <p className="font-display text-lg font-bold">App Store</p>
              </button>
              <button className="rounded-xl bg-white/10 px-5 py-3 text-left text-sm ring-1 ring-white/20 hover:bg-white/20">
                <p className="text-[10px] uppercase text-primary-foreground/60">Get it on</p>
                <p className="font-display text-lg font-bold">Google Play</p>
              </button>
            </div>
          </div>
          <div className="relative mx-auto h-80 w-52 rounded-[2.5rem] border-4 border-white/15 bg-black shadow-2xl">
            <div className="absolute inset-2 overflow-hidden rounded-[2rem] bg-background">
              <div className="h-14 border-b border-border p-3 text-xs font-semibold text-foreground">Swift · Book</div>
              <div className="h-40 map-grid" />
              <div className="p-3">
                <div className="rounded-lg bg-muted px-3 py-2 text-xs">📍 Pickup — Yaba</div>
                <div className="mt-2 rounded-lg bg-muted px-3 py-2 text-xs">🎯 Drop — Lekki</div>
                <div className="mt-3 rounded-lg bg-brand py-2 text-center text-xs font-bold text-brand-foreground">Book — ₦2,400</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiderCTA() {
  return (
    <section id="rider-cta" className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-brand/10 via-card to-info/10 p-10 lg:p-16">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand"><DollarSign className="h-3.5 w-3.5" /> Earn on your schedule</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Ride with Swift. Earn more.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Choose your hours, keep 85% of every fare, and get paid weekly. Sign up in 10 minutes.</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> Flexible hours</div>
              <div className="flex items-center gap-2"><Boxes className="h-4 w-4 text-brand" /> More jobs, faster</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Insurance included</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/rider/login">Become a rider <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full"><Link to="/rider/dashboard">Rider portal</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer id="contact" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">Swift is the on-demand logistics platform for individuals, merchants, and fleets moving goods across cities.</p>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">Newsletter</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-2 flex max-w-sm gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-11 flex-1 rounded-full bg-white/10 px-4 text-sm placeholder:text-primary-foreground/40 outline-none ring-1 ring-white/10 focus:ring-brand" />
              <button className="rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground">Join</button>
            </form>
          </div>
        </div>
        {[
          { title: "Platform", links: ["Book Delivery", "Track", "Pricing", "Enterprise API"] },
          { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
        ].map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map((l) => <li key={l}><a href="#" className="text-primary-foreground/80 hover:text-brand">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-primary-foreground/60 lg:px-8">
          <p>© {new Date().getFullYear()} Swift Logistics. All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

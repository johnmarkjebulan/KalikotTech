import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { brand, faqs, heroHighlights, processSteps, reasons, services, stats, testimonials } from '../data/siteData';

function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="hero-orb left-0 top-0 h-72 w-72 bg-cyan-400/35" />
        <div className="hero-orb bottom-0 right-0 h-96 w-96 bg-blue-500/25" />
        <div className="absolute inset-0 bg-hero-grid" />

        <div className="container-shell relative grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <AnimatedSection className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Premium cellphone repair experience
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Repair your phone without the stress, waiting, or guesswork.
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
              Kalikot Tech offers a sleek customer-facing website with online booking, secure accounts,
              repair ticket tracking, and a polished admin workflow for modern repair shops.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100">
              <Icon name="map" className="h-4 w-4" />
              Serving {brand.address} and nearby areas
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/book" className="btn-primary gap-2">
                Book a Repair
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/track" className="btn-secondary gap-2 border-slate-700 bg-slate-900/60 text-white hover:border-cyan-400 hover:bg-slate-900">
                Track a Ticket
              </Link>
              <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary gap-2 border-slate-700 bg-slate-900/60 text-white hover:border-cyan-400 hover:bg-slate-900">
                <Icon name="facebook" className="h-4 w-4" />
                Facebook Page
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15">
                <Icon name="mail" className="h-4 w-4" />
                Chat on Messenger
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <Icon name="bell" className="h-4 w-4 text-cyan-200" />
                Website dashboard alerts + Messenger follow-up
              </span>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                    <Icon name="check" className="h-4 w-4" />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120} className="lg:justify-self-end">
            <div className="glass-panel shine-border relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute -bottom-8 left-0 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900 p-4 shadow-glow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Repair tracking</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">Ticket #SFX-240611</h3>
                    </div>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                      Repair in progress
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Device</p>
                      <p className="mt-2 font-semibold text-white">iPhone 13 Pro</p>
                      <p className="mt-1 text-sm text-slate-300">Screen and frame alignment</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">ETA</p>
                      <p className="mt-2 font-semibold text-white">Ready today</p>
                      <p className="mt-1 text-sm text-slate-300">Quality check scheduled</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    {['Device received and assessed', 'Estimate approved by customer', 'Display installed and tested'].map((step, index) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">{step}</p>
                          <p className="text-sm text-slate-400">Updated by technician through the admin dashboard.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-shell relative z-10 -mt-10 pb-8">
        <AnimatedSection className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="card-panel">
              <p className="text-3xl font-bold text-slate-950">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </AnimatedSection>
      </section>

      <section className="container-shell pb-8">
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card-panel rounded-[2rem] bg-white p-6 sm:p-8">
              <span className="section-tag">Location</span>
              <h2 className="mt-5 text-3xl font-bold text-slate-950">Easy to find, easier to trust</h2>
              <p className="mt-4 text-slate-600">
                Customers can immediately see the exact pinned shop location, which nearby areas are supported,
                and where to open directions before booking.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Shop address</p>
                  <p className="mt-2 text-sm text-slate-700">{brand.address}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Coverage</p>
                  <p className="mt-2 text-sm text-slate-700">{brand.coverageAreas.join(', ')}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={brand.mapLink} target="_blank" rel="noreferrer" className="btn-primary gap-2">
                  <Icon name="map" className="h-4 w-4" />
                  View on Google Maps
                </a>
                <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                  <Icon name="facebook" className="h-4 w-4" />
                  Visit Facebook
                </a>
              </div>
            </div>

            <div className="card-panel rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Service areas</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {brand.coverageAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-slate-300">{brand.location}</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                    <Icon name="bell" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Notification-ready support</p>
                    <p className="mt-2 text-sm text-slate-300">Customers can receive dashboard alerts for estimate approval, ready-for-pickup updates, and completed repairs, then continue the conversation through Messenger.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <SectionHeading
            tag="Services"
            title="Everything a cellphone repair customer expects in one polished website"
            description="The homepage is content-rich and conversion-focused, with service highlights, trust signals, a clear booking path, and a design system built to feel premium on mobile and desktop."
          />
        </AnimatedSection>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug} delay={index * 90}>
              <div className="card-panel h-full rounded-[2rem] border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-glow">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{service.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{service.priceRange}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{service.turnaroundTime}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell">
          <AnimatedSection>
            <SectionHeading
              tag="How it works"
              title="Simple journey from booking to release"
              description="The flow is designed to reduce customer anxiety, improve communication, and help the repair business operate with more structure."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 100}>
                <div className="relative h-full rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="absolute right-5 top-5 text-4xl font-bold text-slate-100">0{index + 1}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection>
            <SectionHeading
              tag="Why choose Kalikot Tech"
              title="Designed to build trust before a customer even walks into the shop"
              description="The UI pairs modern visuals with practical information, giving customers confidence in quality, speed, and repair transparency."
            />
            <Link to="/about" className="btn-primary mt-8 gap-2">
              Learn More About the Brand
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 90}>
                <div className="card-panel h-full rounded-[2rem] bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="container-shell">
          <AnimatedSection>
            <SectionHeading
              tag="Testimonials"
              title="Copy that feels real, not generic"
              description="The content package includes social proof blocks that help the homepage feel complete from day one."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <AnimatedSection key={item.name} delay={index * 80}>
                <div className="glass-panel h-full rounded-[2rem]">
                  <div className="mb-5 flex gap-1 text-cyan-300">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Icon key={`${item.name}-${starIndex}`} name="spark" className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-slate-200">"{item.quote}"</p>
                  <div className="mt-6">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <SectionHeading
            tag="FAQ"
            title="Built-in answers to common repair questions"
            description="These sections reduce support friction and help customers understand the process before booking."
            align="center"
          />
        </AnimatedSection>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {faqs.map((item, index) => (
            <AnimatedSection key={item.question} delay={index * 70}>
              <div className="card-panel rounded-[2rem] border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <AnimatedSection>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 px-6 py-10 text-white shadow-glow sm:px-10 lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Ready to launch
                </span>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">A complete modern website concept for your cellphone repair business</h2>
                <p className="mt-4 max-w-2xl text-slate-300">
                  The project includes frontend pages, backend APIs, authentication, image upload, admin tools, and complete website copy so you can brand it and move straight into setup.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
                <Link to="/register" className="btn-primary gap-2">
                  Create Customer Account
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link to="/services" className="btn-secondary border-slate-700 bg-slate-900/40 text-white hover:bg-slate-900">
                  Explore Services
                </Link>
                <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="btn-secondary border-slate-700 bg-slate-900/40 text-white hover:bg-slate-900">
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default HomePage;

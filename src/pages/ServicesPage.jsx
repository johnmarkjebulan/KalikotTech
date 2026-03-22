import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { perks, services as fallbackServices } from '../data/siteData';

function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get('/services');
        if (Array.isArray(data.services) && data.services.length) {
          setServices(data.services);
        }
      } catch (error) {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div>
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <AnimatedSection>
            <span className="section-tag border-cyan-300/20 bg-cyan-400/10 text-cyan-200">Service Catalog</span>
            <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">Complete repair services with clear pricing cues and turnaround estimates</h1>
            <p className="mt-5 max-w-2xl text-slate-300">
              This page gives customers a clean breakdown of what your shop repairs, how quickly each issue is usually handled, and the type of service experience they can expect.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="glass-panel rounded-[2rem]">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Included in every repair workflow</p>
              <div className="mt-6 space-y-4">
                {perks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                      <Icon name="check" className="h-4 w-4" />
                    </div>
                    <p className="text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <SectionHeading
            tag="Available repairs"
            title={loading ? 'Loading services...' : 'Professional repair options for the most common phone issues'}
            description="If the database has custom service entries, they will appear here. The page also includes polished fallback content so the design never feels empty."
          />
        </AnimatedSection>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug || service.id || service.title} delay={index * 70}>
              <div className="card-panel h-full rounded-[2rem] border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-glow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name={service.icon || 'wrench'} className="h-6 w-6" />
                  </div>
                  {service.featured ? <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">Featured</span> : null}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{service.shortDescription || service.short_description}</p>
                <p className="mt-4 text-sm text-slate-500">{service.fullDescription || service.full_description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{service.priceRange || service.price_range}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{service.turnaroundTime || service.turnaround_time}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Customer-friendly descriptions',
              text: 'Each service card explains the issue in plain language so customers understand what they are booking.',
              icon: 'mail',
            },
            {
              title: 'Pricing and time expectations',
              text: 'The service layout gives quick decision-making support with visible price ranges and estimated timelines.',
              icon: 'clock',
            },
            {
              title: 'Conversion-focused layout',
              text: 'The page naturally pushes visitors toward account creation, online booking, and direct contact.',
              icon: 'chart',
            },
          ].map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 80}>
              <div className="card-panel h-full rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20 pt-4">
        <AnimatedSection>
          <div className="card-panel rounded-[2rem] bg-gradient-to-r from-cyan-50 to-slate-100 px-6 py-10 sm:px-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold">Ready to turn a visitor into a booked repair?</h2>
                <p className="mt-4 max-w-2xl text-slate-600">
                  The service page is already connected to the booking flow, so customers can review the issue type and move directly into a repair request.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/book" className="btn-primary gap-2">
                  Book a Repair
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact the Shop
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default ServicesPage;

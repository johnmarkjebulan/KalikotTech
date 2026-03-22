import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { brand, reasons, stats } from '../data/siteData';

function AboutPage() {
  return (
    <div>
      <section className="container-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <AnimatedSection>
            <SectionHeading
              tag="About the brand"
              title="A repair website concept that feels more premium, trustworthy, and conversion-ready"
              description="Kalikot Tech was written as a complete brand experience for a modern cellphone repair business. The content balances friendly language, technical confidence, and clear customer guidance."
            />
            <div className="mt-8 space-y-4 text-slate-600">
              <p>
                The goal of the project is to help a repair shop look established online, reduce manual follow-ups,
                and offer a more professional experience from first click to final pickup.
              </p>
              <p>
                Instead of a generic brochure site, the website behaves like an actual service platform with accounts,
                repair ticket history, photo uploads, public status checks, and a working admin area.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-panel rounded-[2rem] bg-slate-950 p-8 text-white shadow-glow">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">What the brand promises</p>
              <div className="mt-6 space-y-5">
                {[
                  'Fast service for common phone issues',
                  'Visible repair progress with status logs',
                  'Clean modern UI on all device sizes',
                  'Organized internal workflow for staff',
                ].map((item) => (
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

      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell">
          <AnimatedSection>
            <SectionHeading
              tag="Core values"
              title="Messaging that helps customers trust the service"
              description="These value blocks add depth to the brand story and can also be reused in social media, brochures, and ads."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {reasons.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 80}>
                <div className="card-panel h-full rounded-[2rem] bg-slate-50 p-6">
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

      <section className="container-shell py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <AnimatedSection key={item.label} delay={index * 80}>
              <div className="card-panel rounded-[2rem] border border-slate-200 text-center">
                <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16 sm:pb-20">
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card-panel rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
              <span className="section-tag">Location details</span>
              <h2 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Built for local operations in Balayan and nearby areas</h2>
              <div className="mt-6 space-y-4 text-slate-600">
                <p><span className="font-semibold text-slate-900">Shop address:</span> {brand.address}</p>
                <p><span className="font-semibold text-slate-900">Service model:</span> {brand.location}</p>
                <p><span className="font-semibold text-slate-900">Coverage areas:</span> {brand.coverageAreas.join(', ')}</p>
              </div>
              <a href={brand.mapLink} target="_blank" rel="noreferrer" className="btn-primary mt-6 gap-2">
                <Icon name="map" className="h-4 w-4" />
                Open Location in Maps
              </a>
            </div>

            <div className="card-panel rounded-[2rem] bg-slate-950 p-8 text-white shadow-glow">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Coverage</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {brand.coverageAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-slate-300">
                This makes the website feel more real and easier to trust because customers can quickly see where the shop is based and which nearby towns are supported for pickup or delivery.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <AnimatedSection>
            <span className="section-tag border-cyan-300/20 bg-cyan-400/10 text-cyan-200">Business details</span>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Ready for real repair operations and future customization</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              The project can be customized with your exact services, actual branch address, final rates, technician profiles, and real policy pages so the site can move from concept to production.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="glass-panel rounded-[2rem]">
              <div className="space-y-4 text-sm text-slate-300">
                <p><span className="font-semibold text-white">Brand:</span> {brand.name}</p>
                <p><span className="font-semibold text-white">Phone:</span> {brand.phone}</p>
                <p><span className="font-semibold text-white">Email:</span> {brand.email}</p>
                <p><span className="font-semibold text-white">Address:</span> {brand.address}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

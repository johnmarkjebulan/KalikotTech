import { useState } from 'react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { brand } from '../data/siteData';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const { data } = await api.post('/contacts', form);
      setStatus({ type: 'success', message: data.message || 'Your message has been sent.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to send your message right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="container-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedSection>
            <SectionHeading
              tag="Contact"
              title="A complete support page with real business details and a working inquiry form"
              description="Use this page for bookings that need clarification, corporate account requests, warranty questions, or general customer support."
            />

            <div className="mt-8 space-y-4">
              {[
                { icon: 'phone', label: 'Call or text', value: brand.phone },
                { icon: 'mail', label: 'Email support', value: brand.email },
                { icon: 'map', label: 'Shop address', value: brand.address },
                { icon: 'package', label: 'Service coverage', value: `${brand.location} Areas covered: ${brand.coverageAreas.join(', ')}.` },
                { icon: 'bell', label: 'Notification support', value: `${brand.notifications.channels.join(' • ')} • ${brand.notifications.responseTime}` },
                { icon: 'clock', label: 'Opening hours', value: brand.hours.join(' | ') },
              ].map((item) => (
                <div key={item.label} className="card-panel flex items-start gap-4 rounded-[2rem] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-slate-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Directions</p>
                    <p className="mt-1 text-slate-700">Open the pinned shop location in Google Maps for easier navigation.</p>
                  </div>
                  <a href={brand.mapLink} target="_blank" rel="noreferrer" className="btn-primary gap-2">
                    <Icon name="map" className="h-4 w-4" />
                    Open Google Maps
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                    <Icon name="facebook" className="h-4 w-4" />
                    Visit Facebook Page
                  </a>
                  <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                    <Icon name="mail" className="h-4 w-4" />
                    Chat on Messenger
                  </a>
                </div>
                <p className="text-xs text-slate-500">{brand.socialLinks.note}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <form onSubmit={handleSubmit} className="card-panel rounded-[2rem] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">Full name</label>
                  <input id="name" name="name" className="input-field" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" className="input-field" value={form.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" className="input-field" value={form.subject} onChange={handleChange} required />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" className="input-field" value={form.message} onChange={handleChange} required />
              </div>

              {status.message ? (
                <div className={`mt-5 rounded-2xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {status.message}
                </div>
              ) : null}

              <button type="submit" className="btn-primary mt-6 w-full gap-2" disabled={submitting}>
                <Icon name="mail" className="h-4 w-4" />
                {submitting ? 'Sending message...' : 'Send Message'}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

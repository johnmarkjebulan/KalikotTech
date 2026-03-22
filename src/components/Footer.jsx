import { Link } from 'react-router-dom';
import { brand } from '../data/siteData';
import Icon from './Icon';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
              <Icon name="smartphone" className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-950">{brand.name}</p>
              <p className="text-sm text-slate-500">Modern cellphone repair website experience</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-slate-600">{brand.tagline}</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p className="flex items-start gap-3"><Icon name="phone" className="mt-1 h-4 w-4 text-cyan-600" /> {brand.phone}</p>
            <p className="flex items-start gap-3"><Icon name="mail" className="mt-1 h-4 w-4 text-cyan-600" /> {brand.email}</p>
            <p className="flex items-start gap-3"><Icon name="map" className="mt-1 h-4 w-4 text-cyan-600" /> {brand.address}</p>
            <p className="flex items-start gap-3"><Icon name="package" className="mt-1 h-4 w-4 text-cyan-600" /> {brand.location}</p>
            <p className="flex items-start gap-3"><Icon name="bell" className="mt-1 h-4 w-4 text-cyan-600" /> {brand.notifications.channels.join(' • ')}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {brand.coverageAreas.map((area) => (
              <span key={area} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {area}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={brand.mapLink} target="_blank" rel="noreferrer" className="btn-secondary inline-flex gap-2">
              <Icon name="map" className="h-4 w-4" />
              View on Google Maps
            </a>
            <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary inline-flex gap-2">
              <Icon name="facebook" className="h-4 w-4" />
              Facebook
            </a>
            <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="btn-secondary inline-flex gap-2">
              <Icon name="mail" className="h-4 w-4" />
              Messenger
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">{brand.socialLinks.note}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <Link className="block transition hover:text-cyan-700" to="/services">Services</Link>
            <Link className="block transition hover:text-cyan-700" to="/book">Book Repair</Link>
            <Link className="block transition hover:text-cyan-700" to="/track">Track Ticket</Link>
            <Link className="block transition hover:text-cyan-700" to="/about">About</Link>
            <Link className="block transition hover:text-cyan-700" to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Business Hours</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            {brand.hours.map((hour) => (
              <p key={hour}>{hour}</p>
            ))}
            <Link to="/register" className="btn-primary mt-3 w-full">
              Start a Repair Request
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-shell flex flex-col gap-3 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Kalikot Tech. Built for modern repair businesses.</p>
          <p>Built with React, Tailwind, Express, MySQL, JWT, and Multer.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

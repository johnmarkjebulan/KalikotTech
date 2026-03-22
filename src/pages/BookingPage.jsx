import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { useAuth } from '../context/AuthContext';
import { brand, services } from '../data/siteData';

const initialForm = {
  serviceType: services[0]?.title || '',
  deviceBrand: '',
  deviceModel: '',
  issueTitle: '',
  issueDescription: '',
  urgency: 'standard',
  preferredDate: '',
  preferredTime: '',
  budget: '',
  pickupOption: 'store_pickup',
  contactNumber: '',
  pickupAddress: '',
  cityMunicipality: 'Balayan',
  landmark: '',
};

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
];

function BookingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);
  const requiresAddress = form.pickupOption === 'delivery' || form.pickupOption === 'messenger';

  useEffect(() => {
    if (user?.phone) {
      setForm((current) => ({ ...current, contactNumber: current.contactNumber || user.phone }));
    }
  }, [user]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files || []).slice(0, 3));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(null);

    if (!user) {
      navigate('/login');
      return;
    }

    if (requiresAddress && !form.pickupAddress.trim()) {
      setError('Pickup or delivery address is required for messenger or delivery requests.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      files.forEach((file) => payload.append('deviceImages', file));

      const { data } = await api.post('/repairs', payload);

      setSuccess(data.repair);
      setForm({ ...initialForm, contactNumber: user.phone || '' });
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit repair request.');
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
              tag="Book a repair"
              title="A conversion-focused booking form with image upload and structured device details"
              description="Customers can describe the issue, choose a service type, share urgency, upload photos, and submit everything in one clean form."
            />

            {!user ? (
              <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
                <h3 className="text-lg font-semibold text-slate-950">Login required for booking</h3>
                <p className="mt-2 text-sm text-slate-600">
                  The repair form uses your account so the ticket is saved to your dashboard. Sign in or create an account first.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link to="/login" className="btn-primary">Login</Link>
                  <Link to="/register" className="btn-secondary">Create Account</Link>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-[2rem] border border-cyan-200 bg-cyan-50 p-6 text-sm text-slate-700">
                Logged in as <span className="font-semibold">{user.full_name}</span> ({user.email})
              </div>
            )}

            <div className="mt-8 space-y-4">
              {[
                'Supports up to 3 issue photos through Multer upload',
                'Creates a repair ticket linked to the logged-in customer',
                'Stores service type, urgency, date, preferred time schedule, pickup choice, and customer location details',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                    <Icon name="check" className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Shop hours and available schedule</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {brand.hours.map((hour) => (
                  <p key={hour}>{hour}</p>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">Choose a preferred time slot for faster confirmation. Final repair start time may change depending on diagnosis and queue volume.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <form onSubmit={handleSubmit} className="card-panel rounded-[2rem] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-slate-700">Service type</label>
                  <select id="serviceType" name="serviceType" className="input-field" value={form.serviceType} onChange={handleChange}>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="urgency" className="mb-2 block text-sm font-medium text-slate-700">Urgency</label>
                  <select id="urgency" name="urgency" className="input-field" value={form.urgency} onChange={handleChange}>
                    <option value="standard">Standard</option>
                    <option value="priority">Priority</option>
                    <option value="rush">Rush / same day</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="deviceBrand" className="mb-2 block text-sm font-medium text-slate-700">Device brand</label>
                  <input id="deviceBrand" name="deviceBrand" className="input-field" value={form.deviceBrand} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="deviceModel" className="mb-2 block text-sm font-medium text-slate-700">Device model</label>
                  <input id="deviceModel" name="deviceModel" className="input-field" value={form.deviceModel} onChange={handleChange} required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="issueTitle" className="mb-2 block text-sm font-medium text-slate-700">Issue title</label>
                  <input id="issueTitle" name="issueTitle" className="input-field" value={form.issueTitle} onChange={handleChange} placeholder="Example: Cracked screen with touch issue" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="issueDescription" className="mb-2 block text-sm font-medium text-slate-700">Issue description</label>
                  <textarea id="issueDescription" name="issueDescription" rows="5" className="input-field" value={form.issueDescription} onChange={handleChange} placeholder="Describe what happened, current symptoms, and anything the technician should know." required />
                </div>
                <div>
                  <label htmlFor="preferredDate" className="mb-2 block text-sm font-medium text-slate-700">Preferred service date</label>
                  <input id="preferredDate" name="preferredDate" type="date" className="input-field" value={form.preferredDate} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="mb-2 block text-sm font-medium text-slate-700">Preferred time schedule</label>
                  <select id="preferredTime" name="preferredTime" className="input-field" value={form.preferredTime} onChange={handleChange}>
                    <option value="">Select preferred time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-700">Estimated budget</label>
                  <input id="budget" name="budget" className="input-field" value={form.budget} onChange={handleChange} placeholder="PHP 2,000 - PHP 4,000" />
                </div>
                <div>
                  <label htmlFor="pickupOption" className="mb-2 block text-sm font-medium text-slate-700">Release option</label>
                  <select id="pickupOption" name="pickupOption" className="input-field" value={form.pickupOption} onChange={handleChange}>
                    <option value="store_pickup">Store pickup</option>
                    <option value="delivery">Delivery</option>
                    <option value="messenger">Messenger service</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contactNumber" className="mb-2 block text-sm font-medium text-slate-700">Contact number</label>
                  <input id="contactNumber" name="contactNumber" className="input-field" value={form.contactNumber} onChange={handleChange} required />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="pickupAddress" className="mb-2 block text-sm font-medium text-slate-700">Pickup / delivery address</label>
                  <textarea
                    id="pickupAddress"
                    name="pickupAddress"
                    rows="3"
                    className="input-field"
                    value={form.pickupAddress}
                    onChange={handleChange}
                    placeholder={requiresAddress ? 'House number, street, purok, barangay' : 'Only required for delivery or messenger requests'}
                  />
                </div>
                <div>
                  <label htmlFor="cityMunicipality" className="mb-2 block text-sm font-medium text-slate-700">City / municipality</label>
                  <input id="cityMunicipality" name="cityMunicipality" className="input-field" value={form.cityMunicipality} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="landmark" className="mb-2 block text-sm font-medium text-slate-700">Landmark</label>
                  <input id="landmark" name="landmark" className="input-field" value={form.landmark} onChange={handleChange} placeholder="Nearby school, hall, or store" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="deviceImages" className="mb-2 block text-sm font-medium text-slate-700">Upload issue photos (up to 3)</label>
                  <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5">
                    <label htmlFor="deviceImages" className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center text-sm text-slate-500">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-cyan-700 shadow-sm">
                        <Icon name="upload" className="h-5 w-5" />
                      </div>
                      <span>Click to choose images from your device</span>
                      <span className="text-xs text-slate-400">Accepted formats: JPG, PNG, WEBP</span>
                    </label>
                    <input id="deviceImages" type="file" name="deviceImages" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
                    {files.length ? (
                      <div className="mt-4 space-y-2">
                        {files.map((file) => <p key={file.name} className="text-xs text-slate-500">{file.name}</p>)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {error ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
              {success ? (
                <div className="mt-5 rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
                  <p className="font-semibold">Repair request submitted successfully.</p>
                  <p className="mt-2">Your ticket number is <span className="font-bold">{success.ticket_number}</span>. Keep this for public tracking and Facebook support follow-up.</p>
                </div>
              ) : null}

              <button type="submit" className="btn-primary mt-6 w-full" disabled={submitting || !user}>
                {submitting ? 'Submitting request...' : 'Submit Repair Request'}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default BookingPage;

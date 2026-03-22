import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950">
      <div className="container-shell grid min-h-[calc(100vh-220px)] gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AnimatedSection>
          <span className="section-tag border-cyan-300/20 bg-cyan-400/10 text-cyan-200">Create account</span>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">Set up a customer account and make future repairs easier</h1>
          <p className="mt-5 max-w-xl text-slate-300">
            Registration unlocks your customer dashboard, repair history, streamlined booking, and easier follow-up whenever your device needs service again.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: 'user', title: 'Personal dashboard', text: 'View all your repair tickets and status updates in one place.' },
              { icon: 'upload', title: 'Upload issue photos', text: 'Send evidence images before the device arrives at the shop.' },
              { icon: 'chart', title: 'Track repair history', text: 'Keep a record of past devices, issues, and progress logs.' },
              { icon: 'shield', title: 'Secure access', text: 'Protected routes and JWT-based sessions for customer accounts.' },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white p-8 shadow-soft sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                <Icon name="user" className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Create your account</h2>
              <p className="mt-2 text-slate-500">Finish setup in less than a minute.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input id="full_name" name="full_name" className="input-field" value={form.full_name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
                <input id="phone" name="phone" className="input-field" value={form.phone} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} required minLength="8" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" className="input-field" value={form.confirmPassword} onChange={handleChange} required minLength="8" />
              </div>
            </div>

            {error ? <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

            <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-cyan-700">
                Login here
              </Link>
            </p>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default RegisterPage;

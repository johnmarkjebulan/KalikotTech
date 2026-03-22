import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(form);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950">
      <div className="container-shell grid min-h-[calc(100vh-220px)] gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AnimatedSection>
          <span className="section-tag border-cyan-300/20 bg-cyan-400/10 text-cyan-200">Secure login</span>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">Welcome back to your repair dashboard</h1>
          <p className="mt-5 max-w-xl text-slate-300">
            Customers can log in to view repair history and ticket details, while administrators can manage requests,
            services, and status updates from one place.
          </p>
          <div className="mt-8 space-y-4">
            {['JWT-secured session handling', 'Role-based routing for customer and admin areas', 'Responsive login design for mobile and desktop'].map((item) => (
              <div key={item} className="flex items-start gap-3 text-slate-200">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                  <Icon name="check" className="h-4 w-4" />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-white p-8 shadow-soft sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                <Icon name="lock" className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Sign in</h2>
              <p className="mt-2 text-slate-500">Access your repair account securely.</p>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} required />
            </div>

            {error ? <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

            <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Login to Dashboard'}
            </button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Need an account?{' '}
              <Link to="/register" className="font-semibold text-cyan-700">
                Create one here
              </Link>
            </p>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default LoginPage;

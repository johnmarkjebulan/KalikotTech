import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container-shell py-24">
      <div className="card-panel mx-auto max-w-2xl rounded-[2rem] p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">404</p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you requested does not exist or may have been moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/services" className="btn-secondary">View Services</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

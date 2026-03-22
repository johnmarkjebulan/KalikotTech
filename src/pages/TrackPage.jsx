import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import StatusPill from '../components/StatusPill';

function TrackPage() {
  const [searchParams] = useSearchParams();
  const [ticketNumber, setTicketNumber] = useState(searchParams.get('ticket') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const runTrack = async (currentTicket) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.get(`/repairs/track/${currentTicket.trim()}`);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Ticket not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ticket = searchParams.get('ticket');

    if (ticket) {
      setTicketNumber(ticket);
      runTrack(ticket);
    }
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ticketNumber.trim()) return;
    await runTrack(ticketNumber);
  };

  return (
    <div>
      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <SectionHeading
            tag="Track your repair"
            title="Public status tracking that reduces manual customer follow-up"
            description="Customers only need the ticket number to see the latest repair status, recent notes, and device summary."
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection delay={100} className="mx-auto mt-10 max-w-3xl">
          <form onSubmit={handleSubmit} className="card-panel rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label htmlFor="ticketNumber" className="mb-2 block text-sm font-medium text-slate-700">Ticket number</label>
                <input
                  id="ticketNumber"
                  className="input-field"
                  placeholder="Example: SFX-240611-AB12"
                  value={ticketNumber}
                  onChange={(event) => setTicketNumber(event.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary self-end" disabled={loading}>
                {loading ? 'Checking...' : 'Track Repair'}
              </button>
            </div>
            {error ? <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
          </form>
        </AnimatedSection>

        {result ? (
          <div className="mx-auto mt-8 max-w-5xl space-y-6">
            <AnimatedSection>
              <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Repair ticket</p>
                    <h2 className="mt-2 text-3xl font-bold">{result.request.ticket_number}</h2>
                    <p className="mt-2 text-slate-600">{result.request.device_brand} {result.request.device_model}</p>
                  </div>
                  <StatusPill status={result.request.status} />
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: 'Service', value: result.request.service_type },
                    { label: 'Issue', value: result.request.issue_title },
                    { label: 'Release option', value: result.request.pickup_option },
                    { label: 'Area', value: result.request.city_municipality || 'Not specified' },
                    { label: 'Preferred date', value: result.request.preferred_date || 'Not specified' },
                    { label: 'Estimate', value: result.request.estimate_amount ? `PHP ${result.request.estimate_amount}` : 'Pending assessment' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>

                {(result.request.pickup_address || result.request.landmark) ? (
                  <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Location details</p>
                    <p className="mt-3 text-slate-600"><span className="font-semibold text-slate-900">Address:</span> {result.request.pickup_address || 'Not provided'}</p>
                    <p className="mt-2 text-slate-600"><span className="font-semibold text-slate-900">Landmark:</span> {result.request.landmark || 'Not provided'}</p>
                  </div>
                ) : null}

                <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Problem details</p>
                  <p className="mt-3 text-slate-600">{result.request.issue_description}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name="refresh" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Latest status updates</h3>
                    <p className="text-sm text-slate-500">Visible timeline pulled from admin updates.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {result.logs.length ? result.logs.map((log) => (
                    <div key={log.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <StatusPill status={log.status} />
                        <p className="text-sm text-slate-500">{new Date(log.created_at).toLocaleString()}</p>
                      </div>
                      <p className="mt-3 text-slate-600">{log.note || 'No technician note added.'}</p>
                    </div>
                  )) : (
                    <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                      No status logs yet. The initial ticket has been recorded and will update once the admin changes the repair stage.
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {Array.isArray(result.request.image_paths) && result.request.image_paths.length ? (
              <AnimatedSection delay={160}>
                <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">Uploaded issue photos</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {result.request.image_paths.map((imagePath) => (
                      <div key={imagePath} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                        <img src={imagePath} alt="Uploaded issue" className="h-52 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default TrackPage;

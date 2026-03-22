import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import StatusPill from '../components/StatusPill';
import { brand } from '../data/siteData';

const notificationConfig = {
  awaiting_approval: {
    title: 'Estimate approval needed',
    description: 'Your technician already prepared the repair estimate and is waiting for your approval.',
  },
  ready_for_pickup: {
    title: 'Ready for pickup',
    description: 'Your device is finished and can now be picked up or prepared for delivery.',
  },
  completed: {
    title: 'Repair completed',
    description: 'Your repair is marked as completed. Keep your ticket number for any follow-up or warranty concern.',
  },
  diagnosing: {
    title: 'Device under diagnosis',
    description: 'Your device is currently being checked by the technician.',
  },
  repair_in_progress: {
    title: 'Repair in progress',
    description: 'The repair is ongoing and the technician is currently working on your device.',
  },
  quality_check: {
    title: 'Quality check underway',
    description: 'Your device is being tested before release.',
  },
  received: {
    title: 'Booking received',
    description: 'Your booking is already in the queue and waiting for shop intake or initial diagnosis.',
  },
};

function DashboardPage() {
  const { user } = useAuth();
  const [repairs, setRepairs] = useState([]);
  const [decisionNotes, setDecisionNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const loadRepairs = async () => {
    try {
      const { data } = await api.get('/repairs/my');
      setRepairs(data.repairs || []);
    } catch (error) {
      setRepairs([]);
      setNotice('Unable to load repair history right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepairs();
  }, []);

  const summary = useMemo(() => {
    const openStatuses = ['received', 'diagnosing', 'awaiting_approval', 'repair_in_progress', 'quality_check', 'ready_for_pickup'];
    return {
      total: repairs.length,
      active: repairs.filter((repair) => openStatuses.includes(repair.status)).length,
      approvalNeeded: repairs.filter((repair) => repair.status === 'awaiting_approval').length,
      completed: repairs.filter((repair) => repair.status === 'completed').length,
    };
  }, [repairs]);

  const notifications = useMemo(() => {
    return repairs
      .filter((repair) => notificationConfig[repair.status])
      .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
      .slice(0, 5)
      .map((repair) => ({
        ...notificationConfig[repair.status],
        id: repair.id,
        ticket_number: repair.ticket_number,
        status: repair.status,
        updated_at: repair.updated_at || repair.created_at,
      }));
  }, [repairs]);

  const handleDecision = async (repairId, action) => {
    setNotice('');

    try {
      const payload = { action, note: decisionNotes[repairId] || '' };
      const { data } = await api.post(`/repairs/${repairId}/approval`, payload);
      setNotice(data.message);
      await loadRepairs();
    } catch (error) {
      setNotice(error.response?.data?.message || 'Unable to process estimate decision.');
    }
  };

  return (
    <div>
      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="section-tag">Customer dashboard</span>
              <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Welcome back, {user?.full_name}</h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                This page gives customers a clean repair history view, quick ticket references, estimate approval, and easy access to new bookings.
              </p>
            </div>
            <Link to="/book" className="btn-primary gap-2">
              <Icon name="wrench" className="h-4 w-4" />
              Book Another Repair
            </Link>
          </div>
        </AnimatedSection>

        {notice ? (
          <div className={`mt-6 rounded-2xl px-4 py-3 text-sm ${notice.toLowerCase().includes('unable') || notice.toLowerCase().includes('invalid') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {notice}
          </div>
        ) : null}

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total tickets', value: summary.total },
            { label: 'Active repairs', value: summary.active },
            { label: 'Waiting for approval', value: summary.approvalNeeded },
            { label: 'Completed repairs', value: summary.completed },
          ].map((item, index) => (
            <AnimatedSection key={item.label} delay={index * 70}>
              <div className="card-panel rounded-[2rem] text-center">
                <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <AnimatedSection>
            <div className="card-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon name="bell" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Recent notifications</h2>
                  <p className="mt-1 text-sm text-slate-500">Status-based alerts that help customers respond faster.</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {notifications.length ? notifications.map((item) => (
                  <div key={`${item.id}-${item.status}`} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.ticket_number}</p>
                      </div>
                      <StatusPill status={item.status} />
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                    <p className="mt-3 text-xs text-slate-500">Updated {new Date(item.updated_at).toLocaleString()}</p>
                  </div>
                )) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-600">
                    Your dashboard notifications will appear here after you create a booking.
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Facebook support</p>
                <p className="mt-2 text-sm text-slate-600">Need a faster follow-up? Continue with chat support and send your ticket number directly to the page.</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                    <Icon name="facebook" className="h-4 w-4" />
                    Visit Facebook Page
                  </a>
                  <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                    <Icon name="mail" className="h-4 w-4" />
                    Chat on Messenger
                  </a>
                </div>
                <p className="mt-3 text-xs text-slate-500">{brand.socialLinks.note}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">My repair requests</h2>
                  <p className="mt-1 text-sm text-slate-500">Linked directly to the authenticated customer account.</p>
                </div>
              </div>

              {loading ? (
                <p className="mt-6 text-slate-500">Loading repair history...</p>
              ) : repairs.length ? (
                <div className="mt-6 space-y-4">
                  {repairs.map((repair) => (
                    <div key={repair.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold">{repair.ticket_number}</h3>
                            <StatusPill status={repair.status} />
                          </div>
                          <p className="mt-3 text-slate-700">{repair.device_brand} {repair.device_model}</p>
                          <p className="mt-1 text-sm text-slate-600">{repair.issue_title}</p>
                        </div>
                        <div className="grid gap-2 text-sm text-slate-500 sm:grid-cols-2 lg:text-right">
                          <p><span className="font-medium text-slate-700">Service:</span> {repair.service_type}</p>
                          <p><span className="font-medium text-slate-700">Priority:</span> {repair.urgency}</p>
                          <p><span className="font-medium text-slate-700">Release:</span> {repair.pickup_option}</p>
                          <p><span className="font-medium text-slate-700">Budget:</span> {repair.budget || 'Not provided'}</p>
                          <p><span className="font-medium text-slate-700">Time slot:</span> {repair.preferred_time || 'Flexible'}</p>
                          <p><span className="font-medium text-slate-700">Area:</span> {repair.city_municipality || 'Not provided'}</p>
                          <p><span className="font-medium text-slate-700">Estimate:</span> {repair.estimate_amount ? `PHP ${repair.estimate_amount}` : 'Pending assessment'}</p>
                        </div>
                      </div>

                      {(repair.pickup_address || repair.landmark) ? (
                        <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                          <p><span className="font-semibold text-slate-900">Pickup / delivery address:</span> {repair.pickup_address || 'Not provided'}</p>
                          <p className="mt-2"><span className="font-semibold text-slate-900">Landmark:</span> {repair.landmark || 'Not provided'}</p>
                        </div>
                      ) : null}

                      {repair.status === 'awaiting_approval' ? (
                        <div className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4">
                          <p className="text-sm font-semibold text-amber-900">Estimate approval needed</p>
                          <p className="mt-2 text-sm text-amber-800">
                            The technician has prepared an estimate of <span className="font-semibold">PHP {repair.estimate_amount || '0.00'}</span>. Approve to continue the repair or ask for a revision.
                          </p>
                          <textarea
                            rows="3"
                            className="input-field mt-4"
                            placeholder="Optional note for the technician"
                            value={decisionNotes[repair.id] || ''}
                            onChange={(event) => setDecisionNotes((current) => ({ ...current, [repair.id]: event.target.value }))}
                          />
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button type="button" className="btn-primary" onClick={() => handleDecision(repair.id, 'approve')}>
                              Approve Estimate
                            </button>
                            <button type="button" className="btn-secondary" onClick={() => handleDecision(repair.id, 'reject')}>
                              Request Revision
                            </button>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to={`/track?ticket=${repair.ticket_number}`} className="btn-secondary">Track by Ticket</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-semibold text-slate-950">No repair requests yet</p>
                  <p className="mt-2 text-sm text-slate-600">Use the booking page to create your first ticket.</p>
                  <Link to="/book" className="btn-primary mt-6 inline-flex">Book your first repair</Link>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

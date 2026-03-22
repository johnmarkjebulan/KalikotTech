import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import AnimatedSection from '../components/AnimatedSection';
import Icon from '../components/Icon';
import StatusPill from '../components/StatusPill';
import { brand } from '../data/siteData';

const initialServiceForm = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  priceRange: '',
  turnaroundTime: '',
  icon: 'wrench',
  featured: false,
};

function formatDateLabel(value) {
  return new Date(value).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatShortDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function formatTimeSlot(value) {
  return value || 'Flexible';
}

function ProgressBar({ label, value, total }) {
  const width = total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}


function InsightCard({ title, subtitle, items, accent = 'cyan' }) {
  const tone = {
    cyan: 'bg-cyan-50 text-cyan-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <div className="card-panel rounded-[2rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className={`rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${tone[accent] || tone.cyan}`}>
          {title.split(' ')[0]}
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {items.length ? items.map((item) => (
          <div key={item.label} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <span className="text-sm font-semibold text-cyan-700">{item.value}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        )) : <p className="text-sm text-slate-500">No analytics insights yet.</p>}
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [topServices, setTopServices] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [updateState, setUpdateState] = useState({});
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({ statusBreakdown: [], pickupBreakdown: [], dailyBookings: [] });

  const loadData = async () => {
    try {
      const [statsResponse, repairsResponse, servicesResponse] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/repairs/admin/all'),
        api.get('/services/all'),
      ]);

      setStats(statsResponse.data.stats);
      setTopServices(statsResponse.data.topServices || []);
      setAnalytics({
        statusBreakdown: statsResponse.data.statusBreakdown || [],
        pickupBreakdown: statsResponse.data.pickupBreakdown || [],
        dailyBookings: statsResponse.data.dailyBookings || [],
      });
      setRepairs(repairsResponse.data.repairs || []);
      setServices(servicesResponse.data.services || []);
      setUpdateState(
        Object.fromEntries(
          (repairsResponse.data.repairs || []).map((repair) => [repair.id, {
            status: repair.status,
            note: '',
            estimateAmount: repair.estimate_amount || '',
          }]),
        ),
      );
    } catch (error) {
      setNotice('Unable to load admin data. Please confirm the backend and database are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRepairs = useMemo(() => {
    return repairs.filter((repair) => {
      const matchesStatus = filters.status === 'all' ? true : repair.status === filters.status;
      const query = filters.search.trim().toLowerCase();
      const matchesSearch = !query || [
        repair.ticket_number,
        repair.customer_name,
        repair.device_brand,
        repair.device_model,
        repair.issue_title,
        repair.service_type,
        repair.preferred_time,
      ].some((value) => String(value || '').toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [repairs, filters]);

  const appointmentGroups = useMemo(() => {
    const grouped = filteredRepairs.reduce((accumulator, repair) => {
      const rawDate = repair.preferred_date || repair.created_at;
      const key = new Date(rawDate).toISOString().slice(0, 10);
      if (!accumulator[key]) accumulator[key] = [];
      accumulator[key].push(repair);
      return accumulator;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, items]) => ({
        date,
        label: formatDateLabel(date),
        items: items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
      }));
  }, [filteredRepairs]);

  const adminNotifications = useMemo(() => {
    return repairs
      .filter((repair) => ['awaiting_approval', 'ready_for_pickup', 'completed'].includes(repair.status))
      .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
      .slice(0, 6);
  }, [repairs]);

  const statusTotal = useMemo(
    () => analytics.statusBreakdown.reduce((sum, item) => sum + Number(item.total || 0), 0),
    [analytics.statusBreakdown],
  );
  const pickupTotal = useMemo(
    () => analytics.pickupBreakdown.reduce((sum, item) => sum + Number(item.total || 0), 0),
    [analytics.pickupBreakdown],
  );
  const peakDay = useMemo(() => {
    const sorted = [...analytics.dailyBookings].sort((a, b) => Number(b.total || 0) - Number(a.total || 0));
    return sorted[0] || null;
  }, [analytics.dailyBookings]);

  const descriptiveInsights = useMemo(() => {
    const totalRepairs = Number(stats?.totalRepairs ?? repairs.length ?? 0);
    const completed = Number(stats?.completedRepairs ?? 0);
    const completionRate = totalRepairs ? `${Math.round((completed / totalRepairs) * 100)}%` : '0%';
    const topService = topServices[0];
    const deliveryShare = totalRepairs ? `${Math.round((Number(stats?.deliveryRequests ?? 0) / totalRepairs) * 100)}%` : '0%';

    return [
      {
        label: 'Current workload',
        value: `${totalRepairs} tickets`,
        detail: `${stats?.pendingRepairs ?? 0} pending, ${stats?.activeRepairs ?? 0} active, and ${stats?.readyForPickup ?? 0} ready for pickup right now.`,
      },
      {
        label: 'Completion snapshot',
        value: completionRate,
        detail: `${completed} completed repairs out of ${totalRepairs || 0} total tickets currently logged in the system.`,
      },
      {
        label: 'Most requested service',
        value: topService ? `${topService.service_type} (${topService.total})` : 'No data yet',
        detail: topService ? 'This is the strongest current demand category based on recent repair requests.' : 'Once tickets come in, this card will highlight the busiest service category.',
      },
      {
        label: 'Release preference',
        value: deliveryShare,
        detail: `${stats?.deliveryRequests ?? 0} delivery or messenger requests compared with ${totalRepairs - Number(stats?.deliveryRequests ?? 0)} store pickup requests.`,
      },
    ];
  }, [repairs.length, stats, topServices]);

  const predictiveInsights = useMemo(() => {
    const dailyTotals = analytics.dailyBookings.map((item) => Number(item.total || 0));
    const averageBookings = dailyTotals.length ? (dailyTotals.reduce((sum, value) => sum + value, 0) / dailyTotals.length) : 0;
    const projectedNextWeek = Math.round(averageBookings * 7);

    const dayMap = repairs.reduce((accumulator, repair) => {
      const day = new Date(repair.preferred_date || repair.created_at).toLocaleDateString(undefined, { weekday: 'long' });
      accumulator[day] = (accumulator[day] || 0) + 1;
      return accumulator;
    }, {});
    const peakWeekday = Object.entries(dayMap).sort((a, b) => b[1] - a[1])[0];

    const timeMap = repairs.reduce((accumulator, repair) => {
      const slot = repair.preferred_time || 'Flexible';
      accumulator[slot] = (accumulator[slot] || 0) + 1;
      return accumulator;
    }, {});
    const peakTime = Object.entries(timeMap).sort((a, b) => b[1] - a[1])[0];

    const likelyTopService = topServices[0];
    const backlogRisk = Number(stats?.pendingRepairs ?? 0) + Number(stats?.activeRepairs ?? 0) > Math.max(8, Math.round(averageBookings * 2))
      ? 'High'
      : (Number(stats?.pendingRepairs ?? 0) > 0 ? 'Moderate' : 'Low');

    return [
      {
        label: 'Projected bookings next 7 days',
        value: `${projectedNextWeek || 0}`,
        detail: `Based on the recent ${analytics.dailyBookings.length || 0}-day average of ${averageBookings.toFixed(1)} booking(s) per day.`,
      },
      {
        label: 'Expected peak day',
        value: peakWeekday ? `${peakWeekday[0]}` : 'Insufficient data',
        detail: peakWeekday ? `${peakWeekday[1]} appointment(s) historically land on this day most often.` : 'More booking history is needed to identify the busiest weekday.',
      },
      {
        label: 'Likely busiest time slot',
        value: peakTime ? `${peakTime[0]}` : 'Flexible demand',
        detail: peakTime ? `${peakTime[1]} booking(s) currently cluster in this time window.` : 'Time-slot predictions improve once customers pick appointment times.',
      },
      {
        label: 'Backlog risk',
        value: backlogRisk,
        detail: likelyTopService ? `${likelyTopService.service_type} remains the top service demand to watch while queue pressure is ${backlogRisk.toLowerCase()}.` : 'Queue pressure estimate updates once there are more recorded repairs.',
      },
    ];
  }, [analytics.dailyBookings, repairs, stats, topServices]);

  const prescriptiveActions = useMemo(() => {
    const actions = [];
    const pendingRepairs = Number(stats?.pendingRepairs ?? 0);
    const activeRepairs = Number(stats?.activeRepairs ?? 0);
    const readyForPickup = Number(stats?.readyForPickup ?? 0);
    const deliveryRequests = Number(stats?.deliveryRequests ?? 0);
    const priorityRequests = Number(stats?.priorityRequests ?? 0);
    const topService = topServices[0];
    const predictiveBacklog = predictiveInsights.find((item) => item.label === 'Backlog risk')?.value || 'Low';

    if (pendingRepairs >= 4) {
      actions.push({
        label: 'Follow up pending approvals',
        value: `${pendingRepairs} tickets`,
        detail: 'Contact customers with pending diagnosis or approval so the queue does not stall before repair work starts.',
      });
    }

    if (activeRepairs >= 4 || predictiveBacklog === 'High') {
      actions.push({
        label: 'Add technician focus blocks',
        value: predictiveBacklog,
        detail: 'Reserve uninterrupted repair time for in-progress tickets to reduce queue pressure during expected busy periods.',
      });
    }

    if (topService) {
      actions.push({
        label: 'Prepare parts inventory',
        value: topService.service_type,
        detail: `Stock frequently used parts for ${topService.service_type} because it currently leads with ${topService.total} request(s).`,
      });
    }

    if (deliveryRequests >= 3) {
      actions.push({
        label: 'Plan release logistics',
        value: `${deliveryRequests} delivery requests`,
        detail: 'Bundle delivery and messenger bookings into clearer release batches to avoid missed handoff windows.',
      });
    }

    if (readyForPickup >= 2 || priorityRequests >= 2) {
      actions.push({
        label: 'Push proactive notifications',
        value: `${readyForPickup + priorityRequests} urgent touchpoints`,
        detail: 'Send pickup-ready and priority updates through call, text, or Messenger to shorten customer response time.',
      });
    }

    if (!actions.length) {
      actions.push({
        label: 'Maintain current schedule',
        value: 'Stable',
        detail: 'Demand looks manageable. Continue monitoring the dashboard for spikes in approvals, active repairs, and delivery requests.',
      });
    }

    return actions.slice(0, 5);
  }, [predictiveInsights, stats, topServices]);

  const handleServiceChange = (event) => {
    const { name, value, type, checked } = event.target;
    setServiceForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCreateService = async (event) => {
    event.preventDefault();
    setNotice('');

    try {
      await api.post('/services', serviceForm);
      setServiceForm(initialServiceForm);
      setNotice('Service created successfully.');
      await loadData();
    } catch (error) {
      setNotice(error.response?.data?.message || 'Unable to create service.');
    }
  };

  const handleUpdateChange = (repairId, field, value) => {
    setUpdateState((current) => ({
      ...current,
      [repairId]: {
        ...current[repairId],
        [field]: value,
      },
    }));
  };

  const handleStatusUpdate = async (repairId) => {
    setNotice('');
    try {
      await api.put(`/repairs/${repairId}/status`, updateState[repairId]);
      setNotice('Repair status updated successfully.');
      await loadData();
    } catch (error) {
      setNotice(error.response?.data?.message || 'Unable to update repair status.');
    }
  };

  const handleDeleteService = async (serviceId) => {
    setNotice('');
    try {
      await api.delete(`/services/${serviceId}`);
      setNotice('Service deleted successfully.');
      await loadData();
    } catch (error) {
      setNotice(error.response?.data?.message || 'Unable to delete service.');
    }
  };

  return (
    <div>
      <section className="container-shell py-16 sm:py-20">
        <AnimatedSection>
          <span className="section-tag">Admin dashboard</span>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Manage repair operations, services, schedules, ticket progress, and analytics</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            This area is protected by role-based auth and gives your repair business a practical control panel for day-to-day updates.
          </p>
        </AnimatedSection>

        {notice ? (
          <div className={`mt-6 rounded-2xl px-4 py-3 text-sm ${notice.toLowerCase().includes('unable') || notice.toLowerCase().includes('invalid') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {notice}
          </div>
        ) : null}

        <div className="mt-10 grid gap-4 md:grid-cols-4 xl:grid-cols-8">
          {[
            { label: 'Total tickets', value: stats?.totalRepairs ?? repairs.length },
            { label: 'Pending diagnosis', value: stats?.pendingRepairs ?? 0 },
            { label: 'In progress', value: stats?.activeRepairs ?? 0 },
            { label: 'Ready for pickup', value: stats?.readyForPickup ?? 0 },
            { label: 'Completed', value: stats?.completedRepairs ?? 0 },
            { label: 'Bookings today', value: stats?.bookingsToday ?? 0 },
            { label: 'Avg estimate', value: stats?.averageEstimate ? `PHP ${Number(stats.averageEstimate).toFixed(0)}` : 'N/A' },
            { label: 'Services', value: stats?.serviceCount ?? services.length },
          ].map((item, index) => (
            <AnimatedSection key={item.label} delay={index * 40}>
              <div className="card-panel rounded-[1.75rem] text-center">
                <p className="text-3xl font-bold text-slate-950">{loading ? '...' : item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <AnimatedSection>
            <InsightCard
              title="Descriptive analytics"
              subtitle="What is happening right now across tickets, services, and release preferences."
              items={descriptiveInsights}
              accent="cyan"
            />
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <InsightCard
              title="Predictive analytics"
              subtitle="What demand is most likely to look like based on the current booking pattern."
              items={predictiveInsights}
              accent="amber"
            />
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <InsightCard
              title="Prescriptive analytics"
              subtitle="What actions the shop should take next to reduce backlog and improve turnaround time."
              items={prescriptiveActions}
              accent="emerald"
            />
          </AnimatedSection>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <AnimatedSection>
            <div className="card-panel rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon name="chart" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Status analytics</h2>
                  <p className="text-sm text-slate-500">How tickets are distributed across the workflow.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {analytics.statusBreakdown.length ? analytics.statusBreakdown.map((item) => (
                  <ProgressBar key={item.status} label={item.status.replaceAll('_', ' ')} value={Number(item.total || 0)} total={statusTotal} />
                )) : <p className="text-sm text-slate-500">No status analytics yet.</p>}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <div className="card-panel rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon name="package" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Pickup analytics</h2>
                  <p className="text-sm text-slate-500">See how customers want to receive devices.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {analytics.pickupBreakdown.length ? analytics.pickupBreakdown.map((item) => (
                  <ProgressBar key={item.pickup_option} label={item.pickup_option.replaceAll('_', ' ')} value={Number(item.total || 0)} total={pickupTotal} />
                )) : <p className="text-sm text-slate-500">No pickup analytics yet.</p>}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <div className="card-panel rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Icon name="calendar" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">7-day booking trend</h2>
                  <p className="text-sm text-slate-500">Quick view of incoming repair demand.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {analytics.dailyBookings.length ? analytics.dailyBookings.map((item) => {
                  const peak = Math.max(...analytics.dailyBookings.map((entry) => Number(entry.total || 0)), 1);
                  const width = Math.round((Number(item.total || 0) / peak) * 100);
                  return (
                    <div key={item.booking_date}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">{formatShortDate(item.booking_date)}</span>
                        <span className="text-slate-500">{item.total}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                }) : <p className="text-sm text-slate-500">No booking trend data yet.</p>}
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Peak day:</span> {peakDay ? `${formatShortDate(peakDay.booking_date)} (${peakDay.total} bookings)` : 'Not enough data yet'}</p>
                <p className="mt-2"><span className="font-semibold text-slate-900">Priority demand:</span> {stats?.priorityRequests ?? 0}</p>
                <p className="mt-2"><span className="font-semibold text-slate-900">Delivery / messenger requests:</span> {stats?.deliveryRequests ?? 0}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <AnimatedSection>
            <div className="card-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Repair queue</h2>
                  <p className="text-sm text-slate-500">Search, filter, update status, notes, estimates, and time schedules from one page.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="input-field"
                    placeholder="Search ticket, customer, device..."
                    value={filters.search}
                    onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                  />
                  <select
                    className="input-field"
                    value={filters.status}
                    onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
                  >
                    <option value="all">All statuses</option>
                    <option value="received">Received</option>
                    <option value="diagnosing">Diagnosing</option>
                    <option value="awaiting_approval">Awaiting approval</option>
                    <option value="repair_in_progress">Repair in progress</option>
                    <option value="quality_check">Quality check</option>
                    <option value="ready_for_pickup">Ready for pickup</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {filteredRepairs.length ? filteredRepairs.map((repair) => (
                  <div key={repair.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">{repair.ticket_number}</h3>
                          <StatusPill status={repair.status} />
                        </div>
                        <p className="mt-2 text-slate-700">{repair.customer_name} - {repair.device_brand} {repair.device_model}</p>
                        <p className="mt-1 text-sm text-slate-500">{repair.issue_title}</p>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-500 xl:text-right">
                        <p><span className="font-medium text-slate-700">Service:</span> {repair.service_type}</p>
                        <p><span className="font-medium text-slate-700">Phone:</span> {repair.contact_number}</p>
                        <p><span className="font-medium text-slate-700">Release:</span> {repair.pickup_option}</p>
                        <p><span className="font-medium text-slate-700">Area:</span> {repair.city_municipality || 'Not provided'}</p>
                        <p><span className="font-medium text-slate-700">Appointment:</span> {repair.preferred_date ? formatDateLabel(repair.preferred_date) : 'Not set'}</p>
                        <p><span className="font-medium text-slate-700">Time slot:</span> {formatTimeSlot(repair.preferred_time)}</p>
                        <p><span className="font-medium text-slate-700">Estimate:</span> {repair.estimate_amount ? `PHP ${repair.estimate_amount}` : 'Pending'}</p>
                        <p><span className="font-medium text-slate-700">Submitted:</span> {new Date(repair.created_at).toLocaleString()}</p>
                      </div>
                    </div>

                    {(repair.pickup_address || repair.landmark) ? (
                      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                        <p><span className="font-semibold text-slate-900">Address:</span> {repair.pickup_address || 'Not provided'}</p>
                        <p className="mt-2"><span className="font-semibold text-slate-900">Landmark:</span> {repair.landmark || 'Not provided'}</p>
                      </div>
                    ) : null}

                    <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_220px_220px]">
                      <select
                        className="input-field"
                        value={updateState[repair.id]?.status || repair.status}
                        onChange={(event) => handleUpdateChange(repair.id, 'status', event.target.value)}
                      >
                        <option value="received">Received</option>
                        <option value="diagnosing">Diagnosing</option>
                        <option value="awaiting_approval">Awaiting approval</option>
                        <option value="repair_in_progress">Repair in progress</option>
                        <option value="quality_check">Quality check</option>
                        <option value="ready_for_pickup">Ready for pickup</option>
                        <option value="completed">Completed</option>
                      </select>
                      <input
                        className="input-field"
                        placeholder="Estimate amount"
                        value={updateState[repair.id]?.estimateAmount || ''}
                        onChange={(event) => handleUpdateChange(repair.id, 'estimateAmount', event.target.value)}
                      />
                      <button type="button" className="btn-primary" onClick={() => handleStatusUpdate(repair.id)}>
                        Save Update
                      </button>
                    </div>
                    <textarea
                      rows="3"
                      className="input-field mt-4"
                      placeholder="Technician note or notification message"
                      value={updateState[repair.id]?.note || ''}
                      onChange={(event) => handleUpdateChange(repair.id, 'note', event.target.value)}
                    />
                  </div>
                )) : <p className="text-sm text-slate-500">No repair requests found.</p>}
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={120}>
              <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name="bell" className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Recent notifications</h2>
                    <p className="mt-1 text-sm text-slate-500">High-priority ticket updates ready for quick action.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {adminNotifications.length ? adminNotifications.map((item) => (
                    <div key={`${item.id}-${item.status}`} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{item.customer_name}</p>
                          <p className="mt-1 text-sm text-slate-600">{item.ticket_number}</p>
                        </div>
                        <StatusPill status={item.status} />
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{item.issue_title}</p>
                      <p className="mt-3 text-xs text-slate-500">Updated {new Date(item.updated_at || item.created_at).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-sm text-slate-500">No notifications yet.</p>}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Facebook support</p>
                  <p className="mt-2 text-sm text-slate-600">Send follow-ups to customers through Facebook or Messenger when schedule or estimate changes.</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <a href={brand.socialLinks.facebookPage} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                      <Icon name="facebook" className="h-4 w-4" />
                      Visit Facebook Page
                    </a>
                    <a href={brand.socialLinks.messenger} target="_blank" rel="noreferrer" className="btn-secondary gap-2">
                      <Icon name="mail" className="h-4 w-4" />
                      Chat on Messenger
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={160}>
              <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon name="calendar" className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Appointment calendar</h2>
                    <p className="mt-1 text-sm text-slate-500">Grouped by preferred date and time schedule.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {appointmentGroups.length ? appointmentGroups.map((group) => (
                    <div key={group.date} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-950">{group.label}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{group.items.length} booking(s)</span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {group.items.map((repair) => (
                          <div key={repair.id} className="rounded-[1.25rem] border border-slate-200 bg-white p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium text-slate-900">{repair.ticket_number}</p>
                                <p className="text-sm text-slate-600">{repair.customer_name} - {repair.service_type}</p>
                              </div>
                              <StatusPill status={repair.status} />
                            </div>
                            <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                              <p><span className="font-semibold text-slate-700">Time:</span> {formatTimeSlot(repair.preferred_time)}</p>
                              <p><span className="font-semibold text-slate-700">Release:</span> {repair.pickup_option}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )) : <p className="text-sm text-slate-500">No appointment bookings yet.</p>}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <form onSubmit={handleCreateService} className="card-panel rounded-[2rem] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Create a service</h2>
                <p className="mt-2 text-sm text-slate-500">Quickly add a new repair category to the site.</p>
                <div className="mt-6 grid gap-4">
                  <input name="title" className="input-field" placeholder="Service title" value={serviceForm.title} onChange={handleServiceChange} required />
                  <input name="slug" className="input-field" placeholder="service-slug" value={serviceForm.slug} onChange={handleServiceChange} required />
                  <input name="shortDescription" className="input-field" placeholder="Short description" value={serviceForm.shortDescription} onChange={handleServiceChange} required />
                  <textarea name="fullDescription" rows="4" className="input-field" placeholder="Detailed description" value={serviceForm.fullDescription} onChange={handleServiceChange} required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="priceRange" className="input-field" placeholder="PHP 1,500 - PHP 4,000" value={serviceForm.priceRange} onChange={handleServiceChange} required />
                    <input name="turnaroundTime" className="input-field" placeholder="45 to 90 minutes" value={serviceForm.turnaroundTime} onChange={handleServiceChange} required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="icon" className="input-field" placeholder="battery, smartphone, wrench" value={serviceForm.icon} onChange={handleServiceChange} />
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="checkbox" name="featured" checked={serviceForm.featured} onChange={handleServiceChange} />
                      Mark as featured
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-6 w-full">Add Service</button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={240}>
              <div className="card-panel rounded-[2rem] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Service list</h2>
                <p className="mt-2 text-sm text-slate-500">Current services from the database.</p>
                <div className="mt-6 space-y-4">
                  {services.length ? services.map((service) => (
                    <div key={service.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-950">{service.title}</p>
                        <p className="text-sm text-slate-500">{service.price_range} - {service.turnaround_time}</p>
                      </div>
                      <button type="button" className="btn-secondary" onClick={() => handleDeleteService(service.id)}>
                        Delete
                      </button>
                    </div>
                  )) : <p className="text-sm text-slate-500">No services found.</p>}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;

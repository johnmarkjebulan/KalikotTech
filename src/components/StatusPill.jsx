const colorMap = {
  received: 'bg-slate-100 text-slate-700',
  diagnosing: 'bg-amber-100 text-amber-700',
  awaiting_approval: 'bg-violet-100 text-violet-700',
  repair_in_progress: 'bg-cyan-100 text-cyan-700',
  quality_check: 'bg-blue-100 text-blue-700',
  ready_for_pickup: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-green-100 text-green-700',
};

function formatStatus(status) {
  return status.replaceAll('_', ' ');
}

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${colorMap[status] || 'bg-slate-100 text-slate-700'}`}
    >
      {formatStatus(status)}
    </span>
  );
}

export default StatusPill;

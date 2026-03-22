const iconPaths = {
  arrow: (
    <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  clock: (
    <path d="M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  spark: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm7 14l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17zM5 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  smartphone: (
    <path d="M9 3h6a3 3 0 013 3v12a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3zm3 15h.01" strokeLinecap="round" strokeLinejoin="round" />
  ),
  battery: (
    <path d="M4 9h14v6H4V9zm14 2h2v2h-2v-2zm-11 0v2m3-2v2m3-2v2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  zap: (
    <path d="M13 2L5 14h5l-1 8 8-12h-5l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  camera: (
    <path d="M4 8h3l2-2h6l2 2h3v10H4V8zm8 2.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  droplet: (
    <path d="M12 2s6 6.6 6 11a6 6 0 11-12 0c0-4.4 6-11 6-11z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  wrench: (
    <path d="M14.7 5.3a4 4 0 01-5.4 5.4L4 16l4 4 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-1.7-1.7 2.3-2.3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  upload: (
    <path d="M12 16V6m0 0l-4 4m4-4l4 4M5 18h14" strokeLinecap="round" strokeLinejoin="round" />
  ),
  mail: (
    <path d="M4 6h16v12H4V6zm0 0l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  phone: (
    <path d="M7 4h3l2 5-2 1a14 14 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  map: (
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  user: (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0" strokeLinecap="round" strokeLinejoin="round" />
  ),
  settings: (
    <path d="M12 8.5A3.5 3.5 0 1012 15.5 3.5 3.5 0 0012 8.5zm7 3.5l2 1-2 1-.6 2.1-2.1.6-1 2-1-2-2.1-.6L10 14l-2-1 2-1 .6-2.1 2.1-.6 1-2 1 2 2.1.6L19 12z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  close: (
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  refresh: (
    <path d="M20 6v5h-5M4 18v-5h5m11-2a7 7 0 00-12-3M4 15a7 7 0 0012 3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chart: (
    <path d="M5 19V9m7 10V5m7 14v-7M3 19h18" strokeLinecap="round" strokeLinejoin="round" />
  ),
  package: (
    <path d="M4 8l8-4 8 4-8 4-8-4zm0 0v8l8 4 8-4V8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  search: (
    <path d="M11 18a7 7 0 100-14 7 7 0 000 14zm10 3l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  calendar: (
    <path d="M7 4v3m10-3v3M4 9h16M5 6h14a1 1 0 011 1v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lock: (
    <path d="M7 11V8a5 5 0 1110 0v3m-9 0h8a2 2 0 012 2v5H6v-5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  bell: (
    <path d="M15 17H9m10-1H5l2-2v-3a5 5 0 0110 0v3l2 2zM10 19a2 2 0 004 0" strokeLinecap="round" strokeLinejoin="round" />
  ),
  facebook: (
    <path d="M14 8h3V4h-3a5 5 0 00-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  const icon = iconPaths[name] || iconPaths.spark;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}

export default Icon;

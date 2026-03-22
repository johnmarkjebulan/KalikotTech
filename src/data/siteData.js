export const brand = {
  name: 'Kalikot Tech',
  tagline: 'Fast cellphone repair with transparent updates, estimate approval, and a premium digital experience.',
  phone: '0945 376 3952',
  email: 'johnmarkangelojebulan@gmail.com',
  address: 'Barangay Hall of Brgy. Baclaran, WQHG+X4G, Balayan, Batangas',
  location: 'Pinned shop location: Barangay Hall of Brgy. Baclaran, WQHG+X4G, Balayan, Batangas. Serving Balayan, Batangas with shop pickup and messenger delivery options.',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Barangay%20Hall%20of%20Brgy.%20Baclaran%2C%20WQHG%2BX4G%2C%20Balayan%2C%20Batangas',
  coverageAreas: ['Balayan', 'Calaca', 'Lian', 'Nasugbu'],
  timezone: 'Asia/Manila',
  scheduleLabel: 'Mon-Sat 9:00 AM - 8:00 PM | Sun 10:00 AM - 6:00 PM',
  socialLinks: {
    facebookPage: 'https://www.facebook.com/profile.php?id=61586479191536',
    messenger: 'https://www.facebook.com/profile.php?id=61586479191536',
    facebookLabel: 'Facebook Page',
    messengerLabel: 'Chat on Messenger',
    note: 'Facebook and Messenger buttons currently point to the Kalikot Tech Facebook profile link provided by the owner.',
  },
  notifications: {
    enabled: true,
    channels: ['Website dashboard alerts', 'Facebook Messenger follow-up'],
    responseTime: 'Usually within business hours',
  },
  hours: [
    'Monday - Saturday: 9:00 AM - 8:00 PM',
    'Sunday: 10:00 AM - 6:00 PM',
  ],
};

export const heroHighlights = [
  'Same-day repair options for common issues',
  'Estimate approval before major repairs begin',
  'Live status tracking from intake to release',
  'Serving Brgy. Baclaran, Balayan, Batangas and nearby areas',
];

export const stats = [
  { value: '376', label: 'Phones repaired' },
  { value: '4.9/5', label: 'Average customer rating' },
  { value: '20 mins', label: 'Fastest screen replacement' },
  { value: '3 days', label: 'Service warranty coverage' },
];

export const services = [
  {
    title: 'Screen Replacement',
    slug: 'screen-replacement',
    shortDescription: 'Fix cracked glass, dead pixels, ghost touch, and OLED panel damage.',
    fullDescription:
      'Precision screen replacement for broken displays, unresponsive touch panels, black spots, flickering screens, and frame alignment issues.',
    priceRange: 'PHP 450 - PHP 550',
    turnaroundTime: '20 to 25 minutes',
    icon: 'smartphone',
    featured: true,
  },
  {
    title: 'Battery Replacement',
    slug: 'battery-replacement',
    shortDescription: 'Restore battery life, fix overheating, and stop random shutdowns.',
    fullDescription:
      'Battery diagnostics and replacement for swollen cells, weak battery health, overheating, or devices that no longer hold charge properly.',
    priceRange: 'PHP 350 - PHP 500',
    turnaroundTime: '25 to 30 minutes',
    icon: 'battery',
    featured: true,
  },
  {
    title: 'Back Glass and Housing Repair',
    slug: 'back-glass-repair',
    shortDescription: 'Refresh damaged rear panels, frames, and cosmetic body issues.',
    fullDescription:
      'Back glass and housing restoration for cracked rear panels, bent frames, scratched enclosures, and damaged side buttons.',
    priceRange: 'PHP 500 - PHP 700',
    turnaroundTime: '30 to 50 minutes',
    icon: 'spark',
    featured: false,
  },
  {
    title: 'Camera and Lens Repair',
    slug: 'camera-repair',
    shortDescription: 'Fix blurry photos, focus problems, broken lenses, and camera errors.',
    fullDescription:
      'Front and rear camera repair for cracked camera lenses, shaky image stabilization, focus failure, or black screen camera modules.',
    priceRange: 'PHP 800 - PHP 1,200',
    turnaroundTime: '40 minutes to 1 hour',
    icon: 'camera',
    featured: false,
  },
];

export const processSteps = [
  {
    title: 'Book your repair',
    description: 'Choose a service, describe the problem, and upload device photos through the booking page.',
    icon: 'calendar',
  },
  {
    title: 'Receive diagnosis',
    description: 'Our technician reviews the device, confirms the issue, and shares the repair estimate and timeline.',
    icon: 'search',
  },
  {
    title: 'Approve the estimate',
    description: 'Customers can review the quoted amount and approve the repair before the work proceeds.',
    icon: 'check',
  },
  {
    title: 'Pickup or delivery',
    description: 'Collect your device in store or arrange messenger delivery once the repair is completed.',
    icon: 'package',
  },
];

export const reasons = [
  {
    title: 'Transparent repair process',
    description: 'Every booking receives a ticket number, repair timeline, and visible status updates.',
    icon: 'chart',
  },
  {
    title: 'Skilled technicians',
    description: 'Repairs are handled by experienced mobile specialists trained in common Apple and Android issues.',
    icon: 'shield',
  },
  {
    title: 'Quality-tested parts',
    description: 'Replacement components go through functionality and visual checks before release.',
    icon: 'check',
  },
  {
    title: 'Convenient support',
    description: 'Customers can book online, upload evidence photos, and track approval-ready estimates without phone tag.',
    icon: 'mail',
  },
];

export const testimonials = [
  {
    name: 'Jean Camille C.',
    role: 'College Student',
    quote:
      'My screen was replaced the same afternoon and I loved the status updates. The website made the entire process feel organized and premium.',
  },
  {
    name: 'Mat Jannus D.',
    role: 'College Student',
    quote:
      'The booking form was clear, the pricing was honest, and the dashboard helped me track every step without needing to follow up manually.',
  },
  {
    name: 'JLoy D.',
    role: 'College Student',
    quote:
      'I uploaded photos of my damaged phone, booked online, and picked it up after class. Smooth experience from start to finish.',
  },
];

export const faqs = [
  {
    question: 'Do customers need an account before booking?',
    answer:
      'Yes. The booking flow uses customer accounts so each repair request is linked to a dashboard history and ticket tracking record.',
  },
  {
    question: 'Can the website track repairs without calling the shop?',
    answer:
      'Yes. Customers can use the public track page with a ticket number, while logged-in users can also monitor all of their repair requests from the dashboard.',
  },
  {
    question: 'How are repair photos uploaded?',
    answer:
      'The booking form supports photo uploads through Multer on the backend. Uploaded images are saved locally in the backend uploads folder.',
  },
  {
    question: 'Can customers approve estimates online?',
    answer:
      'Yes. When the admin changes the repair status to awaiting approval, the customer can approve the quote or ask for a revised estimate from their dashboard.',
  },
  {
    question: 'Is the design mobile responsive?',
    answer:
      'Yes. Every page layout was planned for phones, tablets, laptops, and larger desktop screens using Tailwind responsive utilities.',
  },
];

export const perks = [
  'Free diagnostics for common hardware issues',
  'Estimate approval before major repair work starts',
  'Messenger pickup and delivery support around Balayan, Calaca, Lian, and Nasugbu',
  'Final quality check before release',
];

export const site = {
  name: "Varun Gaur",
  title: "Varun Gaur | AI Video Producer and Creative Technologist",
  description:
    "Varun Gaur is an AI video producer and creative technologist in New Delhi, making cinematic AI films, commercials and editorial visuals, and building the automation systems behind them.",
  url: "https://varungaur.netlify.app",
  email: "vgaur2003@gmail.com",
  whatsapp: "https://wa.me/919899380254",
  linkedin: "https://www.linkedin.com/in/varungaur777",
  resume: "/resume.pdf",
  showreel: "/videos/showreel.mp4",
  showreelPoster: "/images/posters/showreel.jpg",
};

export const tools = [
  "Seedance 2.5",
  "Kling",
  "Runway",
  "Midjourney",
  "Nano Banana",
  "ElevenLabs",
  "n8n",
  "Shopify",
];

export interface EditorialItem {
  title: string;
  purpose: string;
  format: "Explainer" | "Static" | "Poster";
  src: string;
  /** Explainers are videos; they also get a poster frame. */
  video?: string;
  poster?: string;
}

/** Published work for ISN Report. Files live in /public/images/editorial. */
export const editorial: EditorialItem[] = [
  {
    title: "The New Ladakh Model",
    purpose: "A short explainer film unpacking the New Ladakh Model for ISN Report's audience.",
    format: "Explainer",
    src: "/videos/new-ladakh-model.mp4",
    video: "/videos/previews/new-ladakh-model.mp4",
    poster: "/images/posters/new-ladakh-model.jpg",
  },
  {
    title: "Forged. Not Imported.",
    purpose: "Makes a 4× rise in defence production readable in one glance.",
    format: "Poster",
    src: "/images/editorial/forged-not-imported.jpg",
  },
  {
    title: "Kaveri Engine: Phase Shift",
    purpose: "Compares two engine generations and their thrust figures side by side.",
    format: "Static",
    src: "/images/editorial/kaveri-engine-phase-shift.jpg",
  },
  {
    title: "Energy Is the New Battlespace",
    purpose: "Maps Russian crude flows into India as a strategic, not commercial, story.",
    format: "Static",
    src: "/images/editorial/energy-battlespace.jpg",
  },
  {
    title: "NAETC Aero Engine Hub",
    purpose: "Introduces India's indigenous aero-engine testing facility.",
    format: "Poster",
    src: "/images/editorial/naetc-aero-engine-hub.jpg",
  },
  {
    title: "India's Biggest Defence Push",
    purpose: "Breaks a record procurement approval into the systems it buys.",
    format: "Static",
    src: "/images/editorial/indias-biggest-defence-push.jpg",
  },
  {
    title: "Galathea Bay Megaport",
    purpose: "Explains why a Great Nicobar transhipment port matters for trade routes.",
    format: "Static",
    src: "/images/editorial/galathea-bay-port.jpg",
  },
  {
    title: "India Activates Breeder Reactor",
    purpose: "Turns a reactor milestone into a readable status panel.",
    format: "Poster",
    src: "/images/editorial/breeder-reactor.jpg",
  },
  {
    title: "HAL G3INS Test Facility",
    purpose: "Spec sheet for an indigenous inertial navigation system.",
    format: "Static",
    src: "/images/editorial/hal-g3ins-avionics.jpg",
  },
  {
    title: "NASA's Nuclear Propulsion Shift",
    purpose: "Clean diagram of how nuclear electric propulsion works.",
    format: "Static",
    src: "/images/editorial/nasa-nuclear-propulsion-shift.jpg",
  },
  {
    title: "NASA's Nuclear Leap to Mars",
    purpose: "The same story as a cinematic poster for a different feed.",
    format: "Poster",
    src: "/images/editorial/nasa-nuclear-leap-to-mars.jpg",
  },
  {
    title: "Indian Railways, West Bengal",
    purpose: "Static ad announcing a fast-track push for 61 delayed rail projects.",
    format: "Static",
    src: "/images/editorial/indian-railways-west-bengal.jpg",
  },
];

/** Six one-sheets. Files live in /public/images/key-art (portrait, 27:40, e.g. 1080×1600). */
export const keyArt = [
  { title: "Rust Tide", src: "/images/key-art/rust-tide.jpg" },
  { title: "Vimana", src: "/images/key-art/vimana.jpg" },
  { title: "Sea Titan", src: "/images/key-art/sea-titan.jpg" },
  { title: "Kaal Bhairav", src: "/images/key-art/kaal-bhairav.jpg" },
  { title: "The Order", src: "/images/key-art/the-order.jpg" },
  { title: "Kadak Chai", src: "/images/key-art/kadak-chai.jpg" },
];

export const automation = {
  stats: [
    { value: "15", label: "Shopify stores automated" },
    { value: "Live", label: "RTO and NDR tracking" },
  ],
  systems: [
    {
      title: "Order confirmation",
      body: "n8n automation confirming orders across 15 Shopify stores, running on a self-hosted server.",
      status: "Live",
      src: "/images/automation/order-confirmation.jpg",
    },
    {
      title: "RTO and NDR tracker",
      body: "Live tracking of returns and failed deliveries through the Shiprocket API, so no parcel goes unclaimed.",
      status: "Live",
      src: "/images/automation/rto-ndr-tracker.jpg",
    },
    {
      title: "Master dashboard",
      body: "One place for an AI product-page builder, an AI creative pipeline and one-tap Meta ads.",
      status: "In progress",
      src: "/images/automation/master-dashboard.jpg",
    },
  ],
};

export const experience = [
  { role: "AI Video Creator and Automation Builder", company: "AK Traders", dates: "Jun 2026 – Present" },
  { role: "AI Content Creator and Visual Designer", company: "Freelance", dates: "Nov 2025 – Present" },
  { role: "AI Graphics and Research Analyst", company: "ISN Report", dates: "Nov 2025 – 4 Aug 2026" },
  { role: "AI Graphic Designer", company: "RK Divine Creation", dates: "May 2025 – Jan 2026" },
];

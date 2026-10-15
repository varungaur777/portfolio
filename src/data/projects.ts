/**
 * ONE data file for every film and commercial.
 *
 * Asset convention (put files in /public with exactly these names):
 *   /videos/<slug>.mp4            full film (plays with sound in the player)
 *   /videos/previews/<slug>.mp4   4–8s muted loop, ~960px, no audio (hover + hero)
 *   /images/posters/<slug>.jpg    poster frame, 1280px on the long side
 *   /images/process/<slug>-*.jpg  process gallery images (see `gallery` below)
 *
 * Any text that starts with "[FILL IN" is rendered on the site as a clearly
 * marked placeholder. Replace it with your own words.
 */

export type Aspect = "landscape" | "portrait";

export interface GalleryItem {
  src: string;
  caption: string;
  kind: "Style frame" | "Reference sheet" | "Before / after";
}

export interface PromptNote {
  /** The tool the prompt was written for. Paste the prompt exactly as written in that tool. */
  tool: string;
  prompt: string;
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Optional second word, shown in italic orange (e.g. "Rust" + "Tide"). */
  titleItalic?: string;
  kind: "Short film" | "Commercial";
  runtime: string; // MM:SS
  aspect: Aspect;
  logline: string;
  madeWith: string;
  tools: string[];
  /** Optional link to the full-quality file (Drive, Vimeo, YouTube). */
  externalLink?: string;
  brief: string;
  role: string;
  challenge: string;
  process: string;
  gallery: GalleryItem[];
  prompts: PromptNote[];
  result: string;
}

const fill = (what: string) => `[FILL IN: ${what}]`;

const galleryFor = (slug: string): GalleryItem[] => [
  { src: `/images/process/${slug}-style-frame.jpg`, caption: "Style frame", kind: "Style frame" },
  { src: `/images/process/${slug}-reference-sheet.jpg`, caption: "Character / world reference sheet", kind: "Reference sheet" },
  { src: `/images/process/${slug}-before-after.jpg`, caption: "Raw generation vs final grade", kind: "Before / after" },
];

export const video = (slug: string) => `/videos/${slug}.mp4`;
export const preview = (slug: string) => `/videos/previews/${slug}.mp4`;
export const poster = (slug: string) => `/images/posters/${slug}.jpg`;

/** Featured film, shown in NOW SHOWING. */
export const FEATURED_SLUG = "rust-tide";

export const projects: Project[] = [
  {
    slug: "rust-tide",
    title: "Rust",
    titleItalic: "Tide",
    kind: "Short film",
    runtime: "02:30",
    aspect: "landscape",
    logline: "One last mission for a retired mecha pilot.",
    madeWith: "Seedance 2.5",
    tools: ["Seedance 2.5", fill("other tools, e.g. image model, voice, edit")],
    brief: fill("Why you made Rust Tide. Personal project or commissioned? What did it need to prove?"),
    role: fill("What you did: writing, direction, generation, edit, sound."),
    challenge: fill("The hardest problem. e.g. keeping the mecha and pilot consistent across 2.5 minutes."),
    process: fill("How you built it, step by step: script, style frames, shot list, generation, edit, grade, sound."),
    gallery: galleryFor("rust-tide"),
    prompts: [
      {
        tool: "Seedance 2.5",
        prompt: fill("paste one real shot prompt exactly as you wrote it in Seedance"),
      },
    ],
    result: fill("Where it was shown and how it landed: views, festival, client response, what you learned."),
  },
  {
    slug: "vimana",
    title: "Vimana",
    kind: "Short film",
    runtime: "00:40",
    aspect: "landscape",
    logline: fill("one-line logline for Vimana"),
    madeWith: fill("main video model"),
    tools: [fill("tools used on Vimana")],
    brief: fill("The idea behind Vimana."),
    role: fill("Your role on Vimana."),
    challenge: fill("The hardest problem on Vimana."),
    process: fill("How Vimana was made."),
    gallery: galleryFor("vimana"),
    prompts: [],
    result: fill("Outcome."),
  },
  {
    slug: "sea-titan",
    title: "Sea Titan",
    kind: "Short film",
    runtime: "01:00",
    aspect: "landscape",
    logline: "A storm, a drowning city, and two titans that will not stop.",
    madeWith: fill("main video model"),
    tools: [fill("confirm tools used on Sea Titan")],
    externalLink: "https://drive.google.com/file/d/1hmA-o8mDNyzsM_-8Ih-Q2HREmGqyNvKM/view?usp=sharing",
    brief: "A test of scale: could AI video hold a creature fight at city size, with water, fire and aircraft in the same frame?",
    role: fill("Your role, e.g. writer, director, generation, edit, sound."),
    challenge: "Selling size. Every shot needed scale cues (helicopters, searchlights, sea spray, collapsing towers) so the titans read as hundreds of metres tall.",
    process: fill("How you planned and generated the shots, and how you kept both creatures consistent."),
    gallery: galleryFor("sea-titan"),
    prompts: [],
    result: fill("Outcome."),
  },
  {
    slug: "kaal-bhairav",
    title: "Kaal Bhairav",
    kind: "Short film",
    runtime: "01:00",
    aspect: "portrait",
    logline: "A night journey through Kashi to meet its guardian.",
    madeWith: fill("main video model (frames show a Veo watermark, confirm)"),
    tools: [fill("confirm tools used on Kaal Bhairav")],
    externalLink: "https://drive.google.com/file/d/1DeslFGFF00MsmBrw0aKSaaVgDDN6jDsr/view?usp=drive_link",
    brief: "A vertical cultural film about Varanasi and Kaal Bhairav, the city's guardian deity, made to feel devotional rather than touristic.",
    role: fill("Your role."),
    challenge: "Portraying a deity with respect: real ghat textures, ritual detail and light, without drifting into fantasy cliché.",
    process: fill("How you researched and built it."),
    gallery: galleryFor("kaal-bhairav"),
    prompts: [],
    result: fill("Outcome."),
  },
  {
    slug: "kadak-chai",
    title: "Kadak Chai",
    kind: "Commercial",
    runtime: "00:30",
    aspect: "portrait",
    logline: fill("one-line logline for Kadak Chai"),
    madeWith: fill("main video model"),
    tools: [fill("tools used on Kadak Chai")],
    brief: fill("Client, product and goal."),
    role: fill("Your role."),
    challenge: fill("The hardest problem."),
    process: fill("How it was made."),
    gallery: galleryFor("kadak-chai"),
    prompts: [],
    result: fill("Outcome."),
  },
  {
    slug: "foam-wash",
    title: "Foam Wash",
    kind: "Commercial",
    runtime: "00:20",
    aspect: "portrait",
    logline: "A stained car seat, one can of foam, twenty seconds.",
    madeWith: fill("main video model"),
    tools: [fill("confirm tools used on Foam Wash")],
    externalLink: "https://drive.google.com/file/d/1e-uSggAd3hU91EiUcfyYZtKRWJIV-j1R/view?usp=drive_link",
    brief: "A vertical product ad for a car-interior foam cleaner: show the problem, the product and the result fast enough for a feed.",
    role: fill("Your role."),
    challenge: "Making foam behave. AI video tends to smear liquids, so the spray, the lather and the clean wipe all had to look physically right.",
    process: fill("How it was made."),
    gallery: galleryFor("foam-wash"),
    prompts: [],
    result: fill("Outcome, e.g. CTR or ROAS if it ran as an ad."),
  },
  {
    slug: "panda-tea",
    title: "Panda Tea",
    kind: "Commercial",
    runtime: "00:30",
    aspect: "portrait",
    logline: "A bubble-tea brand and a panda mascot that stays the same panda in every shot.",
    madeWith: fill("main video model"),
    tools: [fill("confirm tools used on Panda Tea")],
    brief: "A playful vertical spot for a bubble-tea shop, carried by a mascot character.",
    role: fill("Your role."),
    challenge: "Character consistency: the panda's face, cap and apron had to match from shot to shot.",
    process: fill("How you locked the mascot design and generated the shots."),
    gallery: galleryFor("panda-tea"),
    prompts: [],
    result: fill("Outcome."),
  },
  {
    slug: "the-order",
    title: "The Order",
    kind: "Short film",
    runtime: "01:00",
    aspect: "landscape",
    logline: "One seller, one long night, and the order that changes everything.",
    madeWith: fill("main video model (frames show a Veo watermark, confirm)"),
    tools: [fill("confirm tools used on The Order")],
    externalLink: "https://drive.google.com/file/d/1QdHfLfOM9P27specZkviMKcz7zdpgq8T/view?usp=sharing",
    brief: "A cinematic brand film about the life of an online seller: late nights, alerts, exhaustion, and the customer at the other end.",
    role: fill("Your role."),
    challenge: "Keeping one actor's face consistent across a full emotional arc, from night to sunrise.",
    process: fill("How it was made."),
    gallery: galleryFor("the-order"),
    prompts: [],
    result: fill("Outcome."),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Filmography order (numbered 01–07). The featured film sits above it. */
export const filmography = projects.filter((p) => p.slug !== FEATURED_SLUG);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const displayTitle = (p: Project) => (p.titleItalic ? `${p.title} ${p.titleItalic}` : p.title);

export const isTodo = (s: string) => s.startsWith("[FILL IN");

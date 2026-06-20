export interface ProjectDetails {
  role: string;
  tools: string[];
  duration: string;
  overview: string;
  promptBreakdown: { title: string; prompt: string; explanation: string }[];
  storyboard: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: 'commercial' | 'storytelling' | 'creative';
  description: string;
  videoSrc: string;
  fullVideoSrc: string;
  driveLink?: string;
  tags: string[];
  details: ProjectDetails;
  aspect: 'landscape' | 'portrait';
}

export const projects: Project[] = [
  {
    slug: 'titan-clash',
    title: 'TITANFALL — Sea Titan',
    subtitle: 'VFX & Sea Titan Scale',
    category: 'storytelling',
    description: 'An epic AI cinematic sequence focused on massive scale, fluid simulation, dynamic camera movements, and marine creature design. Re-imagining sci-fi titan scale using advanced generative AI pipelines.',
    videoSrc: 'videos/titan-clash-trailer.mp4',
    fullVideoSrc: 'videos/titan-clash.mp4',
    driveLink: 'https://drive.google.com/file/d/1hmA-o8mDNyzsM_-8Ih-Q2HREmGqyNvKM/view?usp=sharing',
    tags: ['Kling AI', 'VFX', 'Cinematic AI', '3D Scale'],
    aspect: 'landscape',
    details: {
      role: 'AI Visual Engineer & Creative Director',
      tools: ['Kling AI', 'Luma Dream Machine', 'CapCut', 'Topaz Video AI'],
      duration: '4 Weeks',
      overview: 'This project pushes the limits of modern AI video generators in handling extreme scales, complex water simulation, and camera motions. The goal was to establish a convincing narrative sequence showing a behemoth mech emerging from a stormy ocean.',
      promptBreakdown: [
        {
          title: 'Scene 1: The Gathering Storm',
          prompt: 'Wide establishing cinematic shot, a hyper-detailed massive robotic titan towering in the middle of a stormy dark blue ocean, colossal waves crashing against its metallic chassis, lightning cracking in the sky, volumetric lighting, epic scale, photorealistic --ar 16:9',
          explanation: 'Established atmospheric density, scale parameters, and lighting to ground the giant robot in the stormy ocean landscape.'
        },
        {
          title: 'Scene 2: Water Simulation',
          prompt: 'Macro close-up, water splashing and cascading down heavy rusted dark metal plating, fluid dynamics, camera slowly panning up, depth of field, high-fidelity texture details --ar 16:9',
          explanation: 'Captured realistic water textures on metal to convey weight and material interaction.'
        },
        {
          title: 'Scene 3: The Climax Reveal',
          prompt: 'Low angle tracking shot looking up at the glowing cyan eye of a giant sea titan robot, mist and sea spray, lens flare, slow camera shake, cinematic sound design cues visual --ar 16:9',
          explanation: 'Focused on details like lens aberrations, scale cues (mist/spray), and focal points to maximize visual drama.'
        }
      ],
      storyboard: [
        'images/indus.png',
        'images/nasa.png',
        'images/railways.png'
      ]
    }
  },
  {
    slug: 'new-ladakh-model',
    title: 'The New Ladakh Model',
    subtitle: 'HUD & Geopolitical Explainer',
    category: 'storytelling',
    description: 'Motion graphics, geospatial explainer systems, and interactive information dashboards designed for high-profile digital journalism covering regional geopolitics and military dynamics.',
    videoSrc: 'videos/ladakh.mp4',
    fullVideoSrc: 'videos/ladakh.mp4',
    tags: ['Explainer Video', 'Motion Design', 'Canva', 'HUD Map'],
    aspect: 'landscape',
    details: {
      role: 'Lead Motion Designer & Editor',
      tools: ['Canva', 'CapCut', 'After Effects', 'Mapbox'],
      duration: '2 Weeks',
      overview: 'Designed a highly informative visual explainer detailing the geographic, strategic, and geopolitical shifts in the Ladakh region. The focus was to present high-density map details, infrastructure overlays, and satellite analysis in an easy-to-digest documentary format.',
      promptBreakdown: [
        {
          title: 'Mapping HUDs',
          prompt: 'Dynamic 3D terrain map of Ladakh, glowing borderlines, satellite imagery overlays, tactical HUD details, clean minimal corporate infographic design, high-tech map UI',
          explanation: 'Created clean, highly visible map graphics suitable for editorial news presentation.'
        }
      ],
      storyboard: [
        'images/naetc.png',
        'images/poster1.png'
      ]
    }
  },
  {
    slug: 'the-order',
    title: 'The Order — Cinematic Brand Film',
    subtitle: 'Cinematic Brand Film',
    category: 'storytelling',
    description: 'A cinematic brand campaign detailing the path from local logistics to global reach. Demonstrates character consistency, dynamic styling, and cinematic brand narratives.',
    videoSrc: 'videos/the-order-trailer.mp4',
    fullVideoSrc: 'videos/the-order.mp4',
    driveLink: 'https://drive.google.com/file/d/1QdHfLfOM9P27specZkviMKcz7zdpgq8T/view?usp=sharing',
    tags: ['Brand Strategy', 'Storytelling', 'ChatGPT', 'AI Visuals'],
    aspect: 'landscape',
    details: {
      role: 'Creative Director & AI Specialist',
      tools: ['ChatGPT', 'Midjourney', 'Kling AI', 'Premiere Pro'],
      duration: '3 Weeks',
      overview: 'Created as a flagship brand film showcasing modern AI pipelines in corporate marketing. This video represents a business founder’s rise, integrating stylistic cinematography, product tracking, and pacing to create an emotional connection with the audience.',
      promptBreakdown: [
        {
          title: 'Consistent Character Concept',
          prompt: 'Medium close-up of a young visionary entrepreneur looking out of a large glass window in a futuristic high-tech logistics center, neon blue accents, soft morning light, highly detailed textures, photorealistic --ar 16:9',
          explanation: 'Defined visual seeds and descriptions to maintain character likeness across multiple scenes.'
        },
        {
          title: 'The Breakthrough',
          prompt: 'Fast tracking cinematic dolly shot, a package moving along a high-speed automated conveyor system with glowing green telemetry overlays, micro-details, bokeh background --ar 16:9',
          explanation: 'Broke down complex camera motions to direct generative AI engines to produce matching panning action.'
        }
      ],
      storyboard: [
        'images/poster2.png',
        'images/indus.png'
      ]
    }
  },
  {
    slug: 'kaal-bhairav',
    title: 'Kaal Bhairav — Kashi',
    subtitle: 'Cinematic Visual Exploration',
    category: 'storytelling',
    description: 'A breathtaking cultural visual journey through Varanasi/Kashi, exploring the divine energy of Kaal Bhairav. Developed using advanced generative AI prompts and deep cultural motifs.',
    videoSrc: 'videos/kashi1.mp4.mp4',
    fullVideoSrc: 'videos/VarunGaur_Kaalhairav_reel.mp4.mp4',
    driveLink: 'https://drive.google.com/file/d/1DeslFGFF00MsmBrw0aKSaaVgDDN6jDsr/view?usp=drive_link',
    tags: ['Cinematic AI', 'Cultural Storytelling', 'Kling AI', 'Varanasi'],
    aspect: 'portrait',
    details: {
      role: 'Creative Visualizer & Director',
      tools: ['Kling AI', 'Midjourney', 'Stable Diffusion', 'Canva'],
      duration: '3 Weeks',
      overview: 'A deep-dive artistic project aiming to represent the ancient city of Varanasi and the mysticism of Kaal Bhairav. Fusing traditional Indian aesthetics with high-end sci-fi-infused cinematic rendering.',
      promptBreakdown: [
        {
          title: 'Ancient Varanasi',
          prompt: 'Cinematic wide angle, ancient temples on the banks of Varanasi during sunset, golden hour light reflecting off the sacred Ganges river, hundreds of floating oil lamps, cinematic smoke, hyper-detailed, spiritual aura --ar 16:9',
          explanation: 'Captured the essence of the ghats during sunset using volumetric lighting and smoke simulations.'
        },
        {
          title: 'Divine Energy Reveal',
          prompt: 'Cinematic close-up of a mystical guardian representing Kaal Bhairav, third eye glowing with fiery orange light, ash smears on face, traditional red and black markings, dynamic wind blowing hair, high-contrast chiaroscuro lighting --ar 16:9',
          explanation: 'Established high-contrast spiritual aesthetics and fine skin/ash details.'
        }
      ],
      storyboard: [
        'images/poster1.png',
        'images/poster2.png'
      ]
    }
  },
  {
    slug: 'eastem-commercial',
    title: 'Eastem Commercial',
    subtitle: 'Dynamic Brand Showcase',
    category: 'commercial',
    description: 'A high-energy, vertical commercial concept demonstrating product styling, dynamic motion graphics, and fast pacing tailored for digital platforms.',
    videoSrc: 'videos/eastem.mp4',
    fullVideoSrc: 'videos/eastem.mp4',
    driveLink: 'https://drive.google.com/file/d/1WLpY1Vyb4AgUncxZFtUemXDMonKXqpVe/view?usp=drive_link',
    tags: ['Commercial', 'Vertical Format', 'AI Video', 'Product Motion'],
    aspect: 'portrait',
    details: {
      role: 'AI Editor & Motion Specialist',
      tools: ['Kling AI', 'CapCut', 'Photoshop'],
      duration: '1 Week',
      overview: 'Created a short-form vertical commercial showcase for Eastem, exploring dynamic camera angles, seamless visual transitions, and rapid product placement.',
      promptBreakdown: [
        {
          title: 'Vertical Brand Showcase',
          prompt: 'Dynamic commercial visual, vertical 9:16 aspect ratio, modern tech lifestyle product closeup, cinematic lighting, sleek aesthetics, smooth motion',
          explanation: 'Designed to capture attention immediately in standard mobile formats.'
        }
      ],
      storyboard: [
        'images/indus.png',
        'images/nasa.png'
      ]
    }
  },
  {
    slug: 'foam-wash',
    title: 'Foam Wash Product Campaign',
    subtitle: 'Macro Fluid Simulation Commercial',
    category: 'commercial',
    description: 'A close-up product demonstration highlighting clean textures, fluid dynamics, and commercial storytelling for a premium skincare concept.',
    videoSrc: 'videos/foam-wash.mp4',
    fullVideoSrc: 'videos/foam-wash.mp4',
    driveLink: 'https://drive.google.com/file/d/1e-uSggAd3hU91EiUcfyYZtKRWJIV-j1R/view?usp=drive_link',
    tags: ['Skincare Brand', 'Fluid Simulation', 'Kling AI', 'Product Design'],
    aspect: 'portrait',
    details: {
      role: 'Commercial Visualizer',
      tools: ['Kling AI', 'Midjourney', 'Topaz Video AI'],
      duration: '10 Days',
      overview: 'A stylized skincare product commercial focused on rendering rich textures. The main challenge was achieving stable, high-fidelity liquid foam physics using AI rendering generators.',
      promptBreakdown: [
        {
          title: 'Macro Skincare Texture',
          prompt: 'Extreme macro shot of luxurious white foam and water bubbles slowly expanding and popping, soft studio lighting, pastel colors, ultra-high resolution --ar 16:9',
          explanation: 'Controlled prompts to produce pristine organic physics without artifacts.'
        }
      ],
      storyboard: [
        'images/naetc.png',
        'images/poster2.png'
      ]
    }
  },
  {
    slug: 't-shirt-campaign',
    title: 'T-Shirt Campaign',
    subtitle: 'Streetwear Brand Identity',
    category: 'commercial',
    description: 'Stylized streetwear visual campaign showing cloth simulations, brand aesthetic integration, and contemporary urban cinematography.',
    videoSrc: 'videos/T-shirt.mp4',
    fullVideoSrc: 'videos/T-shirt.mp4',
    driveLink: 'https://drive.google.com/file/d/13zaIHF_R3LaUGnszT91NprsLRvKN3pWa/view?usp=drive_link',
    tags: ['Streetwear', 'Fashion Commercial', 'Generative Video', 'Aesthetic'],
    aspect: 'portrait',
    details: {
      role: 'Visual Director',
      tools: ['Kling AI', 'Photoshop', 'CapCut'],
      duration: '10 Days',
      overview: 'A streetwear brand showcase focused on clothing fabric details and model performance. Created using AI prompts focused on cloth dynamics and lighting.',
      promptBreakdown: [
        {
          title: 'Urban Fashion Motion',
          prompt: 'Cinematic medium shot of a model wearing a black oversized graphic t-shirt walking through a neon-lit Tokyo street at night, camera tracking backwards, rain reflections on road --ar 16:9',
          explanation: 'Combined atmospheric lighting, scene motion, and specific garments to achieve consistency.'
        }
      ],
      storyboard: [
        'images/railways.png',
        'images/indus.png'
      ]
    }
  },
  {
    slug: 'panda-tea',
    title: 'Panda Tea Commercial',
    subtitle: 'Character Consistency Commercial',
    category: 'commercial',
    description: 'An advertising campaign showcasing consistent mascot characters, commercial product styling, and playful emotional pacing.',
    videoSrc: 'videos/panda-tea.mp4',
    fullVideoSrc: 'videos/panda-tea.mp4',
    tags: ['Mascot Consistency', 'Commercial', 'Canva', 'Storytelling'],
    aspect: 'portrait',
    details: {
      role: 'Creative Animator',
      tools: ['Midjourney', 'Kling AI', 'CapCut', 'Canva'],
      duration: '12 Days',
      overview: 'Designed a playful tea product commercial focusing on mascot creation. Maintaining the mascot\'s specific face structure across multiple scenes was the core challenge successfully solved.',
      promptBreakdown: [
        {
          title: 'Panda Mascot Design',
          prompt: 'Adorable 3D styled panda mascot wearing a small chef hat, drinking milk tea in a bright cozy wooden tea shop, soft ambient occlusion, cute, commercial render --ar 16:9',
          explanation: 'Established styling cues and rendering seeds to lock the mascot character.'
        }
      ],
      storyboard: [
        'images/poster1.png',
        'images/naetc.png'
      ]
    }
  }
];

export interface PosterArt {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
}

export const posters: PosterArt[] = [
  { id: '1', title: 'Indus Visual Concept', category: 'concept', imageSrc: '/images/indus.png' },
  { id: '2', title: 'NASA Space Agency Concept', category: 'futurism', imageSrc: '/images/nasa.png' },
  { id: '3', title: 'Indian Railways Heritage', category: 'vintage', imageSrc: '/images/railways.png' },
  { id: '4', title: 'NAETC Visual Concept', category: 'editorial', imageSrc: '/images/naetc.png' },
  { id: '5', title: 'Prompt Engineering Poster 1', category: 'typographic', imageSrc: '/images/poster1.png' },
  { id: '6', title: 'Storyboarding Concept 2', category: 'typographic', imageSrc: '/images/poster2.png' },
];

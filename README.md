# Varun Gaur — Portfolio ("Viewfinder")

Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · static export (`out/`) for Netlify.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

All films and commercials live in **`src/data/projects.ts`**. Homepage copy (editorial, key art,
automation, experience, contact) lives in **`src/data/site.ts`**. Any text starting with
`[FILL IN` shows on the site as an orange dashed "To fill" box until you replace it.

Missing media never breaks the page: if a file isn't in `public/` at build time, a dark slate
naming the expected file is shown instead. Add the file, rebuild, and it appears.

## Files in `public/`

Already included in this zip:

| Path | What |
|---|---|
| `videos/showreel.mp4` | Stand-in 16s reel cut from Sea Titan + The Order. Replace with your real reel (muted, ~1024px wide, under 4 MB). |
| `videos/previews/<slug>.mp4` | 6s muted hover/hero loops (sea-titan, kaal-bhairav, the-order, foam-wash, panda-tea, new-ladakh-model) |
| `images/posters/<slug>.jpg` | Poster frames for the above + `showreel.jpg` |
| `images/editorial/*.jpg` | 11 ISN Report statics/posters, resized to 1280px |
| `og.jpg` | 1200×630 social share image |
| `googlef956591d2ef83f4d.html` | Your Google Search Console verification (kept) |

**Copy from your old repo** (renamed — not in the zip because of size):

| Old file | New path |
|---|---|
| `public/videos/titan-clash.mp4` | `public/videos/sea-titan.mp4` |
| `public/videos/VarunGaur_Kaalhairav_reel.mp4.mp4` | `public/videos/kaal-bhairav.mp4` |
| `public/videos/the-order.mp4` | `public/videos/the-order.mp4` |
| `public/videos/foam-wash.mp4` | `public/videos/foam-wash.mp4` |
| `public/videos/panda-tea.mp4` | `public/videos/panda-tea.mp4` |
| `public/videos/ladakh.mp4` | `public/videos/new-ladakh-model.mp4` |

Delete the rest of the old media (`eastem.mp4`, `T-shirt.mp4`, `kashi1.mp4.mp4`, `*-trailer.mp4`, `poster*.jpg/png`, `railways.png`).

**Still missing — add these:**

| Path | Notes |
|---|---|
| `resume.pdf` | Resume download button |
| `videos/rust-tide.mp4`, `videos/previews/rust-tide.mp4`, `images/posters/rust-tide.jpg` | Featured film |
| same three files for `vimana` and `kadak-chai` | |
| `images/key-art/{rust-tide,vimana,sea-titan,kaal-bhairav,the-order,kadak-chai}.jpg` | Portrait one-sheets, 27:40 (e.g. 1080×1600) |
| `images/automation/{order-confirmation,rto-ndr-tracker,master-dashboard}.jpg` | Screenshots, 16:10 (e.g. 1600×1000) |
| `images/process/<slug>-{style-frame,reference-sheet,before-after}.jpg` | Case study galleries, 4:3 |

Previews: 4–8s, no audio, ~960px. With ffmpeg:
`ffmpeg -ss 2 -i film.mp4 -t 6 -an -vf scale=960:-2 -crf 28 -movflags +faststart previews/<slug>.mp4`
Posters: `ffmpeg -ss 2 -i film.mp4 -frames:v 1 -q:v 4 ../images/posters/<slug>.jpg`

## Deploy to Netlify

`netlify.toml` already sets the build: command `npm run build`, publish directory `out`, Node 20.

1. Replace the contents of your `varungaur777/portfolio` repo with this project (keep `.git`), add the video files above, commit and push.
2. In Netlify → Site configuration → Build & deploy, check **Publish directory = `out`** (the toml sets it; clear any old `.next` value in the UI).
3. If Netlify had auto-installed the **Next.js Runtime** plugin for the old site, remove it under Plugins — this is a plain static export.
4. Deploy. Every push to `main` redeploys.

No-Git alternative: `npm run build`, then drag the `out/` folder onto app.netlify.com/drop (or Deploys → drag and drop on your existing site).

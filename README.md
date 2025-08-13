# MBA Pulse — Premium (Static Prototype)
A deploy-ready static site that you can host on **Vercel**, **Netlify**, or **GitHub Pages**.
- Dynamic content comes from `data.json` (you can later swap to Google Sheets CSV/Notion export).

## Quick Deploy (Vercel GUI)
1. Create a GitHub repo named `mba-pulse-premium`.
2. Upload these files: `index.html`, `styles.css`, `script.js`, `data.json`, `vercel.json`.
3. Go to vercel.com → **New Project** → Import the repo → Deploy.

## Quick Deploy (Vercel CLI)
```bash
npm i -g vercel
vercel login
vercel --prod /path/to/mba-pulse-premium
```
Vercel will output a live URL.

## Update Articles
- Edit `data.json` and push (or redeploy); the site fetches it client-side and updates instantly.

## Notion → Site (Fast Path)
1. In Notion: Export the page as **CSV**.
2. Open the CSV, map columns to: category, headline, summary, takeaway1, takeaway2, image, readtime, tag.
3. Convert to JSON with any online CSV→JSON tool and save as `data.json` (same structure as sample).
4. Redeploy.

## Google Sheets (Optional live updates)
- Publish a Google Sheet as CSV and switch `script.js` to fetch that URL (or use the dynamic version we built earlier).

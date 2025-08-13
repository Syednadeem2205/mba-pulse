# MBA Pulse — Premium (Static Prototype)
A deploy-ready static site that you can host on **Vercel**, **Netlify**, or **GitHub Pages**.
- Dynamic content comes from `data.json` (you can later swap to Google Sheets CSV/Notion export).


## Update Articles
- Edit `data.json` and push (or redeploy); the site fetches it client-side and updates instantly.

## Notion → Site (Fast Path)
1. In Notion: Export the page as **CSV**.
2. Open the CSV, map columns to: category, headline, summary, takeaway1, takeaway2, image, readtime, tag.
3. Convert to JSON with any online CSV→JSON tool and save as `data.json` (same structure as sample).
4. Redeploy.

## Google Sheets (Optional live updates)
- Publish a Google Sheet as CSV and switch `script.js` to fetch that URL (or use the dynamic version we built earlier).

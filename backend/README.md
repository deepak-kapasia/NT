# Academic Tracker API (Backend)

Express API with MongoDB. Runs as a **serverless** app on Vercel or as a normal server locally.

## Local development

```bash
npm install
cp .env.example .env   # add your MONGODB_URI
npm run dev           # uses nodemon
# or
npm start             # node server.js
```

Server: `http://localhost:3000`

## Deploy to Vercel

1. Push this folder to a Git repo (or use Vercel CLI).
2. In [Vercel](https://vercel.com): **New Project** → Import the repo, set **Root Directory** to this backend folder (e.g. `backend`).
3. **Environment variables**: add `MONGODB_URI` with your MongoDB connection string (e.g. Atlas URI).
4. Deploy.

All traffic is sent to the serverless handler (`index.js` → `app.js`). Routes:

- `GET /api/users`
- `GET /api/:user`
- `GET/POST /api/:user/subjects`
- `DELETE /api/:user/subjects/:id`
- `GET/POST /api/:user/dailylogs`

Set your frontend `VITE_API_BASE_URL` (or equivalent) to the Vercel deployment URL (e.g. `https://your-api.vercel.app/api`).

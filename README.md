# Aksamitna Eteryka - Photography Studio Website 📸

This project is a digital business card for a photography studio named **Aksamitna Eteryka**. It serves as an online portfolio, showcasing the studio's work and providing potential clients with the ability to contact the team.

## ✨ Project Details

- **Node.js Version**: 20.19
- **NPM Version**: 10.9.2
  
## 🚀 Deployment

### Environments
| Environment | Branch | URL | Status |
|-------------|--------|-----|--------|
| **Production** | `master` | [aksamitna-eteryka.vercel.app](https://aksamitna-eteryka.vercel.app) | [![Production](https://img.shields.io/badge/Production-Live-brightgreen)](https://aksamitna-eteryka.vercel.app) |

`master` is the only branch — it deploys straight to production.

### Environment variables

Set these in the Vercel project (Settings → Environment Variables):

| Variable | Used by | Purpose |
|----------|---------|---------|
| `INSTAGRAM_ACCESS_TOKEN` | `api/instagram.js` | Instagram Graph API token. Expires after 60 days — refresh via `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…` |
| `INSTAGRAM_USER_ID` | `api/instagram.js` | Instagram business account ID |
| `MAIL_USER` | `api/send-email.js` | Gmail address used as SMTP sender |
| `MAIL_PASS` | `api/send-email.js` | Gmail [App Password](https://myaccount.google.com/apppasswords) |

Pull them locally with `npx vercel env pull .env.local`.

## 🛠️ Development Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have the following software installed:

- **Node.js**: 20.19
- **NPM**: 10.9.2

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MacTii/velvet-ethereal.git
2. Install the dependencies:
   ```bash
   npm install
3. Run the development server:

   ```bash
   npm run dev
   ```

   Vite serves the site on http://localhost:5173. Note that `npm run dev` does **not**
   run the `api/` functions, so the contact form and the Instagram feed stay on their
   fallbacks. To exercise them locally, run the Vercel dev server instead:

   ```bash
   npx vercel dev
   ```

## 📬 Contact

**Studio Owner:** Karina Moszczyńska/Taisa Gawrońska </br>
**Email:** aksamitnaeteryka@gmail.com </br>
**Instagram:** <a href="https://www.instagram.com/studio_aksamitna_eteryka/" target="_blank">@studio_aksamitna_eteryka</a>

## 📝 License

This project is licensed under a **Commercial License**. To use or distribute this project, you must obtain a valid commercial license.

For more details on pricing and licensing terms, please contact us at aksamitnaeteryka@gmail.com.

All rights reserved © 2025 Aksamitna Eteryka.

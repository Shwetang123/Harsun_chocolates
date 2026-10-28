# HarSun Chocolates pre-launch site

A small website for presenting the HarSun idea, previewing planned products, and collecting honest visitor feedback. The **Our Store** section is a concept gallery; there are no sales or orders.

## Run locally

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`. The development command runs Vite and the feedback API together.

## Build and run

```sh
npm run build
npm run preview
```

The production server listens on `PORT` (default `3000`) and serves both the built site and `/api/feedback`. Set `HOST` if needed. Deploy this Node server with a **persistent writable filesystem**. Vercel uses the separate function in `api/feedback.mjs` instead.

Feedback is stored privately as JSON Lines in `data/feedback.jsonl`, excluded from Git. Set `FEEDBACK_FILE` to a persistent path for deployment. The public API exposes only response and purchase-interest counts, never visitor comments or emails. Review the file directly to read submissions. If a visitor leaves an email and checks consent, it is stored for possible follow-up; otherwise no email is collected.

## Email notifications

The existing Node API sends each saved response to the admin through [Resend](https://resend.com/docs/send-with-nodejs). Configure these server-side environment variables in your hosting provider:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (keep secret) |
| `FEEDBACK_FROM_EMAIL` | Sender address on a domain verified in Resend, for example `feedback@yourdomain.com` |
| `FEEDBACK_ADMIN_EMAIL` | Inbox that should receive notifications |
| `FEEDBACK_FILE` | Optional persistent path for saved responses |
| `FEEDBACK_NOTIFICATION_FILE` | Optional persistent path for the notification receipt log; defaults to `feedback-notified.jsonl` beside `FEEDBACK_FILE` |
| `TRUST_PROXY` | Optional `true` only when the hosting proxy overwrites `X-Forwarded-For`; otherwise leave unset |

For local development, `.env.local` sets `FEEDBACK_ADMIN_EMAIL=shwetang11082002@gmail.com` and is excluded from Git. `npm run dev` loads this file for the API. Add the Resend key and verified sender address to the same file to enable local notifications.

### Vercel deployment

Vercel serves the Vite build and exposes `api/feedback.mjs` at `/api/feedback`. In **Vercel → Project → Settings → Environment Variables**, set `FEEDBACK_ADMIN_EMAIL` to `shwetang11082002@gmail.com`, `RESEND_API_KEY` to your private Resend key, and `FEEDBACK_FROM_EMAIL` to an address on your verified sender domain. Apply them to Production and redeploy. `.env.local` does not go to Vercel. Test the live form only after the new deployment is ready.

The Vercel function waits for Resend to accept the email before confirming a submission. The feedback is available in the admin inbox; this Vercel path has no separate database or aggregate feedback counter. Vercel functions cannot persist the JSONL files used by the standalone Node server. For distributed spam protection, add a Vercel Firewall rate limit rule for `POST /api/feedback` (for example, 5 requests per hour per IP). The function also validates inputs, uses a honeypot, and has a local per-instance limit.

The standalone Node production server refuses to start without the three email settings. The Vercel function returns a temporary error until they are configured. In local development, feedback still works without them, but notifications are disabled until you set them. Never put the key in Vite `VITE_` variables or frontend files.

The API saves feedback first, then attempts the email. It retries unsent notifications every minute and after a server restart. The receipt log must share persistent storage with the feedback file. Resend's idempotency key reduces duplicate sends during retries. The website confirms a response once it is saved; delivery to an inbox also depends on the email provider and receiving mailbox. Check server logs and the Resend dashboard if a notification is delayed.

The API validates submissions, limits body size, includes a honeypot field, and applies a basic per-IP rate limit. For a public launch, add hosting level spam protection and backups for the feedback file.

Vite 8 warns with Node 22.11.0; use Node 22.12 or newer for supported operation.

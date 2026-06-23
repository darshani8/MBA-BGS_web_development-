# Form submissions — setup guide (contact / admissions / programs)

The site has **5 forms** that deliver to you: Contact, Admissions, Programs, the
homepage lead form, and the newsletter signups. They submit to **Web3Forms**, a
free service that emails every submission to you and can also push it into a
**Google Sheet**. No server is needed — this works on any host.

> ✅ **Status: LIVE.** A real access key is already set in `lib/formConfig.js`, so
> the forms send real submissions to **mbainfo@bgscet.ac.in**. (If you ever want
> to pause them, set the key back to `'WEB3FORMS_ACCESS_KEY'` to return to demo
> mode.) Send one test submission per form after deploying to confirm delivery.

---

## 1. The access key (already set — for reference)

The key lives in **`lib/formConfig.js`**:
```js
export const WEB3FORMS_ACCESS_KEY = 'db5e31d5-...';  // already set → forms are LIVE
```
A real key is in place, so submissions already email **mbainfo@bgscet.ac.in**.
After deploying, send one test submission per form to confirm delivery (check the
spam folder the first time and mark it "not spam").

To **pause** the forms (return to demo mode that sends nothing), set the value
back to `'WEB3FORMS_ACCESS_KEY'`, rebuild, redeploy.

> The Web3Forms key is **safe to keep in public code** — by design it can only
> *send to* your verified email; it can't read anything. So committing it and

> The Web3Forms key is **safe to keep in public code** — by design it can only
> *send to* your verified email; it can't read anything. So committing it and
> handing it to the host is fine.

---

## 2. Also save submissions to a Google Sheet (optional but recommended)

Emails are easy to lose; a Sheet is a permanent, searchable record.

**Easiest way — Web3Forms built-in integration:**
1. Log in to your Web3Forms dashboard.
2. Open your form → **Integrations** → **Google Sheets**.
3. Click **Connect**, sign into Google, and pick/create a spreadsheet.
4. Done — new submissions appear as rows automatically.

**Alternative — Zapier (if you prefer):**
1. Create a free Zapier account.
2. New Zap: **Trigger = Web3Forms** (new submission) → **Action = Google Sheets**
   (create row). Map the fields (name, email, phone, program, message…).
3. Turn the Zap on.

The fields each form sends (so your Sheet columns make sense):
`name`, `email`, `phone`, `message`, plus `program` (admissions/programs) or
`subject_topic` (contact), `grad`, `city`, and a `subject` line for the email.

---

## 3. What's already built in

- **Spam protection (honeypot):** a hidden `botcheck` field — bots fill it and get
  silently dropped; real users never see it. No CAPTCHA needed for now.
- **Error handling:** if a send fails, the visitor sees a red "something went
  wrong, email us instead" message rather than a silent failure.
- **Success message:** your existing green check message now shows on a *real*
  successful send, and the form resets.
- **Demo fallback:** with no key set, forms still show the thank-you locally so
  the site never looks broken during development.

---

## 4. Test it (after adding the key)

1. `npm run build` and deploy (or run `npm run dev` locally — works the same).
2. Open `/contact/`, fill the form, submit.
3. Check **mbainfo@bgscet.ac.in** for the email (check spam the first time).
4. If you connected the Sheet, confirm a new row appeared.
5. Repeat for `/admissions/` and `/programs/`.

Files involved (for reference): `lib/formConfig.js` (your key),
`app/components/SiteScripts.js` (submit logic),
`content/contact.html` · `content/admissions.html` · `content/programs.html`
(the form markup).

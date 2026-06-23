/* ─────────────────────────────────────────────────────────────────────────
   FORM DELIVERY SETTINGS  (contact / admissions / programs enquiry forms)

   These forms submit to Web3Forms (https://web3forms.com), a free service that
   emails every submission to you and can also push it into a Google Sheet.
   The site is a static export with no backend, so a service like this is how
   submissions reach you on any host.

   👉 TO GO LIVE: replace WEB3FORMS_ACCESS_KEY below with the real key you got
      from web3forms.com (it looks like  a1b2c3d4-e5f6-7890-abcd-ef1234567890 ).
      This is the ONLY value you need to change. Forms stay in demo mode (they
      just show the thank-you message and send nothing) until the key is set.

   NOTE: a Web3Forms access key is SAFE to keep in public website code — by
   design it can only SEND to your verified email, it can't read anything. So
   committing it to the repo / handing it to the host is fine.
   ───────────────────────────────────────────────────────────────────────── */

// Paste your real key here when ready (keep the quotes). Until then, demo mode.
export const WEB3FORMS_ACCESS_KEY = 'db5e31d5-0616-4b4a-84b8-60bd5b73ca8f';

// Web3Forms submission endpoint — do not change.
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// True only when a real key has been filled in above. When false, the forms
// behave as a harmless demo (no network request).
export const FORMS_LIVE =
  WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'WEB3FORMS_ACCESS_KEY';

import { createClient } from '@base44/sdk';

// Same appId as the actual app (app.langsi.app, repo DID-LLC/langsi). This
// site has no server of its own (static export on GitHub Pages), so it
// talks to Base44's platform API directly rather than through a per-domain
// proxy — requires the langsi.app origin to be CORS-allowlisted in the
// Base44 dashboard for this app's auth endpoints.
const APP_ID = '69080f3002a1f3579a154b61';
const SERVER_URL = 'https://base44.app';

// Where the user ends up after login/register — the real app, not this
// marketing site. Exported so the auth forms can build the post-auth
// redirect and the OAuth `fromUrl`.
export const APP_URL = 'https://app.langsi.app';

export const base44 = createClient({
  appId: APP_ID,
  serverUrl: SERVER_URL,
  // loginWithProvider()/redirectToLogin() build their redirect off
  // appBaseUrl, not serverUrl — pointing it at base44.app (a plain
  // browser navigation, not a fetch/XHR, so CORS doesn't apply here)
  // avoids depending on app.langsi.app's own custom-domain API proxy.
  appBaseUrl: SERVER_URL,
  requiresAuth: false,
});

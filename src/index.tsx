import * as React from 'react';
import 'piral/polyfills';
import { renderInstance } from 'piral';
import { layout, errors } from './layout';
import { setupOAuth2Client, createOAuth2Api, OAuth2Client } from 'piral-oauth2';
import { setupOidcClient, createOidcApi } from 'piral-oidc';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/empty';

// Please fill in your desired client with the values that you would like to use.
// You will most likely have to make sure that your provider supports the redirect URI below.
// Otherwise you can create register a new page which uses an accepted redirect URI.
const oauth2Client = setupOAuth2Client({ 
  clientId: '<TODO>',
  clientSecret: '<TODO>',
  redirectUri: 'http://localhost:5002',
  accessTokenUri: '<TODO>',
  authorizationUri: '<TODO>',
  scopes: ['<TODO>', '<TODO>'],
  flow: 'implicit',
});

const oidcClient = setupOidcClient({
    clientId: '<TODO>',
    clientSecret: '<TODO>',
    redirectUri: '<TODO>',
    identityProviderUri: '<TODO>',
    scopes: ['<TODO>', '<TODO>'],
    responseType: '<TODO>',
});

export const piral = renderInstance({
  layout,
  errors,
  extendApi: [
    // Please uncomment the client which you would like to use:

    // createOAuth2Api(oauth2Client),
    createOidcApi(oidcClient),
  ],
  requestPilets() {
    return fetch(feedUrl)
      .then(res => res.json())
      .then(res => res.items);
  },
});



const app = piral.root;

app.registerTile('auth-demo-login-tile', () => {
  const login = () => {
    // Please uncomment the client which you would like to use:

    // oauth2Client.login();
    oidcClient.login();
  };

  return (
    <div className="tile rows-1 cols-1">
      <button onClick={login}>Login</button>
    </div>
  );
});

app.registerTile('auth-demo-token-tile', () => {
  const fetchToken = () => {
    app.getAccessToken()
      .then((token) => app.showNotification(`Successfully fetched an access token: ${token.substr(0, 50)}...`))
      .catch((error) => app.showNotification(`Failed to fetch a token: ${error}`));
  };

  return (
    <div className="tile rows-1 cols-1">
      <button onClick={fetchToken}>Fetch Access Token</button>
    </div>
  );
});
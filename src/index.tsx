import "piral/polyfills";
import * as React from "react";
import { renderInstance, PiletApi } from "piral";
import { layout, errors } from "./layout";
import { setupOAuth2Client, createOAuth2Api } from "piral-oauth2";
import { setupOidcClient, createOidcApi } from "piral-oidc";

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = "https://feed.piral.cloud/api/v1/pilet/empty";

function createPlugin(mode: "oidc" | "oauth2") {
  if (mode === "oidc") {
    // Please fill in your desired client with the values that you would like to use.
    // You will most likely have to make sure that your provider supports the redirect URI below.
    // Otherwise you can create register a new page which uses an accepted redirect URI.
    const client = setupOidcClient({
      clientId: "<TODO>",
      clientSecret: "<TODO>",
      redirectUri: "<TODO>",
      identityProviderUri: "<TODO>",
      scopes: ["<TODO>", "<TODO>"],
      responseType: "<TODO>",
    });
    const plugin = createOidcApi(client);
    return { client, plugin };
  } else if (mode === "oauth2") {
    // Please fill in your desired client with the values that you would like to use.
    // You will most likely have to make sure that your provider supports the redirect URI below.
    // Otherwise you can create register a new page which uses an accepted redirect URI.
    const client = setupOAuth2Client({
      clientId: "<TODO>",
      clientSecret: "<TODO>",
      redirectUri: "http://localhost:5002",
      accessTokenUri: "<TODO>",
      authorizationUri: "<TODO>",
      scopes: ["<TODO>", "<TODO>"],
      flow: "implicit",
    });
    const plugin = createOAuth2Api(client);
    return { client, plugin };
  }
}

function demoPilet(app: PiletApi) {
  const fetchToken = () => {
    app
      .getAccessToken()
      .then((token) =>
        app.showNotification(
          `Successfully fetched an access token: ${token.substr(0, 50)}...`
        )
      )
      .catch((error) =>
        app.showNotification(`Failed to fetch a token: ${error}`)
      );
  };

  app.registerTile("auth-demo-login-tile", () => (
    <div className="tile rows-1 cols-1">
      <button onClick={client.login}>Login</button>
    </div>
  ));

  app.registerTile("auth-demo-token-tile", () => (
    <div className="tile rows-1 cols-1">
      <button onClick={fetchToken}>Fetch Access Token</button>
    </div>
  ));
}

const { client, plugin } = createPlugin("oidc");

export const piral = renderInstance({
  layout,
  errors,
  plugins: [plugin],
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
});

demoPilet(piral.root);

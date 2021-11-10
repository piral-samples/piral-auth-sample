[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> Sample app shell for using the Piral auth plugins. 

:zap: This sample demonstrates the primary use of `piral-oidc` and `piral-oauth2` in a simple app shell.

## Getting Started

Install the dependencies:

```sh
npm install
```

And then change the values of the `createPlugin` function in *src/index.tsx*. These values need to come from your OpenID Connect (OIDC) or OAuth2 provider.

Now run:

```sh
npm start
```

The app shell should be up and running.

## More Information

You find more information at the [oauth2 plugin page](https://docs.piral.io/plugins/piral-oauth2) or the [oidc plugin page](https://docs.piral.io/plugins/piral-oidc).

Most issues will actually be solved by getting familiar with the libraries underneath.

- For `piral-oauth2` the work is done by [client-oauth2](https://www.npmjs.com/package/client-oauth2).
- For `piral-oidc` the work is done by [oidc-client](https://www.npmjs.com/package/oidc-client).

## License

Piral and this sample code is released using the MIT license. For more information see the [license file](./LICENSE).

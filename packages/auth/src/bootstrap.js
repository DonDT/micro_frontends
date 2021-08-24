import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import { createMemoryHistory, createBrowserHistory } from "history";
// Mount function to start up app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  // whenever navigation occurs listen will call onNavigate
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDom.render(<App history={history} onSignIn={onSignIn} />, el);

  // here the container can call mount to update the marketing app
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// if in isolation call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// else run through container

export { mount };

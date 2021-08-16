import React from "react";
import ReactDom from "react-dom";
import App from "./app";
// Mount function to start up app

const mount = (el) => {
  ReactDom.render(<App />, el);
};

// if in isolation call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// else run through container

export { mount };

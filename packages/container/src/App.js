import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

const MarketingLazy = lazy(() => import("./components/marketingApp"));
const AuthLazy = lazy(() => import("./components/authApp"));
import Progress from "./components/progress";
// imports the boostrap mount function
// the first marketing => name in webpack config container, the second in webpack config
// marketing'

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <hr />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
}

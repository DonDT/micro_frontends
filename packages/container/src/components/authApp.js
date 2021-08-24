import { mount } from "auth/AuthApp";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory(); // history being used inside the container, browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; // current path name or location (browser)
        // prevent infinite loop
        if (pathname !== nextPathname) {
          history.push(nextPathname); // this updates the browers history in container
        }
      },
      onSignIn: () => {
        onSignIn();
      },
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

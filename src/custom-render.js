import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserProvider from "./context/UserProvider";
import EventProvider  from "./context/EventProvider";

const Wrapper = ({ children }) => {
  return (
    <UserProvider>
      <EventProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </EventProvider>
    </UserProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
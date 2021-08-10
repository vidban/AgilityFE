import React from "react";
import { render } from "../../custom-render";
import Login from "./Login";

describe("<Login>", () => {
  it("renders without crashing", () => {
    render(<Login />);
  });
});
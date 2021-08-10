import React from "react";
import { render } from "../../custom-render";
import LoginSignUp from "./LoginSignUp";

describe("<LoginSignUp>", () => {
  it("renders without crashing", () => {
    render(<LoginSignUp />);
  });
});
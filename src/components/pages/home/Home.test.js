import React from "react";
import { render } from "../../../custom-render";
import Home from "./Home";

describe("<Home>", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });
});
import React from "react";
import { render } from "../../../custom-render";
import MyPersonalCalendar from "./MyPersonalCalendar";

describe("<MyPersonalCalendar>", () => {
  it("renders without crashing", () => {
    render(<MyPersonalCalendar />);
  });
});
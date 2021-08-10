import React from "react";
import { render } from "../../../custom-render";
import MyCalendar from "./MyCalendar";

describe("<MyCalendar>", () => {
  it("renders without crashing", () => {
    render(<MyCalendar />);
  });
});
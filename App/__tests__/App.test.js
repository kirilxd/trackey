import React from "react";
import renderer from "react-test-renderer";

import App from "../index";
import { AppContextProvider } from "../util/AppContext";

describe("App component", () => {
  it("renders", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toBeDefined();
  });
});
describe("App context", () => {
  it("renders", () => {
    const tree = renderer.create(<AppContextProvider />).toJSON();
    expect(tree).toBeDefined();
  });
});

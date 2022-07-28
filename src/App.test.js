import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import data from "../api/data.json";
import App from "./App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });
});

test("fetches test suites", async () => {
  render(<App />);
  await act(async () => {
    await Promise.resolve();
  });
  expect(fetch).toBeCalledWith("http://localhost:3456/test_suites");
});

import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import data from "../api/data.json";
import TestSuite from "./TestSuite";

test("changes suite name", () => {
  const props = {
    onSave: jest.fn(),
    testIdx: 1,
    testSuite: data[0],
    updateState: jest.fn(),
  };
  render(<TestSuite {...props} />);

  const editTd = document.getElementById("edit");
  act(() => {
    editTd.click();
  });

  const input = document.getElementById("suiteName");
  fireEvent.change(input, { target: { value: "hello" } });
  expect(props.updateState).toBeCalledWith([1, "test_suite_name"], "hello");
});

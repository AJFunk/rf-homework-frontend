import set from "lodash/set";
import React, { useCallback, useEffect, useState } from "react";

import TestSuite from "./TestSuite";

const App = () => {
  const [testSuites, setTestSuites] = useState([]);

  const updateState = useCallback(
    (path, value) => {
      if (value === null) {
        // remove test_plan
        const newState = [...set(testSuites, path, value)];
        newState[path[0]][path[1]] = newState[path[0]][path[1]].filter(Boolean);
        setTestSuites(newState);
      } else {
        setTestSuites([...set(testSuites, path, value)]);
      }
    },
    [setTestSuites, testSuites]
  );

  const onSave = useCallback(() => {
    console.log("SAVE!", testSuites);
  }, [testSuites]);

  useEffect(() => {
    fetch("http://localhost:3456/test_suites")
      .then((res) => res.json())
      .then((response) => {
        setTestSuites(response);
      });
  }, []);

  if (testSuites.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <tbody>
        {testSuites.map((testSuite, testIdx) => (
          <TestSuite
            key={testIdx}
            onSave={onSave}
            testIdx={testIdx}
            testSuite={testSuite}
            updateState={updateState}
          />
        ))}
      </tbody>
    </table>
  );
};

export default App;

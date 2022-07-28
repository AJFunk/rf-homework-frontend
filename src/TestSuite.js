import React, { useCallback, useState } from "react";

import TestPlan from "./TestPlan";

const TestSuite = ({ onSave, testIdx, testSuite, updateState }) => {
  const { test_plans, test_suite_name } = testSuite;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  const save = useCallback(() => {
    onSave();
    setIsEditing(false);
    setIsExpanded(false);
  }, [onSave, setIsEditing, setIsExpanded]);

  const onChangeSuiteName = ({ target }) => {
    updateState([testIdx, "test_suite_name"], target.value);
  };

  return (
    <>
      <tr style={{ borderBottom: isExpanded ? undefined : "1px solid black" }}>
        <td onClick={toggleExpanded} style={{ cursor: "pointer" }}>
          {isExpanded ? "^" : ">"}
        </td>
        <td>
          {isEditing ? (
            <>
              Suite name:{" "}
              <input
                id="suiteName"
                onChange={onChangeSuiteName}
                type="text"
                value={test_suite_name}
              />
            </>
          ) : (
            test_suite_name
          )}
        </td>
        <td></td>
        <td></td>
        <td>
          {test_plans.length} test{test_plans.length > 1 && "s"}
        </td>
        {isEditing ? (
          <td onClick={save} style={{ color: "blue", cursor: "pointer" }}>
            Save
          </td>
        ) : (
          <td
            id="edit"
            onClick={() => {
              setIsExpanded(true);
              setIsEditing(true);
            }}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Edit
          </td>
        )}
      </tr>
      {isExpanded &&
        test_plans.map((test_plan, testPlanIdx) => {
          return (
            <TestPlan
              key={testPlanIdx}
              canRemove={test_plans.length > 1}
              testIdx={testIdx}
              testPlanIdx={testPlanIdx}
              isEditing={isEditing}
              isLast={testPlanIdx === test_plans.length - 1}
              updateState={updateState}
              testPlan={test_plan}
            />
          );
        })}
    </>
  );
};

export default TestSuite;

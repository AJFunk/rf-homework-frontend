const TestPlan = ({
  canRemove,
  testIdx,
  testPlanIdx,
  isEditing,
  isLast,
  updateState,
  testPlan,
}) => {
  const { browser, instruction_count, test_name } = testPlan;

  const onChangeName = ({ target }) => {
    updateState(
      [testIdx, "test_plans", testPlanIdx, "test_name"],
      target.value
    );
  };

  const onChangeBrowser = ({ target }) => {
    updateState([testIdx, "test_plans", testPlanIdx, "browser"], target.value);
  };

  const onChangeInstructionCount = ({ target }) => {
    updateState(
      [testIdx, "test_plans", testPlanIdx, "instruction_count"],
      target.value
    );
  };

  const onRemoveTestPlan = ({ target }) => {
    updateState([testIdx, "test_plans", testPlanIdx], null);
  };

  const cells = isEditing ? (
    <>
      <td></td>
      <td>
        <input onChange={onChangeName} type="text" value={test_name} />
      </td>
      <td>
        <select onChange={onChangeBrowser} value={browser}>
          <option value="chrome">Chrome</option>
          <option value="edge">Edge</option>
          <option value="firefox">Firefox</option>
          <option value="safari">Safari</option>
        </select>
      </td>
      <td>
        <input
          onChange={onChangeInstructionCount}
          style={{ width: "35px" }}
          type="number"
          value={instruction_count}
        />{" "}
        step{instruction_count > 1 && "s"}
      </td>
      {canRemove ? (
        <td
          style={{ color: "red", cursor: "pointer" }}
          onClick={onRemoveTestPlan}
        >
          Remove
        </td>
      ) : (
        <td />
      )}
      <td />
    </>
  ) : (
    <>
      <td></td>
      <td>{test_name}</td>
      <td>{browser}</td>
      <td>
        {instruction_count} step{instruction_count > 1 && "s"}
      </td>
    </>
  );

  return (
    <tr
      style={{
        borderBottom: isLast ? "1px solid black" : undefined,
      }}
    >
      {cells}
    </tr>
  );
};

export default TestPlan;

// FilterButtons.js
import React from "react";

const FilterButtons = ({ filterTasks }) => {
  return (
    <div>
      <button onClick={() => filterTasks("all")}>All</button>
      <button onClick={() => filterTasks("completed")}>Completed</button>
      <button onClick={() => filterTasks("active")}>Active</button>
    </div>
  );
};

export default FilterButtons;

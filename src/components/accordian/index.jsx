import data from "./data";
import { useState } from "react";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiselection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected((prevSelected) =>
      prevSelected === getCurrentId ? null : getCurrentId
    );
  }

  function handleMultiSelection(getCurrentId) {
    setMultiple((prevMultiple) => {
      const copyMultiple = [...prevMultiple];
      const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

      if (findIndexOfCurrentId === -1) {
        copyMultiple.push(getCurrentId);
      } else {
        copyMultiple.splice(findIndexOfCurrentId, 1);
      }

      return copyMultiple;
    });
  }

  const ToggleIcon = ({ onClick, isActive }) => {
    const toggleIcon = (e) => {
      e.stopPropagation();
      onClick();
    };

    return (
      <div onClick={toggleIcon}>
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <h2>FAQs</h2>
      <button onClick={() => setEnableMultiselection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accrodian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <ToggleIcon
                  onClick={() => {
                    if (enableMultiSelection) {
                      handleMultiSelection(dataItem.id);
                    } else {
                      handleSingleSelection(dataItem.id);
                    }
                  }}
                  isActive={
                    enableMultiSelection
                      ? multiple.indexOf(dataItem.id) !== -1
                      : selected === dataItem.id
                  }
                />
              </div>
              {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

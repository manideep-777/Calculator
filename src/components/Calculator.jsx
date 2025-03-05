import { useState } from 'react';
import { calculate } from './Calculator_logic';

export default function Calculator() {
  const [calText, setCalText] = useState("");
  const [pastCalText, setPastCalText] = useState("");

  function clickedNum(num) {
    setCalText(calText + num);
  }

  function handleBackspace() {
    setCalText(calText.slice(0, -1));
  }

  function handleAC() {
    setCalText("");
    setPastCalText("");
  }

  function handleCalculate() {
    setPastCalText(calText);
    const result = calculate(calText);
    setCalText(result);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="text-right mb-2">
          <div className="text-gray-500 text-sm">{pastCalText}</div>
          <div className="text-2xl font-bold p-2 border rounded bg-gray-200">{calText || '0'}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["AC", "*", "/", "C", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "^", "0", ".", "(", ")", "="].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                btn === "AC"
                  ? handleAC()
                  : btn === "C"
                  ? handleBackspace()
                  : btn === "="
                  ? handleCalculate()
                  : clickedNum(btn)
              }
              className="p-4 text-xl font-bold border rounded-md bg-gray-300 hover:bg-gray-400 active:bg-gray-500 transition-all text-center"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
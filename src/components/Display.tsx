import React from "react";
import { useAppContext } from "../AppContext";
import TooLongInput from "./TooLongInput";

interface DisplayProps {}

const Display: React.FC<DisplayProps> = () => {
  const { inputValue, equation, message, showMessage } = useAppContext();
  const inputValueLength = inputValue.length;
  return (
    <div
      id='display'
      className='relative text-right px-1 py-2 mx-1 mt-1 bg-slate-700 min-h-[92px]'
    >
      <TooLongInput msg={message} show={showMessage} />
      <p className='text-sm min-h-[20px] break-words text-emerald-500'>
        {equation}
      </p>
      <p
        className={`${
          inputValueLength <= 10
            ? "text-5xl mt-2"
            : inputValueLength <= 14
            ? "text-4xl mt-4"
            : "text-3xl mt-5"
        }`}
      >
        {inputValue}
      </p>
    </div>
  );
};
export default Display;

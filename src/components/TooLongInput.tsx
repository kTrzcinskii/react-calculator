import React, { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useAppContext } from "../AppContext";

interface TooLongInputProps {
  show: boolean;
  msg: string;
}

const TooLongInput: React.FC<TooLongInputProps> = ({ show, msg }) => {
  const { message, showMessage, setShowMessage } = useAppContext();

  useEffect(() => {
    if (showMessage && message !== "") {
      const myTimeout = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(myTimeout);
    }
  }, [showMessage, message, setShowMessage]);

  return (
    <div
      className={`${
        show ? "w-72 sm:w-96 opacity-100" : "w:0 opacity-0 delay-500"
      } transition-all duration-100 absolute left-1/2 -top-16  sm:-top-20 lg:-top-24`}
    >
      <div
        className={`${
          show
            ? "w-full opacity-100 -translate-x-1/2 delay-100 text-white"
            : "w-0 opacity-0 text-red-400"
        } transition-all duration-500 max-h-[56px] overflow-hidden flex justify-between bg-red-400 border-2 border-red-600  text-center text-xl px-4 py-3 z-10 rounded-lg shadow-lg sm:text-2xl `}
      >
        <CgDanger className='mt-1' />
        <p className='whitespace-nowrap'>{msg}</p>
        <CgDanger className='mt-1' />
      </div>
    </div>
  );
};

export default TooLongInput;

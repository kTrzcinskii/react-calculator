import React, { useState } from "react";
import Display from "./components/Display";
import ButtonsContainer from "./components/ButtonsContainer";
import { AppContext } from "./AppContext";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("0");
  const [equation, setEquation] = useState("");
  const [equality, setEquality] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  return (
    <AppContext.Provider
      value={{
        inputValue,
        setInputValue,
        equation,
        setEquation,
        equality,
        setEquality,
        message,
        setMessage,
        showMessage,
        setShowMessage,
      }}
    >
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-slate-900 text-white shadow-lg'>
        <Display />
        <ButtonsContainer />
      </div>
    </AppContext.Provider>
  );
};

export default App;

import React, { useContext } from "react";

type AppContextType = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  equation: string;
  setEquation: React.Dispatch<React.SetStateAction<string>>;
  equality: boolean;
  setEquality: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = React.createContext<AppContextType>({
  inputValue: "0",
  setInputValue: () => {},
  equation: "",
  setEquation: () => {},
  equality: false,
  setEquality: () => {},
  message: "",
  setMessage: () => {},
  showMessage: false,
  setShowMessage: () => {},
});

export const useAppContext = () => useContext(AppContext);

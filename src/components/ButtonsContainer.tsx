import React, { useEffect } from "react";
import { RiDivideFill } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";
import { useAppContext } from "../AppContext";
import { transformEquation } from "../utilities/transfromStringToArrays";
import { calculate } from "../utilities/calculate";

interface buttonsContainerProps {}

const ButtonsContainer: React.FC<buttonsContainerProps> = () => {
  const btnClasses =
    "text-center text-2xl px-4 py-4 focus:outline-none focus:ring-1 transition-all ease-in-out";

  const {
    inputValue,
    setInputValue,
    equation,
    setEquation,
    equality,
    setEquality,
    setMessage,
    setShowMessage,
  } = useAppContext();

  const handleEqual = () => {
    if (equation !== "" && !equality) {
      if (
        inputValue === "+" ||
        inputValue === "-" ||
        inputValue === "*" ||
        inputValue === "/" ||
        inputValue === "%" ||
        inputValue === ""
      ) {
        if (
          equation[equation.length - 1] === "+" ||
          equation[equation.length - 1] === "-" ||
          equation[equation.length - 1] === "*" ||
          equation[equation.length - 1] === "/" ||
          equation[equation.length - 1] === "%"
        ) {
          setEquation((prev) => prev.slice(0, prev.length - 1) + "=");
        } else {
          setEquation((prev) => prev + "=");
        }
      } else if (inputValue[inputValue.length - 1] === ".") {
        setEquation((prev) => prev + inputValue.slice(0, -1) + "=");
      } else {
        setEquation((prev) => prev + inputValue + "=");
      }

      setEquality(true);
    }
  };

  const handleClear = () => {
    setEquation("");
    setInputValue("0");
    if (equality) {
      setEquality(!equality);
    }
  };

  const findMyInput = () => {
    if (
      equation[equation.length - 1] === "+" ||
      equation[equation.length - 1] === "-" ||
      equation[equation.length - 1] === "*" ||
      equation[equation.length - 1] === "/" ||
      equation[equation.length - 1] === "%"
    ) {
      return equation[equation.length - 1];
    } else {
      let index = -1000;
      for (let i = equation.length - 1; i >= 0; i--) {
        if (
          equation[i] === "+" ||
          equation[i] === "-" ||
          equation[i] === "*" ||
          equation[i] === "/" ||
          equation[i] === "%"
        ) {
          index = i + 1;
          break;
        }
      }
      if (index === -1000) {
        index = 0;
      }
      return equation.slice(index);
    }
  };

  const handleDelete = () => {
    if (inputValue.length > 0) {
      if (inputValue.includes("e")) {
        setInputValue("0");
      } else setInputValue((prev) => prev.slice(0, prev.length - 1));
      if (equality) {
        setEquation("");
        setEquality(false);
      }
      if (inputValue.length - 1 === 0 && equation !== "") {
        const scientificReg = /-*\d{1}\.{1}\d+e+[+-]+\d+/g;
        if (equation.match(scientificReg)) {
          if (equation.match(scientificReg)![0] === equation) {
            setInputValue(equation);
            setEquation("");
          } else {
            let newInput = findMyInput();
            setEquation((prev) => prev.slice(0, prev.length - newInput.length));
            setInputValue(newInput);
          }
        } else {
          let newInput = findMyInput();
          setEquation((prev) => prev.slice(0, prev.length - newInput.length));
          setInputValue(newInput);
        }
      }
    }
  };

  const handleNumberClick = (num: string) => {
    if (equality) {
      setEquality(false);
      setEquation("");
      if (inputValue !== "0" && !inputValue.includes("e")) {
        setInputValue((prev) => prev + num);
      } else {
        setInputValue(num);
      }
    } else if (inputValue === "0") {
      setInputValue(num);
    } else if (
      inputValue === "+" ||
      inputValue === "*" ||
      inputValue === "/" ||
      inputValue === "%"
    ) {
      setEquation((prev) => prev + inputValue);
      setInputValue(num);
    } else if (inputValue === "-") {
      if (
        equation[equation.length - 1] === "+" ||
        equation[equation.length - 1] === "-" ||
        equation[equation.length - 1] === "*" ||
        equation[equation.length - 1] === "/" ||
        equation[equation.length - 1] === "%"
      ) {
        setInputValue((prev) => prev + num);
      } else if (equation === "") {
        setInputValue((prev) => prev + num);
      } else {
        setEquation((prev) => prev + inputValue);
        setInputValue(num);
      }
    } else if (inputValue.length > 16) {
      setMessage("Input limit met");
      setShowMessage(true);
    } else {
      setInputValue((prev) => prev + num);
    }
  };

  const checkDecimalPoint = (input: string) => {
    if (input.includes(".")) {
      return false;
    }
    return true;
  };

  const handleDecimalPoint = () => {
    if (equality) {
      setEquality(false);
      setEquation("");
    }
    if (inputValue === "0" || inputValue === "") {
      setInputValue("0.");
    } else if (
      inputValue === "+" ||
      inputValue === "*" ||
      inputValue === "/" ||
      inputValue === "%"
    ) {
      setEquation((prev) => prev + inputValue);
      setInputValue("0.");
    } else if (inputValue === "-") {
      if (
        equation[equation.length - 1] === "+" ||
        equation[equation.length - 1] === "-" ||
        equation[equation.length - 1] === "*" ||
        equation[equation.length - 1] === "/" ||
        equation[equation.length - 1] === "%"
      ) {
        setInputValue((prev) => prev + "0.");
      } else {
        setEquation((prev) => prev + "-");
        setInputValue("0.");
      }
    } else if (inputValue.length > 15) {
      setMessage("Input limit met");
      setShowMessage(true);
    } else if (checkDecimalPoint(inputValue)) {
      setInputValue((prev) => prev + ".");
    }
  };

  const handleSigns = (sign: string) => {
    if (equality) {
      setEquality(false);
      setEquation("");
    }
    if (inputValue !== "") {
      if (inputValue[inputValue.length - 1] === ".") {
        setEquation(
          (prev) => prev + inputValue.slice(0, inputValue.length - 1)
        );
        setInputValue(sign);
      } else if (
        inputValue === "+" ||
        inputValue === "*" ||
        inputValue === "/" ||
        inputValue === "%"
      ) {
        setInputValue(sign);
      } else if (inputValue === "-") {
        if (
          (equation[equation.length - 1] === "+" ||
            equation[equation.length - 1] === "-" ||
            equation[equation.length - 1] === "*" ||
            equation[equation.length - 1] === "/" ||
            equation[equation.length - 1] === "%") &&
          equation !== ""
        ) {
          setEquation((prev) => prev.slice(0, prev.length - 1));
          setInputValue(sign);
        } else if (equation !== "") {
          setInputValue(sign);
        }
      } else {
        setEquation((prev) => prev + inputValue);
        setInputValue(sign);
      }
    }
  };

  const handleMinus = () => {
    if (equality) {
      setEquality(false);
      setEquation("");
    }
    if ((inputValue === "0" || inputValue === "") && equation === "") {
      setInputValue("-");
    } else if (
      inputValue === "+" ||
      inputValue === "-" ||
      inputValue === "*" ||
      inputValue === "/" ||
      inputValue === "%"
    ) {
      if (equation[equation.length - 1] === "-") {
        setEquation((prev) => prev.slice(0, prev.length - 1));
      } else if (equation !== "") {
        setEquation((prev) => prev + inputValue);
        setInputValue("-");
      }
    } else if (inputValue[inputValue.length - 1] === ".") {
      setEquation((prev) => prev + inputValue.slice(0, inputValue.length - 1));
      setInputValue("-");
    } else {
      setEquation((prev) => prev + inputValue);
      setInputValue("-");
    }
  };

  useEffect(() => {
    if (equality) {
      //  console.log(transformEquation(equation.slice(0, -1)));

      const numbersAndSigns = transformEquation(equation.slice(0, -1));
      const finalAnswer = calculate(
        numbersAndSigns.numbers,
        numbersAndSigns.signs
      );

      if (finalAnswer === "Infinity" || finalAnswer === "-Infinity") {
        setMessage("You can't divide by 0");
        setShowMessage(true);
        setEquation("");
        setEquality(false);
        setInputValue("0");
      } else {
        setInputValue(finalAnswer);
      }
    }
  }, [
    equality,
    equation,
    setInputValue,
    setEquality,
    setEquation,
    setMessage,
    setShowMessage,
  ]);

  return (
    <div className='grid grid-cols-4 grid-rows-5 gap-0.5 p-1'>
      <button
        className={`${btnClasses} signs`}
        id='clear'
        onClick={handleClear}
      >
        c
      </button>
      <button
        className={`${btnClasses} signs`}
        onClick={() => handleSigns("%")}
      >
        %
      </button>
      <button
        className={`${btnClasses} signs`}
        id='divide'
        onClick={() => handleSigns("/")}
      >
        <RiDivideFill className='mx-auto' />
      </button>
      <button
        className={`${btnClasses} signs`}
        id='multiply'
        onClick={() => handleSigns("*")}
      >
        x
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='seven'
        onClick={() => handleNumberClick("7")}
      >
        7
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='eight'
        onClick={() => handleNumberClick("8")}
      >
        8
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='nine'
        onClick={() => handleNumberClick("9")}
      >
        9
      </button>
      <button
        className={`${btnClasses} signs`}
        id='subtract'
        onClick={handleMinus}
      >
        -
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='four'
        onClick={() => handleNumberClick("4")}
      >
        4
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='five'
        onClick={() => handleNumberClick("5")}
      >
        5
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='six'
        onClick={() => handleNumberClick("6")}
      >
        6
      </button>
      <button
        className={`${btnClasses} signs`}
        id='add'
        onClick={() => handleSigns("+")}
      >
        +
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='one'
        onClick={() => handleNumberClick("1")}
      >
        1
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='two'
        onClick={() => handleNumberClick("2")}
      >
        2
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='three'
        onClick={() => handleNumberClick("3")}
      >
        3
      </button>
      <button
        className={`${btnClasses} equal row-span-2`}
        id='equals'
        onClick={handleEqual}
      >
        =
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='zero'
        onClick={() => handleNumberClick("0")}
      >
        0
      </button>
      <button
        className={`${btnClasses} numbers`}
        id='decimal'
        onClick={handleDecimalPoint}
      >
        .
      </button>
      <button className={`${btnClasses} numbers`} onClick={handleDelete}>
        <FiDelete className='mx-auto' />
      </button>
    </div>
  );
};

export default ButtonsContainer;

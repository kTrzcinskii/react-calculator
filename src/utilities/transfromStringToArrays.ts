export const transformEquation = (equation: string) => {
  let numbers: number[] = [];
  let signs: string[] = [];

  equation = equation.replaceAll("%", "*0.01*");

  const myNumberReg =
    /-*\d{1}\.{1}\d+e+[+-]+\d+|[+-/*]*-*\d+\.{1}\d+|[+-/*]*-*\d+/g;

  const foundNumbers = equation.match(myNumberReg);

  const myNumbers = foundNumbers!.map((number, index) => {
    let final;
    if (index !== 0) {
      final = number.slice(1);
    } else {
      final = number;
    }
    return final;
  });

  myNumbers.forEach((number) => {
    equation = equation.replace(number.toString(), "");
  });

  const myFinalNumbers = myNumbers.map((number) => +number);

  const mySigns = equation.split("");

  numbers = myFinalNumbers;
  signs = mySigns;
  return { numbers, signs };
};

export const calculate = (nums: number[], signs: string[]) => {
  while (nums.length > 1) {
    if (signs.indexOf("*") !== -1 && signs.indexOf("/") !== -1) {
      let multiplyIndex = signs.indexOf("*");
      let divideIndex = signs.indexOf("/");
      let finalIndex;
      let finalSign;
      let finalNumber;
      if (multiplyIndex < divideIndex) {
        finalIndex = multiplyIndex;
        finalSign = signs[multiplyIndex];
      } else {
        finalIndex = divideIndex;
        finalSign = signs[divideIndex];
      }
      if (finalSign === "*") {
        finalNumber = nums[finalIndex] * nums[finalIndex + 1];
      } else {
        finalNumber = nums[finalIndex] / nums[finalIndex + 1];
      }
      signs.splice(finalIndex, 1);
      nums.splice(finalIndex + 1, 1);
      nums[finalIndex] = finalNumber;
    }

    if (signs.indexOf("*") !== -1 && signs.indexOf("/") === -1) {
      let finalIndex = signs.indexOf("*");
      let finalNumber = nums[finalIndex] * nums[finalIndex + 1];
      signs.splice(finalIndex, 1);
      nums.splice(finalIndex + 1, 1);
      nums[finalIndex] = finalNumber;
    }

    if (signs.indexOf("*") === -1 && signs.indexOf("/") !== -1) {
      let finalIndex = signs.indexOf("/");
      let finalNumber = nums[finalIndex] / nums[finalIndex + 1];
      signs.splice(finalIndex, 1);
      nums.splice(finalIndex + 1, 1);
      nums[finalIndex] = finalNumber;
    }

    if (signs.indexOf("*") === -1 && signs.indexOf("/") === -1) {
      if (signs.indexOf("+") !== -1 && signs.indexOf("-") !== -1) {
        let addIndex = signs.indexOf("+");
        let subtractIndex = signs.indexOf("-");
        let finalIndex;
        let finalSign;
        let finalNumber;
        if (addIndex < subtractIndex) {
          finalIndex = addIndex;
          finalSign = signs[addIndex];
        } else {
          finalIndex = subtractIndex;
          finalSign = signs[subtractIndex];
        }
        if (finalSign === "+") {
          finalNumber = nums[finalIndex] + nums[finalIndex + 1];
        } else {
          finalNumber = nums[finalIndex] - nums[finalIndex + 1];
        }
        signs.splice(finalIndex, 1);
        nums.splice(finalIndex + 1, 1);
        nums[finalIndex] = finalNumber;
      }

      if (signs.indexOf("+") !== -1 && signs.indexOf("-") === -1) {
        let finalIndex = signs.indexOf("+");
        let finalNumber = nums[finalIndex] + nums[finalIndex + 1];
        signs.splice(finalIndex, 1);
        nums.splice(finalIndex + 1, 1);
        nums[finalIndex] = finalNumber;
      }

      if (signs.indexOf("+") === -1 && signs.indexOf("-") !== -1) {
        let finalIndex = signs.indexOf("-");
        let finalNumber = nums[finalIndex] - nums[finalIndex + 1];
        signs.splice(finalIndex, 1);
        nums.splice(finalIndex + 1, 1);
        nums[finalIndex] = finalNumber;
      }
    }
  }
  let myNum = (Math.round(nums[0] * 100000000) / 100000000).toString();

  if (myNum[0] === "-" && myNum.length > 15) {
    myNum = nums[0].toExponential(10);
  } else if (myNum.length > 16) {
    myNum = nums[0].toExponential(11);
  }

  return myNum;
};

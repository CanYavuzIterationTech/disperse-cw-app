import { formatEther } from "@ethersproject/units";

export const formatToken = (balance: string) => {
  const formattedBalance = formatEther(balance);
  // if formatted balance is bigger than 1 we will only return last 2 digits after the dot.
  // Else we will return last 5 digits after the dot.

  //Convert it to number
  const balanceNumber = Number(formattedBalance);
  //Check if it is bigger than 1
  if (balanceNumber > 1) {
    //Return last 2 digits after the dot
    const toReturn = balanceNumber.toFixed(2);
    return toReturn.toString();
  }
  //Return last 5 digits
  const toReturn = balanceNumber.toFixed(5);
  return toReturn.toString();
};


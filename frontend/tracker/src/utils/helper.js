import moment from "moment";

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getCredentials = (fullname) => {
  const nameArray = fullname.split(" ");
  const firstname = nameArray[0];
  const firstchar = firstname.split("")[0];
  const lastname = nameArray[1];
  const lastchar = lastname.split("")[0];
  return firstchar + lastchar;
};

export const prepareBarChartData = (data) => {
  const dataArr = data.map((it) => ({
    category: it?.category ? it.category : it.source,
    amount: it?.amount,
  }));
  return dataArr;
};

export const prepareIncomeBarChartData = (data) => {
  const dataArr = data.map((it) => ({
    month:moment(it.date).format("Do MMM YYYY"),
    category: it?.category ? it.category : it.source,
    amount: it?.amount,
  }));
  return dataArr;
};

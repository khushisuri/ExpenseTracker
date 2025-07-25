export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getCredentials =  (fullname) => {
  const nameArray = fullname.split(" ");
  const firstname = nameArray[0];
  const firstchar = firstname.split("")[0]
  const lastname = nameArray[1];
  const lastchar = lastname.split("")[0]
  console.log(firstname,lastname)
  return firstchar + lastchar
}
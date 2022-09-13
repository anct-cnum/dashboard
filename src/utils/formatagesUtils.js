export const valideInputEmail = email => {
  const regexValidEmail = new RegExp(
    /^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,3}$/
  );
  
  return regexValidEmail.test(email);
};

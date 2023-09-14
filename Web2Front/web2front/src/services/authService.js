export const userLogin = async (korisnickoIme, lozinka) => {
    return fetch(process.env.REACT_APP_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        korisnickoIme,
        lozinka,
      }),
    });
  };
  
  export const userRegister = async (formData) => {
    console.log(process.env.REACT_APP_REGISTER_ENDPOINT);
    return fetch(`${process.env.REACT_APP_REGISTER_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
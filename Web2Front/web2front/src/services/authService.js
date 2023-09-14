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
    console.log(process.env);
    console.log(formData)
    console.log("IDE OVDE JEBIGA");
    console.log(process.env.REACT_APP_REGISTER_ENDPOINT);
    console.log("IDE OVDE JEBIGA");
    return fetch(`${process.env.REACT_APP_REGISTER_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
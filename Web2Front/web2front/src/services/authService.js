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

    return fetch(`${process.env.REACT_APP_REGISTER_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
 
  export const userLoginGoogle = async (formData) => {
    return fetch(process.env.REACT_APP_REGISTER_GOOGLE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  export const userChangePass = async (token, formData) => {
    return fetch(process.env.REACT_APP_PASS_UPDATE_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(formData),
    });
  };
  export const Users = async (token) => {
    return fetch(process.env.REACT_APP_PROFILE_ENDPOINT, {
        headers: {
            Token: token,
        },
    });
  };
  

  export const getAllSellers = async (token) => {
    return fetch(process.env.REACT_APP_All_SELLERS_ENDPOINT, {
        headers: {
            Token: token,
        },
    });
  };
  
  export const usersVerify = async (selectedUser, status, headers) => {
    return fetch(
      `${process.env.REACT_APP_USERS_VERIFY}${selectedUser.kIme}?status=${status}`,
      {
        method: "POST",
        headers: headers,
      }
    );
  };

  export const usersUpdate = async (token, formData) => {
    return fetch(process.env.REACT_APP_PROFILE_UPDATE_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(formData),
    });
  };
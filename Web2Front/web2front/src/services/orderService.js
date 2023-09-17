export const ordersSellers = async (token) => {
    return fetch(process.env.REACT_APP_USERS_ORDERS_ENDPOINT, {
      headers: {
        Token: token,
      },
    });
  };
  
  export const sellersOldOrders = async (token) => {
    return fetch(process.env.REACT_APP_OLD_USERS_ORDERS_ENDPOINT, {
      headers: {
        Token: token,
      },
    });
  };

  export const apiOrders = async (token) => {
    return fetch(process.env.REACT_APP_ORDERS_ENDPOINT, {
      headers: {
        Token: token,
      },
    });
  };

  export const postOrders = async (token, orderData) => {
    return fetch(process.env.REACT_APP_ORDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(orderData),
    });
  };


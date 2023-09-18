  export const apiArticleId = async (articleId, token) => {
    return fetch(`${process.env.REACT_APP_ARTICLES_ENDPOINT}/${articleId}`, {
      headers: {
        Token: token,
      },
    });
  };

  export const apiArticle = async (token) => {
    console.log(token)
    return fetch(process.env.REACT_APP_ARTICLES_ENDPOINT, {
      headers: {
        Token: token,
      },
    });
  };

  export const postProduct = async (token, formData) => {
    return fetch(process.env.REACT_APP_ARTICLES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(formData),
    });
  };

  export const articleUpdate = async (token, articleData) => {
    return fetch(process.env.REACT_APP_UPDATE_ARTICLE_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(articleData),
    });
  };

  export const deleteArticle = async (articleId, token) => {
    return fetch(`${process.env.REACT_APP_DELETE_ARTICLE_ENDPOINT}${articleId}`, {
      method: "DELETE",
      headers: {
        Token: token,
      },
    });
  };

  
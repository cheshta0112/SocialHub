import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils';

//created func with 2 arguments - url,object 
const customFetch = async (url, { body, ...customConfig }) => {     //destructuring body and rest of the keys are called ..coustom config
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);   //getting token from the local storage

  const headers = {         //defining headers
    'content-type': 'application/json',
    Accept: 'application/json',  // we are sending and receiving data in json
  };

  if (token) {   //if token exists we are adding it to the  authorization header as some api requires token 
    headers.Authorization = `Bearer ${token}`;
  }


//create config to pass into fetch 
  const config = {
    ...customConfig,
    headers: {
      ...headers,       //default headers
      ...customConfig.headers,       //headers we get from the coustomconfig objects
    },
  };

  if (body) {    //body is object
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);   //api call
    const data = await response.json();  

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};


import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

//created func with 2 arguments - url,object
const customFetch = async (url, { body, ...customConfig }) => {
  //destructuring body and rest of the keys are called ..coustom config
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY); //getting token from the local storage

  const headers = {
    //defining headers
    //'content-type': 'application/json',
    //Accept: 'application/json',  // we are sending and receiving data in json
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    //if token exists we are adding it to the  authorization header as some api requires token
    headers.Authorization = `Bearer ${token}`;
  }

  //create config to pass into fetch
  const config = {
    ...customConfig,
    headers: {
      ...headers, //default headers
      ...customConfig.headers, //headers we get from the coustomconfig objects
    },
  };

  if (body) {
    //if body is object we need to convert it into string
    //config.body = JSON.stringify(body);   //after converting , add it into the body object
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config); //api call
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

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};
export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

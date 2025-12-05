const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

export { getItems };

const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export { addItem };

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return checkResponse(res);
  });
};

export { deleteItem };

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => {
    return checkResponse(res);
  });
};

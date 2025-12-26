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

const addItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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

const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
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

// Add a like to an item
export const addCardLike = (_id, token) => {
  console.log("Item ID being liked:", _id);
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`, // ← JWT required!
    },
  })
    .then(checkResponse)
    .then((json) => json.data);
};

// Remove a like from an item
export const removeCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`, // ← JWT required!
    },
  })
    .then(checkResponse)
    .then((json) => json.data);
};

export const getLocal = (id) => {
  return localStorage.getItem(id);
};

export const setLocal = (id, value) => {
  localStorage.setItem(id, value);
};

export const removeLocal = (id) => {
  localStorage.removeItem(id);
};

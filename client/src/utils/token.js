export const validateToken = () => {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    let exp = localStorage.getItem("exp");

    if (!exp || exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("token");
      localStorage.removeItem("exp");
      return false;
    }

    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
  } catch (error) {
    console.error(error.message);
  }
};

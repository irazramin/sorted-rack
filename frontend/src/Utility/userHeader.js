export const userHeader = () => {
  return `Bearer ${
    localStorage.userDetails && JSON.parse(localStorage.userDetails).token
  }`;
};

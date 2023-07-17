// setting date expiration for cookies
const current = new Date();
current.setDate(current.getDate() + 7);
export const expireCookie=current.toUTCString();
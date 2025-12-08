import Cookies from "js-cookie";

export const cookieStorage = {
  getItem: (name: string) => Cookies.get(name) || null,
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 7, path: "/" });
  },
  removeItem: (name: string) => Cookies.remove(name),
};

import {jwtDecode} from "jwt-decode";

function saveToken(token: string): void {
  localStorage.setItem("authToken", token);
}

function getToken<T>(): T | null {
  try {
    const token = localStorage.getItem("authToken");
    return token ? jwtDecode<T>(token) : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

function destroyToken(): void {
  localStorage.removeItem("authToken");
}

export { saveToken, destroyToken, getToken };

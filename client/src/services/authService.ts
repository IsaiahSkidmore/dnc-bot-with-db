import { JwtPayload, jwtDecode } from "jwt-decode";


declare module "jwt-decode" {
  export interface JwtPayload {
    id: number;
    email: string;
  }
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
//   private accessToken: string | null = null;
//   private tokenExpirationTime: number | null = null;

  /**
   * Handles user registration by sending a POST request to the /api/register endpoint.
   * @param {UserData} userData - An object containing the user's registration information.
   * @returns {Promise<{ token: string; message?: string }>} A promise that resolves to the response object containing
   * the JWT token and possibly user profile information if the registration is successful.
   * @throws {Error} An error if registration fails, with a message indicating the reason for the failure.
   */
  async register(
    userData: UserData,
  ): Promise<{ token: string; message?: string }> {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    this.setToken(result.token); // Store the JWT token in local storage
    return result; // Return the result for further use
  }

  /**
   * Handles user login by sending a POST request to the /api/login endpoint.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<string>} A promise that resolves to a string token if the login is successful.
   * @throws {Error} An error if login fails.
   **/
  async login(email: string, password: string): Promise<string> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    this.setToken(result.token); // Store the token in local storage
    return result.token; // Return the token for further use
  }

  // New method to set the token
  setToken(token: string) {
    localStorage.setItem("jwtToken", token); // Store the token in local storage
  }

  // New method to handle logout
  logout() {
    localStorage.removeItem("jwtToken"); // Clear the token from local storage
  }

  getProfile(): JwtPayload | null {
    const token = this.getToken(); // Get the token
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decode the token to get user profile
    }
    return null; // Return null if no token
  }

  loggedIn(): boolean {
    const token = this.getToken(); // Check if the user is logged in
    return !!token && !this.isTokenExpired(token); // Return true if the token is valid
  }

  isTokenExpired(token: string): boolean {
    if (!token || token.split(".").length !== 3) {
      console.log("Invalid token format");
      return true; // Return true if token format is invalid
    }

    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // Decode the token
      let expirationTime = 0;

      if (decoded.exp) {
        expirationTime = decoded.exp * 1000; // Convert expiration time to milliseconds
      }
      return Date.now() >= expirationTime; // Check if the token is expired
    } catch (err) {
      console.log(err);
      return true; // Return true if an error occurs
    }
  }

  getToken(): string | null {
    return localStorage.getItem("jwtToken") || null; // Return the token from local storage
  }}

export default new AuthService();

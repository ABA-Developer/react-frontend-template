interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  session_token: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

const sessionToken: string | null = null;

import fetchWrapper from "./fetchWrapper";

// auth api
export const postLogin = (body: LoginRequest): Promise<LoginResponse> =>
  fetchWrapper("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const postLogout = (): Promise<void> => {
  if (!sessionToken) throw new Error("No session token found.");
  return fetchWrapper("/api/auth/logout", {
    method: "POST",
    body: JSON.stringify({ session_token: sessionToken }),
  });
};

export const postRefreshToken = (): Promise<LoginResponse> => {
  if (!sessionToken) throw new Error("No session token found.");
  return fetchWrapper("/api/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ session_token: sessionToken }),
  });
};

// user api
export const getUserProfile = (): Promise<UserProfile> =>
  fetchWrapper("/api/user/profile", {
    method: "GET",
  });

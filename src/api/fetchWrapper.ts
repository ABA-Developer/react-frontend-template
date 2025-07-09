const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const accessToken: string | null = null;

const fetchWrapper = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error ${response.status}: ${errorBody}`);
  }

  if (response.status === 204) return {} as T; // No content
  return await response.json();
};

export default fetchWrapper;

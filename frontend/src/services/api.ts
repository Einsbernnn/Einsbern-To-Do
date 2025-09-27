export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function fetchHello(): Promise<string> {
  const res = await fetch(`${API_URL}/api/hello`);
  return res.text();
}
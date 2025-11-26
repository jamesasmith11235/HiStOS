export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiGet(path: string) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    cache: "no-store"
  });

  if (!res.ok) {
    console.error("API GET failed", { url, status: res.status, statusText: res.statusText });
    throw new Error(`API GET ${url} failed with ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function apiPost(path: string, data: any) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.error("API POST failed", { url, status: res.status, statusText: res.statusText });
    throw new Error(`API POST ${url} failed with ${res.status} ${res.statusText}`);
  }

  return res.json();
}

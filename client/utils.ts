import { createResource } from "solid-js";

export function useServer<T>(
  apiRoute: string,
  options?: { method: "GET" | "POST"; body?: any },
) {
  const fetcher = async (
    route: string,
    opts?: { method: "GET" | "POST"; body?: any },
  ): Promise<T> => {
    const response = await fetch(route, {
      method: opts?.method || "GET",
      headers: { "Content-Type": "application/json" },
      body: opts?.method === "POST" ? JSON.stringify(opts.body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  };

  return createResource<T>(async () => fetcher(apiRoute, options));
}

/**
 * API utility for constructing endpoints.
 *
 * Behavior:
 * - If `VITE_CODESPACE_NAME` is set, constructs
 *   https://${VITE_CODESPACE_NAME}-8000.app.github.dev
 * - Otherwise falls back to http://localhost:8000 so URLs won't contain `undefined`.
 *
 * Note: Define `VITE_CODESPACE_NAME` in .env.local when running in Codespaces.
 */

const getApiBase = (): string => {
  const codespaceName = String(import.meta.env.VITE_CODESPACE_NAME || '').trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  // Safe local fallback to avoid malformed URLs like https://undefined-8000...
  return 'http://localhost:8000';
};

export const getApiUrl = (endpoint: string): string => {
  const base = getApiBase();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}/api${path}`;
};

/**
 * Parse API responses and return an array of items.
 * Supports multiple common shapes:
 * - T[]
 * - { results: T[], next, previous }
 * - { data: T[], pagination }
 * - { items: T[] }
 */
export const parseResponse = <T>(response: any): T[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response as T[];
  if (Array.isArray(response.results)) return response.results as T[];
  if (Array.isArray(response.data)) return response.data as T[];
  if (Array.isArray(response.items)) return response.items as T[];

  // Some backends wrap data under a single key matching the resource name.
  // As a last resort, look for the first array-valued property.
  for (const key of Object.keys(response)) {
    if (Array.isArray(response[key])) return response[key] as T[];
  }

  return [];
};

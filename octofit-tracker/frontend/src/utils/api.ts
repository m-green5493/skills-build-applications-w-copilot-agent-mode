/**
 * API utility for constructing endpoints.
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 */

const getApiBase = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.error(
      'VITE_CODESPACE_NAME environment variable is not set. ' +
      'Please define it in .env.local (e.g., VITE_CODESPACE_NAME=your-codespace-name)'
    );
  }
  
  const name = codespaceName || 'localhost:8000';
  const protocol = codespaceName ? 'https' : 'http';
  const baseUrl = `${protocol}://${name}-8000.app.github.dev`;
  
  return baseUrl;
};

export const getApiUrl = (endpoint: string): string => {
  const base = getApiBase();
  return `${base}/api${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

/**
 * Parse paginated or array responses
 * Handles both { data: T[], pagination: {...} } and T[] formats
 */
export const parseResponse = <T>(
  response: any
): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};

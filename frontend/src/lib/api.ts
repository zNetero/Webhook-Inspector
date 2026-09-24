/** URL base da API (sem barra final). */
export function getApiUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined;
  if (fromEnv?.trim()) {
    return fromEnv.replace(/\/$/, '');
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:3333';
  }
  return window.location.origin;
}

export function getWebhookCaptureUrl(userId: string, path = ''): string {
  const base = getApiUrl();
  const suffix = path && path !== '/' ? path.replace(/^\//, '') : '';
  return suffix ? `${base}/h/${userId}/${suffix}` : `${base}/h/${userId}`;
}

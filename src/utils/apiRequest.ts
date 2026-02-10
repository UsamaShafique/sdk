import { API_BASE_URL } from '../config/api.js';

interface ApiRequestOptions {
    method?: 'GET' | 'POST';
    body?: Record<string, unknown>;
    authToken?: string;
}

export async function apiRequest<T>(
    path: string,
    options: ApiRequestOptions = {}
): Promise<T> {
    const { method = 'GET', body, authToken } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let message: string;
        try {
            const errorBody = await res.json();
            message = errorBody.message ?? `Request failed with status ${res.status}`;
        } catch {
            message = `Request failed with status ${res.status}`;
        }
        throw new Error(message);
    }

    return res.json() as Promise<T>;
}

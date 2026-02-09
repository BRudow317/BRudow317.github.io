/**
 * API functions for user authentication and profile management.
 *
 * @exports registerUser, loginUser, getProfile, requestPasswordReset, confirmPasswordReset
 * @description This module provides functions to interact with the backend API for user registration, login, profile retrieval, and password reset.
 * @see https://your-api.example.com/docs for API documentation.
 */
const API_BASE = "https://your-api.example.com";
const API_KEY = "site_a_key_abc123";

type LoginResponse = { 
  token: string;
  user: { user_id: string; email: string; name: string };
};

export async function registerUser(email: string, password: string, name = "") {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = (await res.json()) as LoginResponse;
  return data;
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_BASE}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE}/auth/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function confirmPasswordReset(token: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/auth/password-reset/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
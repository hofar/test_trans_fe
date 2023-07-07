// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Ganti dengan URL API yang sesuai

let authToken = ''; // Menyimpan token otorisasi

// Fungsi untuk mengatur token otorisasi setelah login
export const setAuthToken = (token) => {
  authToken = token;
};

// Fungsi untuk membuat akun
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk mendapatkan profil pengguna
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk mendapatkan daftar transaksi
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk membuat transaksi
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk memperbarui transaksi
export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/${transactionId}`, transactionData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fungsi untuk menghapus transaksi
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`${API_URL}/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

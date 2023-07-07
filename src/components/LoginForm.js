import React, { useState } from 'react';
import { login, setAuthToken } from '../services/api';

const LoginForm = ({ fetchProfileData, fetchTransactionData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = {
                username,
                password
            };

            const response = await login(credentials);
            const token = response.token;
            // Menyimpan token otorisasi setelah login berhasil
            setAuthToken(token);

            // Simpan token ke dalam localStorage atau sessionStorage
            localStorage.setItem('token', token);
            // atau sessionStorage.setItem('token', token);

            // Pembaruan data profil dan daftar transaksi setelah login berhasil
            await fetchProfileData();
            await fetchTransactionData();

            console.log(response); // Tampilkan respons dari API ke konsol atau lakukan aksi lainnya

            // Reset form setelah berhasil login
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error: tampilkan pesan error ke pengguna
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn mt-4 btn-primary">Log In</button>
        </form>
    );
};

export default LoginForm;

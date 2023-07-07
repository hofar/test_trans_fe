import React, { useState } from 'react';
import { signup } from '../services/api';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                username,
                password,
                name,
                email,
                gender
            };

            const response = await signup(userData);

            console.log(response); // Tampilkan respons dari API ke konsol atau lakukan aksi lainnya

            // Reset form setelah berhasil mendaftar
            setUsername('');
            setPassword('');
            setName('');
            setEmail('');
            setGender('');
        } catch (error) {
            console.error('Error signing up:', error);
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
            <div>
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label className="form-label">Gender</label>
                <select value={gender} className="form-control" onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit" className="btn mt-4 btn-primary">Sign Up</button>
        </form>
    );
};

export default SignupForm;

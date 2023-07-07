import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response);
            } catch (error) {
                console.error('Error fetching profile:', error);
                // Handle error: tampilkan pesan error ke pengguna
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Gender: {profile.gender}</p>
        </div>
    );
};

export default Profile;

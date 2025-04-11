import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.users.getById(user.id);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    } else {
      navigate('/login');
    }
  }, [user, navigate, logout]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {userDetails?.name}</h1>
      <div className="user-info">
        <p><strong>Email:</strong> {userDetails?.email}</p>
        <p><strong>Member since:</strong> {new Date(userDetails?.lastUpdated).toLocaleDateString()}</p>
      </div>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
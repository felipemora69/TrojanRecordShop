import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Redirect to login if no token is found
      navigate('/login');
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setUser(data); // Store fetched user data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Call fetchProfile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Render loading state, error, or the profile data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{`Error: ${error}`}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Start your collection with us</p>
        </div>

        <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl mb-4">Hi, Collector</h2>
          <div className="space-y-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          {/* Add a button to navigate to the records page */}
          <div className="mt-4">
            <button 
              onClick={() => navigate('/records')} 
              className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all hover:bg-primary/90"
            >
              Start Your Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
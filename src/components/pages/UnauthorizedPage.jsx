// UnauthorizedPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/Console/Content_ACT/AutoRun'); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [navigate]);

  return (
    <div>
      <p>You do not have permission to access this page.</p>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default UnauthorizedPage;

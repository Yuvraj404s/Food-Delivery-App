import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to the Restaurant</Title>
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button onClick={() => navigate('/signup')}>Signup</Button>
      <OAuthButton href="http://localhost:5000/auth/google">Login with Google</OAuthButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const OAuthButton = styled.a`
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  border-radius: 5px;
  text-decoration: none;
`;

export default WelcomePage;

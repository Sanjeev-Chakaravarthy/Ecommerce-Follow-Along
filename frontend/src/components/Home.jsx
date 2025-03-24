import React from 'react';
import styled from 'styled-components';
import CardContainer from './CardContainer';

const Home = () => {
  return (
    <StyledHome>
      <h1>Welcome to e-finix</h1>
      <CardContainer />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.div`
  padding: 20px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--primary-color);
  }
`;
import React from 'react';
import styled from 'styled-components';
import Card from './Card'

const products = [
  {
    image: 'https://m.media-amazon.com/images/I/614aiM56siL._SL1500_.jpg',
    title: 'Product 1',
    description: 'Description of the product and it is not sure now',
    price: 400,
  },
  {
    image: 'https://m.media-amazon.com/images/I/614aiM56siL._SL1500_.jpg',
    title: 'Product 2',
    description: 'Description of the product and it is not sure now',
    price: 300,
  },
  // Add more products as needed
];

const CardContainer = () => {
  return (
    <StyledCardContainer>
      {products.map((product, index) => (
        <Card
          key={index}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </StyledCardContainer>
  );
};

export default CardContainer;

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = ({ image, title, description, price }) => {
  return (
    <StyledCard>
      <img src={image} alt={title} className="cover" />
      <h1 className="title">{title}</h1>
      <p className="desc">{description}</p>
      <p className="price">${price}</p>
      <button className="primary btn">Buy Now</button>
    </StyledCard>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const StyledCard = styled.div`
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background-color: var(--secondary-color);
  text-align: center;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 15px 0;
    color: var(--font-color);
  }

  .desc {
    font-size: 1rem;
    color: var(--font-color);
    opacity: 0.8;
    margin: 10px 20px;
  }

  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 10px 0;
  }

  .primary.btn {
    background-color: var(--primary-color);
    color: var(--background-color);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px 0;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--hover-color);
    }
  }
`;

export default Card;
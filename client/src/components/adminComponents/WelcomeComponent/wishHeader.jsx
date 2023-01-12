import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const Text = styled.h1`
  font-size: 16px;
  span {
    font-weight: 700;
    color: #484258;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-top: 1rem;
  }
`;

function WishHeader() {
  const [wish, setwish] = useState('');

  const greeting = () => {
    const { hour } = Date.now();
    if (hour < 12) {
      setwish('Morning');
    }
    if (hour < 17) {
      setwish('Afternoon');
    }
    setwish('Evening');
  };

  useEffect(() => {
    greeting();
  }, []);

  return (
    <NavbarContainer>
      <Text>
        Good
        {' '}
        {wish}
        ,
        <span> Admin</span>
      </Text>
    </NavbarContainer>
  );
}

export default WishHeader;

import React from 'react';
import styled from 'styled-components';

function WishHeader() {
  return (
    <NavbarContainer>
      <Text>
        Good morning,
        <span> Admin</span>
      </Text>
    </NavbarContainer>
  );
}

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
font-size:16px;
  span {
    font-weight: 700;
    color: #484258;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-top: 1rem;
  }
`;

export default WishHeader;

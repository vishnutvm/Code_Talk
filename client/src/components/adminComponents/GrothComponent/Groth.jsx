/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoStatsChart } from 'react-icons/io5';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { hoverEffect, themeColor } from '../../../adminTheme';
import { changePage } from '../../../redux/adminState';

const GrothCard = styled.div`
  height: 100%;
  width: 15rem;
  background-color: ${themeColor};
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1190px) {
    width: 80%;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 5rem;
    width: 6rem;
  }
`;

const GrothText = styled.h3`
  text-align: center;
  font-weight: normal;
  padding: 0.4rem 0;
`;

const TotalUsers = styled.h2`
  text-align: center;
`;

const UsersIncrease = styled.h5`
  text-align: center;
  font-weight: normal;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 2rem;
`;

function Groth({ users, today }) {
  const dispatch = useDispatch();
  return (
    <GrothCard onClick={() => dispatch(changePage('report'))}>
      <CardContent>
        <Box>
          <Chart>
            <IoStatsChart />
          </Chart>

          <GrothText>Users</GrothText>
        </Box>

        <TotalUsers>{users && users.length}</TotalUsers>
        <UsersIncrease>
          +
          {' '}
          {today && today.length}
          {' '}
          Joined Today
        </UsersIncrease>
      </CardContent>
    </GrothCard>
  );
}

export default Groth;

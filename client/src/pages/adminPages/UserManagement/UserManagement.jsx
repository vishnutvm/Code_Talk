/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';

const headers = {
  'Content-Type': 'application/json',
};
const Container = styled.div`
  width: 75%;
  heigth: 80vh;
  display: flex;
  align-items: top;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 6% 2rem 2rem 2rem;
  padding: 1rem;
  overflow: scroll;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 90%;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
`;

function UserManagement() {
  const [usersList, setusersList] = useState([]);
  const getUsers = async () => {
    const response = await fetch(`${baseUrl}/admin/getallusers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!data.message) {
      setusersList(data);
    }
  };

  const blockUser = (userId) => {
    console.log(userId);
    axios({
      method: 'PATCH',
      url: `/admin/blockUser/${userId}`,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // updateing the users  state
        setusersList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('usereffect is calling');
    getUsers();
  }, []);
  return (
    <>
      {/* component */}
      <Container>
        {/* This is an example component */}
        <div className=" mx-auto min-w-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList
                  && usersList.map((user) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {user.username}
                        </th>
                      </td>

                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.location ? user.location : 'No Record'}
                      </td>
                      <td className="px-6 py-4">
                        {user.phone ? user.phone : 'No Record'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.blocked ? (
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => blockUser(user._id)}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => blockUser(user._id)}
                          >
                            Block
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default UserManagement;

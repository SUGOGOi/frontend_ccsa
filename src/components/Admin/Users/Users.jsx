import {
  Grid,
  Box,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Button,
  Td,
  Tbody,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { changeRoleUser, deleteUser, getAllUsers } from '../../../redux/action/adminAction';

const Users = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
    message,
  } = useSelector(state => state.admin);

  const updateHandler = userId => {
    
    dispatch(changeRoleUser(userId))
  };

  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId))
    
  };

  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <Grid
      css={{ cursor: `url(${cursor}), default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box padding={['0', '16']} overflow="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available users in database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(item => (
                <Row
                  deleteButtonHandler={deleteButtonHandler}
                  updateHandler={updateHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler ,loading}) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription ? (
          item.subscription.status === 'active' ? (
            'Active'
          ) : (
            'Not Active'
          )
        ) : (
          <>{'Not Active'}</>
        )}
      </Td>
      <Td isNumeric>
        <Button
          varient={'outline'}
          color={'purple.500'}
          onClick={() => updateHandler(item._id)}
          isLoading={loading}
        >
          Change Role
        </Button>
        <Button color={'red'} onClick={() => deleteButtonHandler(item._id)} isLoading={loading} >
          <RiDeleteBin7Fill />{' '}
        </Button>
      </Td>
    </Tr>
  );
}

import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TokenContext from '../context/TokenContext';
import { Box, Typography } from '@mui/material';

const UserProfile: React.FC = () => {
  const auth = useContext(AuthContext);
  const tokenContext = useContext(TokenContext);

  if (!auth || !tokenContext || !auth.user) return null;

  const balance = tokenContext.getUserBalance(auth.user.username);
  const penaltyPoolBalance = tokenContext.getUserBalance('penalty_pool');

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">User Profile</Typography>
      <Typography>Username: {auth.user.username}</Typography>
      <Typography>Balance: {balance} tokens</Typography>
      <Typography>Penalty Pool Balance: {penaltyPoolBalance} tokens</Typography>
    </Box>
  );
};

export default UserProfile;

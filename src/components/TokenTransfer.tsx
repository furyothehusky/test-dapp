import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AuthContext from '../context/AuthContext';
import TokenContext from '../context/TokenContext';

const TokenTransferForm: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const auth = useContext(AuthContext);
  const tokenContext = useContext(TokenContext);

  if (!auth || !tokenContext || !auth.user) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (auth.user) {
      tokenContext.suggestTransfer({ sender: auth.user.username, recipient, amount });
      setRecipient('');
      setAmount(0);
    }
  };

  const availableRecipients = [
    ...tokenContext.users.filter(user => user.username !== (auth.user?.username || '')),
    { username: 'penalty_pool' }
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography component="h2" variant="h6">
        Suggest Token Transfer
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Recipient</InputLabel>
        <Select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          label="Recipient"
        >
          {availableRecipients.map(user => (
            <MenuItem key={user.username} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Suggest Transfer
      </Button>
    </Box>
  );
};

export default TokenTransferForm;

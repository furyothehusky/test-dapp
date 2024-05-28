import React, { useContext } from 'react';
import TokenContext from '../context/TokenContext';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const TransferRequestList: React.FC = () => {
    const tokenContext = useContext(TokenContext);

    if (!tokenContext) return null;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography component="h2" variant="h6">
                Transfer Requests
            </Typography>
            <List>
                {tokenContext.transfers.map((transfer) => (
                    <ListItem key={transfer.id}>
                        <ListItemText
                            primary={
                                `Sender: ${transfer.sender}, 
                                Recipient: ${transfer.recipient}, 
                                Amount: ${transfer.amount}, 
                                Status: ${transfer.status}`}
                        />
                        {transfer.status === 'pending' && (
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => tokenContext.approveTransfer(transfer.id)}
                                    sx={{ mr: 1 }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => tokenContext.rejectTransfer(transfer.id)}
                                >
                                    Reject
                                </Button>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TransferRequestList;
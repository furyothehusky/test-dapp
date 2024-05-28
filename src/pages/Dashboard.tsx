import React, { useContext } from 'react';
import { Container, Grid, Card, CardContent } from '@mui/material';
import TokenTransferForm from '../components/TokenTransfer';
import TransferRequestList from '../components/TransferRequestList';
import UserProfile from '../components/UserProfile';
import AuthContext from '../context/AuthContext';
import TokenContext from '../context/TokenContext';

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const tokenContext = useContext(TokenContext);

  if (!auth || !tokenContext || !auth.user) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <TokenTransferForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <TransferRequestList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

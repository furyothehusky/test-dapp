import { createContext, useState, ReactNode, useCallback } from 'react';

interface TokenTransfer {
  id: number;
  sender: string;
  recipient: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface User {
  username: string;
  balance: number;
}

interface TokenContextType {
  users: User[];
  transfers: TokenTransfer[];
  suggestTransfer: (transfer: Omit<TokenTransfer, 'id' | 'status'>) => void;
  approveTransfer: (id: number) => void;
  rejectTransfer: (id: number) => void;
  getUserBalance: (username: string) => number;
  getPendingTransfers: () => TokenTransfer[];
}

interface TokenProviderProps {
  children: ReactNode;
}

const initialUsers: User[] = [
  { username: 'user1', balance: 100 },
  { username: 'user2', balance: 100 },
  { username: 'user3', balance: 100 },
  { username: 'penalty_pool', balance: 0 }
];

const initialTransfers: TokenTransfer[] = [
  { id: 1, sender: 'user2', recipient: 'user3', amount: 10, status: 'pending' },
  { id: 2, sender: 'user3', recipient: 'user2', amount: 20, status: 'pending' },
  { id: 3, sender: 'user3', recipient: 'penalty_pool', amount: 5, status: 'pending' }
];

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [transfers, setTransfers] = useState<TokenTransfer[]>(initialTransfers);
  const [nextId, setNextId] = useState(4);

  const suggestTransfer = (transfer: Omit<TokenTransfer, 'id' | 'status'>) => {
    setTransfers((prevTransfers) => [
      ...prevTransfers,
      { ...transfer, id: nextId, status: 'pending' }
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const approveTransfer = useCallback((id: number) => {
    setTransfers((prevTransfers) =>
      prevTransfers.map((t) =>
        t.id === id ? { ...t, status: 'approved' } : t
      )
    );

    setUsers((prevUsers) => {
      const transfer = transfers.find((t) => t.id === id);
      if (transfer) {
        const sender = prevUsers.find((user) => user.username === transfer.sender);
        const recipient = prevUsers.find((user) => user.username === transfer.recipient);

        if (sender && recipient && sender.balance >= transfer.amount) {
          return prevUsers.map((user) => {
            if (user.username === transfer.sender) {
              return { ...user, balance: user.balance - transfer.amount };
            } else if (user.username === transfer.recipient) {
              return { ...user, balance: user.balance + transfer.amount };
            }
            return user;
          });
        }
      }
      return prevUsers;
    });
  }, [transfers]);

  const rejectTransfer = (id: number) => {
    setTransfers((prevTransfers) =>
      prevTransfers.map((transfer) =>
        transfer.id === id ? { ...transfer, status: 'rejected' } : transfer
      )
    );
  };

  const getUserBalance = (username: string): number => {
    const user = users.find((user) => user.username === username);
    return user ? user.balance : 0;
  };

  const getPendingTransfers = (): TokenTransfer[] => {
    return transfers.filter((transfer) => transfer.status === 'pending');
  };

  return (
    <TokenContext.Provider
      value={{
        users,
        transfers,
        suggestTransfer,
        approveTransfer,
        rejectTransfer,
        getUserBalance,
        getPendingTransfers,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
export type { TokenContextType, TokenTransfer, User };
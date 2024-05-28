
# Dapp - Penalty

## Description

Dapp - Penalty is a front-end application for managing community tokens using static data to simulate interactions with smart contracts. The application facilitates a penalty game where users can propose token transfers from one user to another, and the transfers can be approved or rejected by other users.

## Features

1. **User Authentication**: Users can log in with a username and password.
2. **Token Management Interface**: Community members can suggest token transfers from one user to another, approve or reject transfer requests, and view the status of transfer requests.
3. **Business Rules**:
   - Each user starts with an initial balance of 100 tokens.
   - Users can suggest token transfers.
   - Other members can approve or reject transfer requests.
   - The user's balance is updated according to approved transfers.

## Technologies Used

- React
- TypeScript
- Material UI
- Jest and React Testing Library for unit testing

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/furyothehusky/test-dapp.git
cd dapp-penalty
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running Tests

To run the unit tests:

```bash
npm test
# or
yarn test
```

This will execute the tests using Jest and React Testing Library.

## Directory Structure

```
src/
|-- components/
|   |-- Login.tsx
|   |-- TokenTransferForm.tsx
|   |-- UserProfile.tsx
|-- context/
|   |-- AuthContext.tsx
|   |-- TokenContext.tsx
|-- pages/
|   |-- Dashboard.tsx
|-- tests/
|   |-- Login.test.tsx
|   |-- TokenTransferForm.test.tsx
|-- App.tsx
|-- index.tsx
```


### Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running Tests

To run the unit tests:

```bash
npm test
# or
yarn test
```

This will execute the tests using Jest and React Testing Library.
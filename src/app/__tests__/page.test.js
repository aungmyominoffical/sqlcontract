import { render, screen } from '@testing-library/react';
import Home from '../page';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

// Mock the Solana wallet adapter hooks
jest.mock('@solana/wallet-adapter-react', () => ({
  useConnection: jest.fn(),
  useWallet: jest.fn()
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders wallet connect message when wallet is not connected', () => {
    useConnection.mockReturnValue({ connection: null });
    useWallet.mockReturnValue({ publicKey: null });

    render(<Home />);
    
    expect(screen.getByText('Please connect your wallet to view details')).toBeInTheDocument();
  });

  it('displays wallet information when wallet is connected', () => {
    const mockConnection = {
      getBalance: jest.fn().mockResolvedValue(1000000000), // 1 SOL in lamports
      onAccountChange: jest.fn()
    };

    // Create a proper PublicKey mock
    const mockPublicKey = new PublicKey('11111111111111111111111111111111');

    useConnection.mockReturnValue({ connection: mockConnection });
    useWallet.mockReturnValue({ publicKey: mockPublicKey });

    render(<Home />);

    expect(screen.getByText('Wallet Information')).toBeInTheDocument();
    expect(screen.getByText(/Network:/)).toBeInTheDocument();
    expect(screen.getByText(/Address:/)).toBeInTheDocument();
  });
});
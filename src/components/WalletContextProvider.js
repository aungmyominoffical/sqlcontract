'use client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';
import { useMemo } from 'react';

export default function WalletContextProvider({ children }) {
    const endpoint = useMemo(() => 'https://thrumming-wiser-dream.solana-mainnet.quiknode.pro/34af7f96ff19901ffac75b554aaac5252b3cb173', []);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
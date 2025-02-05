'use client';
import WalletContextProvider from '../components/WalletContextProvider';

export default function ClientWalletProvider({ children }) {
    return <WalletContextProvider>{children}</WalletContextProvider>;
}
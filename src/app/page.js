'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function Home() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (!connection || !publicKey) { return; }

        const getBalance = async () => {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        };

        connection.onAccountChange(publicKey, (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
        });

        getBalance();
    }, [connection, publicKey]);

    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ marginBottom: '20px' }}>Solana Wallet (Mainnet)</h1>
            <WalletMultiButton />
            {publicKey ? (
                <div style={{ 
                    marginTop: '20px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h2>Wallet Information</h2>
                    <div style={{ marginTop: '10px' }}>
                        <p><strong>Network:</strong> Mainnet</p>
                        <p><strong>Balance:</strong> {balance.toFixed(4)} SOL</p>
                        <p><strong>Address:</strong> {publicKey.toString()}</p>
                    </div>
                </div>
            ) : (
                <p style={{ marginTop: '20px' }}>Please connect your wallet to view details</p>
            )}
        </main>
    );
}
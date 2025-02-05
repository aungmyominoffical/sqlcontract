import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import ClientWalletProvider from './providers';

export const metadata = {
    title: 'Solana Wallet App',
    description: 'Solana wallet integration example',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClientWalletProvider>
                    {children}
                </ClientWalletProvider>
            </body>
        </html>
    );
}
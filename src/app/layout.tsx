import type { Metadata } from 'next';
import '../assets/main.css';

export const metadata: Metadata = {
    title: 'Echo',
    description: 'Echo Chat',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    console.log('hey')
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

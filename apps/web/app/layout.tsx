import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'SariStore | Simple POS for sari-sari stores',
  description: 'A simple sales and inventory workspace for neighborhood stores.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

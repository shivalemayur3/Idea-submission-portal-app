
import './globals.css';
import NavBar from '../components/NavBar';

export const metadata = {
  title: 'Idea Submission App',
  description: 'Submit and manage innovative ideas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

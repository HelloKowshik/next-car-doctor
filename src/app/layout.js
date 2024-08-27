import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/shared/NavBar';
import Footer from '@/components/shared/Footer';
import AuthProvider from '@/services/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Doctor Pro",
    template: '%s | Car Doctor Pro'
  },
  description: "Car Maintanance Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='mytheme'>
      <body className={inter.className}>
      <ToastContainer />
      <AuthProvider>
        <NavBar />
        {children}
        <Footer />
      </AuthProvider>  
      </body>  
    </html>
  );
}

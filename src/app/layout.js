import Navbar from "./component/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: "Intake Law firm Portal",
  description: "56789Created By Hurtech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Toaster position="top-right" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

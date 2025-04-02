import Navbar from "./component/Navbar";
import "./globals.css";



export const metadata = {
  title: "Intake Law firm Portal",
  description: "Created By Hurtech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

export default function AuthenticatedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

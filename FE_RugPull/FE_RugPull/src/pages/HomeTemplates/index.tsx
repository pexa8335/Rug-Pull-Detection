import { Outlet } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

export default function HomeTemplates() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

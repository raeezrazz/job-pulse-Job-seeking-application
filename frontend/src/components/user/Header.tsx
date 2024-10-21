import {  MapPin} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
    <a className="flex items-center justify-center" href="#">
      <MapPin className="h-6 w-6" />
      <span className="ml-2 text-lg font-bold">Job Pulse</span>
    </a>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Find Jobs
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        How it Works
      </a>
      <a onClick={()=>navigate('/login')} className="text-sm font-medium hover:underline underline-offset-4" href="/login">
        Sign In
      </a>
    </nav>
  </header>
  )
}
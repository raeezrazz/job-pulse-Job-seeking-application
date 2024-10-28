'use client'

import { useState } from 'react'
import {  MapPin} from "lucide-react"
import { adminLogin } from '../../../api/adminApi'
import { UseDispatch, useDispatch } from 'react-redux'
import { setAdminCredentials,adminLogout } from '../../../store/slice/adminSlice'

export default function AdminLogin() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
    } else {
      const response = await adminLogin({email,password})
      console.log(response,"here is the response")
      dispatch(setAdminCredentials(response.data))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <div className="space-y-1 text-center mb-4">
          <div className="flex items-center justify-center mb-4">
          <MapPin className="h-6 w-6" />
            <span className="ml-2 text-3xl font-bold text-black-600">Job Pulse</span>
          </div>
          <h2 className="text-1xl font-bold">Admin Login</h2>
          <p className="text-gray-600">Enter your credentials to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  id="email"
                  placeholder="admin@jobpulse.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-md">
              <strong>Error:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <div className="flex flex-col space-y-2 mt-4">
          <button className="text-blue-600 text-sm">Forgot password?</button>
          <p className="text-xs text-center text-gray-500">
            This is a secure area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}

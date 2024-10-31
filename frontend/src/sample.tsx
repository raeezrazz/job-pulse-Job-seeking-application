'use client'

import * as React from "react"
import { BarChart, Users, Package, Menu, Bell, ChevronDown, Search, Plus, Home, Settings, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "User Management", icon: Users, href: "/users" },
  { name: "Package Management", icon: Package, href: "/packages" },
  { name: "Settings", icon: Settings, href: "/settings" },
]

// Dummy data (same as before)
const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 2500 },
  { month: "Mar", revenue: 3000 },
  { month: "Apr", revenue: 3500 },
  { month: "May", revenue: 4000 },
  { month: "Jun", revenue: 4500 },
]

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", role: "Manager", status: "Active" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "Active" },
]

const packages = [
  { id: 1, name: "Basic Plan", price: "$9.99", users: 100, status: "Active" },
  { id: 2, name: "Pro Plan", price: "$19.99", users: 500, status: "Active" },
  { id: 3, name: "Enterprise Plan", price: "$49.99", users: 1000, status: "Inactive" },
  { id: 4, name: "Custom Plan", price: "Variable", users: 5000, status: "Active" },
]

export default function RedesignedAdminPanel() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:inset-auto lg:flex"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
            <Package className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                  pathname === item.href && "bg-blue-100 text-blue-600"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full justify-start text-gray-600 hover:text-red-600" onClick={() => console.log("Logout")}>
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <Input placeholder="Search..." className="w-64" />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
                      <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <span>Admin User</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-blue-50 bg-opacity-50">
          <ContentSection />
        </main>
      </div>
    </div>
  )
}

function ContentSection() {
  const pathname = usePathname()

  switch (pathname) {
    case "/dashboard":
      return <DashboardContent />
    case "/users":
      return <UserManagementContent />
    case "/packages":
      return <PackageManagementContent />
    default:
      return <div>Select a section from the sidebar</div>
  }
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">$45,231.89</div>
            <p className="text-xs text-green-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+2350</div>
            <p className="text-xs text-green-500">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+12,234</div>
            <p className="text-xs text-green-500">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sales</CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+573</div>
            <p className="text-xs text-green-500">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(215, 100%, 50%)",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(215, 100%, 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function UserManagementContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <Card className="bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">Name</TableHead>
              <TableHead className="text-gray-600">Email</TableHead>
              <TableHead className="text-gray-600">Role</TableHead>
              <TableHead className="text-gray-600">Status</TableHead>
              <TableHead className="text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-blue-50">
                <TableCell className="font-medium text-gray-800">{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell className="text-gray-600">{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "success" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Edit</Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-800">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function PackageManagementContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Package Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </div>
      <Card className="bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow> 
              
              <TableHead className="text-gray-600">Name</TableHead>
              <TableHead className="text-gray-600">Price</TableHead>
              <TableHead className="text-gray-600">Users</TableHead>
              <TableHead className="text-gray-600">Status</TableHead>
              <TableHead className="text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id} className="hover:bg-blue-50">
                <TableCell  className="font-medium text-gray-800">{pkg.name}</TableCell>
                <TableCell className="text-gray-600">{pkg.price}</TableCell>
                <TableCell className="text-gray-600">{pkg.users}</TableCell>
                <TableCell>
                  <Badge variant={pkg.status === "Active" ? "success" : "secondary"}>
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Edit</Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-800">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
import React, { useState, useEffect } from 'react';
import { loadUsers } from '../../api/adminApi';
import UserManagement from '../../components/admin/UserManagement/UserManagement';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
 

function AdminHome() {
  const [activePage, setActivePage] = useState('dashboard');
  const [users, setUsers] = useState([]); // Changed to an array
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const allUsers = async () => {
    setLoading(true);
    try {
      const userList = await loadUsers();
      console.log(userList, "here is user list");
      if (Array.isArray(userList.data.data)) {
        setUsers(userList.data.data);
        console.log("Users are an array:", userList.data.data);
      } else {
        console.error("Expected an array but received:", userList.data.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === 'user-management') {
      allUsers();
    }
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'user-management':
        return <UserManagement users={users} loading={loading} />;
      case 'package-management':
        return <PackageManagement />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Card className="fixed h-full w-full max-w-[15rem] bg-dark-blue shadow-xl shadow-gray-900 rounded-none">
        <div className="mb-2 w-full p-4 bg-blue-900 flex">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white mb-2"
          />
          <Typography variant="h5" color="white" className="pl-5">
            Welcome Admin
          </Typography>
        </div>
        <List className="text-sm">
          <Accordion open={open === 1} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-3 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0 text-white" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" color="orange" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto text-sm">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-3 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0 text-white" selected={open === 2}>
              <AccordionHeader onClick={() => setActivePage('user-management')} className="border-b-0 p-3">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto text-sm">
                  User Management
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <ListItem className="text-white">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="white" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="text-white">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
  
      {/* Main Content */}
      <div className="flex-1 ml-[15rem] overflow-hidden">
        {/* Top Heading */}
        <div className="sticky top-0 z-10 bg-white shadow p-4 p-6 m-5">
          <h2 className="text-2xl font-bold">{activePage.replace('-', ' ').toUpperCase()}</h2>
        </div>
  
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
  
}

const Dashboard = () => (
  <div>
    <h3 className="text-xl">Welcome to the Dashboard!</h3>
  </div>
);



const PackageManagement = () => (
  <div>
    <h3 className="text-xl">Package Management Section</h3>
  </div>
);

export default AdminHome;

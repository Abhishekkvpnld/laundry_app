import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageCheck,
  Users,
  Settings,
  Menu,
  Store,
  FileBarChart2,
  LogOut,
} from 'lucide-react';

const AdminNav = () => {
  const [showText, setShowText] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <PackageCheck size={20} />, path: '/admin/orders' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Services', icon: <Settings size={20} />, path: '/admin/services' },
    { name: 'Shop Details', icon: <Store size={20} />, path: '/admin/shop' },
    { name: 'Reports', icon: <FileBarChart2 size={20} />, path: '/admin/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <aside className="bg-white w-fit min-h-screen shadow-md p-4 flex flex-col justify-between">
      <div>
        {/* Toggle Menu */}
        <button
          onClick={() => setShowText(!showText)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <Menu size={20} />
          {showText && <span className="font-semibold">Menu</span>}
        </button>

        {/* Navigation Links */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100 transition ${
                  location.pathname === item.path ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.icon}
                {showText && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Admin Profile & Logout */}
      <div className="flex flex-col gap-3 mt-8 px-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-300 rounded-full" />
          {showText && <span className="text-sm font-semibold text-gray-800">Admin</span>}
        </div>
        <Link
          to="/logout"
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition mt-3"
        >
          <LogOut size={18} />
          {showText && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminNav;

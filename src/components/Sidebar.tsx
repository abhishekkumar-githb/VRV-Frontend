import React from 'react';
import { Users, Shield, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Layout },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 shadow-lg rounded-none overflow-hidden">
      <div className="flex h-16 items-center justify-center bg-indigo-600">
        <Shield className="h-8 w-8 text-white" />
        <span className="ml-2 text-xl font-bold text-white">RBAC Admin</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                isActive
                  ? 'bg-indigo-700 text-white shadow-md scale-105'
                  : 'text-gray-300 hover:bg-indigo-700 hover:text-white hover:scale-105'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

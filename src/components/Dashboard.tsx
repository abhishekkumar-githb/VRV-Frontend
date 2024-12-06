import React, { useState, useEffect } from 'react';
import { Users, Shield, AlertCircle, TrendingUp, TrendingDown, Loader } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const users = await api.getUsers();
        const roles = await api.getRoles();

        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(user => user.status === 'active').length,
          totalRoles: roles.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const dashboardStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: '+4.75%',
      changeType: 'increase',
      trendIcon: TrendingUp,
    },
    {
      name: 'Active Roles',
      value: stats.totalRoles,
      icon: Shield,
      change: '+2.02%',
      changeType: 'increase',
      trendIcon: TrendingUp,
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: AlertCircle,
      change: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      changeType: stats.activeUsers >= stats.totalUsers / 2 ? 'increase' : 'decrease',
      trendIcon: stats.activeUsers >= stats.totalUsers / 2 ? TrendingUp : TrendingDown,
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-100 via-white to-blue-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Dashboard Overview
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="h-12 w-12 text-indigo-500 animate-spin" />
          </div>
        ) : (
          dashboardStats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trendIcon;
            return (
              <div
                key={stat.name}
                className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-indigo-50 opacity-20"></div>
                <div className="p-6 relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <Icon className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div className="ml-4">
                      <dt className="text-sm font-medium text-gray-600">{stat.name}</dt>
                      <dd className="text-2xl font-extrabold text-gray-900">{stat.value}</dd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      <TrendIcon className="h-5 w-5 mr-1" />
                      {stat.change}
                    </div>
                    <span className="text-sm text-gray-500">Current rate</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        <div className="mt-4 p-4 bg-white shadow-lg rounded-xl">
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New user registered</span>
              <span className="text-xs text-gray-400">5 minutes ago</span>
            </li>
            <li className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">Role updated for user</span>
              <span className="text-xs text-gray-400">10 minutes ago</span>
            </li>
            <li className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">New role created</span>
              <span className="text-xs text-gray-400">30 minutes ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

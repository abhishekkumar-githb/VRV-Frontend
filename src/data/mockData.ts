import { Role, User, Resource } from '../types';

export const resources: Resource[] = [
  { id: 'users', name: 'Users' },
  { id: 'roles', name: 'Roles' },
  { id: 'products', name: 'Products' },
  { id: 'orders', name: 'Orders' },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      products: ['create', 'read', 'update', 'delete'],
      orders: ['create', 'read', 'update', 'delete'],
    },
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can manage content',
    permissions: {
      products: ['create', 'read', 'update'],
      orders: ['read', 'update'],
    },
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: {
      products: ['read'],
      orders: ['read'],
    },
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Aryan',
    email: 'Aryan@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roleId: '1',
    status: 'active',
  },
  {
    id: '2',
    name: 'Abhishek',
    email: 'Abhishek@example.com',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop&crop=faces',
    roleId: '2',
    status: 'active',
  },
  {
    id: '3',
    name: 'Purvesh',
    email: 'Purvesh@example.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces',
    roleId: '3',
    status: 'inactive',
  },
];

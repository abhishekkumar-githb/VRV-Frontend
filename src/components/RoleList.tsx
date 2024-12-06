import { Role } from '../types';
import { Edit, Trash2, Shield } from 'lucide-react';

interface RoleListProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

export default function RoleList({ roles, onEditRole, onDeleteRole }: RoleListProps) {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <div
          key={role.id}
          className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">{role.name}</h3>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onEditRole(role)}
                className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition"
                title="Edit Role"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteRole(role.id)}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                title="Delete Role"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{role.description}</p>
          <div className="space-y-4">
            {Object.entries(role.permissions).map(([resource, permissions]) => (
              <div key={resource}>
                <div className="text-sm font-semibold text-gray-800 capitalize mb-2">{resource}:</div>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-200 text-indigo-900 shadow-sm"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

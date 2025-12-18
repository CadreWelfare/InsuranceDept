
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FileRecord } from '../types';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardProps {
  files: FileRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ files }) => {
  const stats = [
    { label: 'Total Files', value: files.length, icon: <FileText className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'In Party', value: files.filter(f => f.FILE_STATUS === 'Documents Submitted In Party').length, icon: <Clock className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Insurance Fwd', value: files.filter(f => f.FILE_STATUS === 'Forwarded to Insurance').length, icon: <AlertCircle className="text-indigo-600" />, bg: 'bg-indigo-50' },
    { label: 'Compensated', value: files.filter(f => f.FILE_STATUS === 'Approved - Compensated').length, icon: <CheckCircle className="text-emerald-600" />, bg: 'bg-emerald-50' },
  ];

  const statusData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    files.forEach(f => {
      counts[f.FILE_STATUS] = (counts[f.FILE_STATUS] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [files]);

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#64748b'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
        <p className="text-slate-500">Real-time stats from the intimation database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6">File Status Distribution</h3>
          <div className="h-[300px]">
            {files.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">No data available</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6">Accident Types</h3>
          <div className="h-[300px]">
            {files.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={React.useMemo(() => {
                   const types: Record<string, number> = {};
                   files.forEach(f => {
                     types[f.TYPE_OF_ACCIDENT] = (types[f.TYPE_OF_ACCIDENT] || 0) + 1;
                   });
                   return Object.entries(types).map(([name, count]) => ({ name, count })).slice(0, 8);
                }, [files])}>
                  <XAxis dataKey="name" fontSize={10} angle={-15} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

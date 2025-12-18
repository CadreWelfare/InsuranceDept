
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Download,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Plus,
  RotateCcw,
  X
} from 'lucide-react';
import { FileRecord } from '../types';

interface FileListProps {
  files: FileRecord[];
  onDelete: (id: string) => void;
}

type SortKey = keyof FileRecord | 'createdAt';

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc'
  });
  
  const navigate = useNavigate();

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSortConfig({ key: 'createdAt', direction: 'desc' });
  };

  const filteredFiles = useMemo(() => {
    // 1. Filter
    let result = files.filter(f => {
      const matchesSearch = 
        f.DEATH_PERSON_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.INTIMATION_NO?.toString().includes(searchTerm) ||
        f.MID?.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || f.FILE_STATUS === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // 2. Sort
    result.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      let comparison = 0;
      
      // Handle numeric strings or numbers
      const numA = Number(valA);
      const numB = Number(valB);
      
      if (!isNaN(numA) && !isNaN(numB) && typeof valA !== 'object' && typeof valB !== 'object') {
        comparison = numA - numB;
      } else {
        comparison = valA.toString().localeCompare(valB.toString());
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [files, searchTerm, statusFilter, sortConfig]);

  const statuses = ['All', ...new Set(files.map(f => f.FILE_STATUS))];

  const exportCSV = () => {
    if (files.length === 0) return;
    const headers = Object.keys(files[0]).join(',');
    const rows = files.map(f => Object.values(f).map(val => {
      if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return `"${val}"`;
    }).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `files_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const SortIndicator = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="ml-1 text-blue-600" /> : <ChevronDown size={14} className="ml-1 text-blue-600" />;
  };

  const isFiltered = searchTerm !== '' || statusFilter !== 'All' || sortConfig.key !== 'createdAt' || sortConfig.direction !== 'desc';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">File Directory</h2>
          <p className="text-slate-500">Manage and track all intimation records</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={exportCSV}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium text-slate-700 transition-colors"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <Link 
            to="/create" 
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
          >
            <Plus size={18} />
            <span>New File</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID or intimation no..."
              className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2 min-w-[200px]">
            <Filter size={18} className="text-slate-400" />
            <select 
              className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none bg-white cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button 
            onClick={handleReset}
            disabled={!isFiltered}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all border font-medium ${
              isFiltered 
              ? 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100' 
              : 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed opacity-50'
            }`}
            title="Reset search, filters and sort"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('INTIMATION_NO')}
                    className="flex items-center font-semibold text-slate-600 text-sm hover:text-blue-600 transition-colors group uppercase tracking-wider"
                  >
                    Intimation No <SortIndicator columnKey="INTIMATION_NO" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('DEATH_PERSON_NAME')}
                    className="flex items-center font-semibold text-slate-600 text-sm hover:text-blue-600 transition-colors group uppercase tracking-wider"
                  >
                    Subject Name <SortIndicator columnKey="DEATH_PERSON_NAME" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('DISTRICT')}
                    className="flex items-center font-semibold text-slate-600 text-sm hover:text-blue-600 transition-colors group uppercase tracking-wider"
                  >
                    District <SortIndicator columnKey="DISTRICT" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('FILE_STATUS')}
                    className="flex items-center font-semibold text-slate-600 text-sm hover:text-blue-600 transition-colors group uppercase tracking-wider"
                  >
                    Status <SortIndicator columnKey="FILE_STATUS" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button 
                    onClick={() => handleSort('TYPE_OF_ACCIDENT')}
                    className="flex items-center font-semibold text-slate-600 text-sm hover:text-blue-600 transition-colors group uppercase tracking-wider"
                  >
                    Accident Type <SortIndicator columnKey="TYPE_OF_ACCIDENT" />
                  </button>
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <tr key={file.FILE_ID} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{file.INTIMATION_NO}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900">{file.DEATH_PERSON_NAME}</div>
                      <div className="text-xs text-slate-500">MID: {file.MID}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{file.DISTRICT}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        file.FILE_STATUS === 'Approved - Compensated' ? 'bg-emerald-100 text-emerald-700' :
                        file.FILE_STATUS === 'Forwarded to Insurance' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {file.FILE_STATUS}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{file.TYPE_OF_ACCIDENT}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => navigate(`/view/${file.FILE_ID}`)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/edit/${file.FILE_ID}`)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        title="Edit Record"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(file.FILE_ID)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic bg-white">No files found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileList;

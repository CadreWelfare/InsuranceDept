
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, 
  LayoutDashboard, 
  Table as TableIcon, 
  Settings, 
  Search, 
  ChevronRight,
  Menu,
  X,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { FileRecord } from './types';
import { sheetsApi } from './api';
import Dashboard from './components/Dashboard';
import FileList from './components/FileList';
import FileForm from './components/FileForm';
import FileDetails from './components/FileDetails';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await sheetsApi.fetchFiles();
      // Sort data by createdAt descending to show latest first
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      setFiles(sortedData);
    } catch (error) {
      console.error("Error loading files:", error);
      alert("Failed to load data from Google Sheets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addFile = async (newFile: FileRecord) => {
    try {
      setSyncing(true);
      await sheetsApi.saveFile(newFile, 'CREATE');
      setFiles(prev => [newFile, ...prev]);
    } catch (error) {
      alert("Error saving to cloud.");
    } finally {
      setSyncing(false);
    }
  };

  const updateFile = async (updatedFile: FileRecord) => {
    try {
      setSyncing(true);
      await sheetsApi.saveFile(updatedFile, 'UPDATE');
      setFiles(prev => {
        const updated = prev.map(f => f.FILE_ID === updatedFile.FILE_ID ? updatedFile : f);
        return updated.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
      });
    } catch (error) {
      alert("Error updating cloud.");
    } finally {
      setSyncing(false);
    }
  };

  const deleteFile = async (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        setSyncing(true);
        const fileToDelete = files.find(f => f.FILE_ID === id);
        if (fileToDelete) {
          await sheetsApi.saveFile(fileToDelete, 'DELETE');
          setFiles(prev => prev.filter(f => f.FILE_ID !== id));
        }
      } catch (error) {
        alert("Error deleting from cloud.");
      } finally {
        setSyncing(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Connecting to Google Sheets...</p>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex">
        {/* Sync Overlay */}
        {syncing && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-[1px] z-[9999] flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="font-bold text-slate-800">Syncing with Google Sheets...</span>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}
        >
          <div className="p-6 flex items-center justify-between">
            <h1 className={`${!isSidebarOpen && 'hidden'} font-bold text-xl tracking-tight`}>
              INTIMATION<span className="text-blue-400">SYS</span>
            </h1>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={!isSidebarOpen} />
            <SidebarLink to="/files" icon={<TableIcon size={20} />} label="All Files" collapsed={!isSidebarOpen} />
            <SidebarLink to="/create" icon={<Plus size={20} />} label="New Entry" collapsed={!isSidebarOpen} />
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={loadData}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white ${!isSidebarOpen && 'justify-center'}`}
              title="Manual Refresh"
            >
              <RefreshCw size={18} />
              {isSidebarOpen && <span className="text-sm font-medium">Refresh Data</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <header className="bg-white border-b sticky top-0 z-40 px-8 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <span className="font-medium">Home</span>
              <ChevronRight size={14} />
              <span className="text-slate-900 font-semibold uppercase tracking-wider text-xs">Navigation</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Search size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Settings size={20} />
              </button>
            </div>
          </header>

          <div className="p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard files={files} />} />
              <Route path="/files" element={<FileList files={files} onDelete={deleteFile} />} />
              <Route path="/create" element={<FileForm onSave={addFile} />} />
              <Route path="/edit/:id" element={<FileForm onSave={updateFile} files={files} />} />
              <Route path="/view/:id" element={<FileDetails files={files} onDelete={deleteFile} />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

const SidebarLink: React.FC<{ to: string, icon: React.ReactNode, label: string, collapsed: boolean }> = ({ 
  to, icon, label, collapsed 
}) => (
  <Link 
    to={to} 
    className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-slate-800 transition-colors group"
  >
    <span className="text-slate-400 group-hover:text-blue-400">{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </Link>
);

export default App;

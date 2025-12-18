
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  User, 
  Shield, 
  Scan, 
  Mail,
  ExternalLink,
  Phone
} from 'lucide-react';
import { FileRecord } from '../types';
import { SCHEMA, SECTIONS } from '../constants';

interface FileDetailsProps {
  files: FileRecord[];
  onDelete: (id: string) => void;
}

const FileDetails: React.FC<FileDetailsProps> = ({ files, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const file = files.find(f => f.FILE_ID === id);

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-slate-400 mb-4">File not found or has been removed.</div>
        <Link to="/files" className="text-blue-600 font-semibold flex items-center space-x-2">
          <ChevronLeft size={20} />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    onDelete(file.FILE_ID);
    navigate('/files');
  };

  const sectionIcons: Record<string, React.ReactNode> = {
    "File Information": <User size={20} className="text-blue-500" />,
    "Address": <MapPin size={20} className="text-amber-500" />,
    "Scanning": <Scan size={20} className="text-indigo-500" />,
    "File Status": <Shield size={20} className="text-emerald-500" />,
    "Resubmission": <Mail size={20} className="text-purple-500" />,
    "File Letter Distribution": <Mail size={20} className="text-pink-500" />
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/files')}
            className="p-2 hover:bg-white rounded-lg border transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-3xl font-bold text-slate-900">{file.DEATH_PERSON_NAME}</h2>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                file.FILE_STATUS === 'Approved - Compensated' ? 'bg-emerald-100 text-emerald-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {file.FILE_STATUS}
              </span>
            </div>
            <p className="text-slate-500 font-mono text-sm">FILE_ID: {file.FILE_ID} | Intimation: {file.INTIMATION_NO}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(`/edit/${file.FILE_ID}`)}
            className="flex items-center space-x-2 px-6 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-semibold shadow-sm text-slate-700"
          >
            <Edit size={18} />
            <span>Edit File</span>
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center space-x-2 px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-semibold transition-colors"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {SECTIONS.map(section => {
            const fields = SCHEMA.filter(f => f.section === section && !f.hidden);
            return (
              <div key={section} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center space-x-3">
                  {sectionIcons[section]}
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{section}</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {fields.map(f => (
                    <div key={f.id} className={`${f.type === 'MULTISELECT' || f.type === 'DYNAMIC_CONTACTS' || f.type === 'TEXTAREA' ? 'md:col-span-2' : ''}`}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{f.header}</p>
                      
                      {f.type === 'DYNAMIC_CONTACTS' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          {((file[f.id] as any[]) || []).map((c, i) => (
                            <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex items-start space-x-3">
                              <div className="p-2 bg-white rounded shadow-sm text-blue-500"><Phone size={14} /></div>
                              <div>
                                <p className="text-sm font-semibold text-slate-800">{c.name || 'No Name'}</p>
                                <p className="text-xs text-slate-500">{c.phone || 'No Phone'}</p>
                                {c.date && <p className="text-[10px] text-blue-600 mt-1 uppercase font-bold">{c.date}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : f.type === 'MULTISELECT' ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {((file[f.id] as string[]) || []).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-md border border-blue-100">
                              {tag}
                            </span>
                          ))}
                          {((file[f.id] as string[]) || []).length === 0 && <span className="text-slate-400 text-sm italic">None</span>}
                        </div>
                      ) : f.type === 'LINK' ? (
                        <a 
                          href={file[f.id] as string} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 font-medium hover:underline flex items-center space-x-1 text-sm"
                        >
                          <span>Open Link</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="text-slate-700 font-medium break-words">{(file[f.id] as string) || '-'}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
            <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">Metadata</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs">Created At</span>
                <span className="text-sm font-mono">{new Date(file.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs">Last Updated</span>
                <span className="text-sm font-mono">{new Date(file.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs">Nominee</span>
                <span className="text-sm font-semibold">{file.NOMINEE_NAME}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Contact</span>
                <span className="text-sm font-semibold">{file.NOMINEE_MOBILE}</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400">
                  {file.AGENT_NAME?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Assigned Agent</p>
                  <p className="font-bold">{file.AGENT_NAME || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase">Quick Links</h4>
            <div className="space-y-2">
               {file.LTR_LINK1 && (
                 <a href={file.LTR_LINK1} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <span className="text-xs font-semibold text-slate-600">Photo Link</span>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500" />
                 </a>
               )}
               {file.LTR_LINK2 && (
                 <a href={file.LTR_LINK2} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <span className="text-xs font-semibold text-slate-600">Testimony Video</span>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500" />
                 </a>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;

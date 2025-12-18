
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ChevronLeft, Plus, Trash2, Calendar, FileCheck } from 'lucide-react';
import { FileRecord, DynamicContact } from '../types';
import { SCHEMA, SECTIONS } from '../constants';

interface FileFormProps {
  onSave: (file: FileRecord) => void;
  files?: FileRecord[];
}

const FileForm: React.FC<FileFormProps> = ({ onSave, files }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Partial<FileRecord>>({
    FILE_ID: Math.random().toString(36).substr(2, 9).toUpperCase(),
    CONTACT_DETAILS: [],
    RESUBMISSION_REQ_DOCS: [],
    RESUBMISSION_DOCS_RECEIVED: [],
    RESUBMISSION_INFORMATION: [],
    FILE_STATUS: 'Waiting For Documents',
  });

  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    if (isEdit && files) {
      const existing = files.find(f => f.FILE_ID === id);
      if (existing) setFormData(existing);
    }
  }, [isEdit, id, files]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field: keyof FileRecord, option: string) => {
    const current = (formData[field] as string[]) || [];
    const updated = current.includes(option)
      ? current.filter(i => i !== option)
      : [...current, option];
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const addDynamicContact = (field: 'CONTACT_DETAILS' | 'RESUBMISSION_INFORMATION', hasDate = false) => {
    const newContact: DynamicContact = { name: '', phone: '', ...(hasDate && { date: '' }) };
    setFormData(prev => ({
      ...prev,
      [field]: [...((prev[field] as DynamicContact[]) || []), newContact]
    }));
  };

  const updateDynamicContact = (field: 'CONTACT_DETAILS' | 'RESUBMISSION_INFORMATION', index: number, key: keyof DynamicContact, value: string) => {
    const updated = [...((formData[field] as DynamicContact[]) || [])];
    updated[index] = { ...updated[index], [key]: value };
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const removeDynamicContact = (field: 'CONTACT_DETAILS' | 'RESUBMISSION_INFORMATION', index: number) => {
    const updated = [...((formData[field] as DynamicContact[]) || [])];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString()
    } as FileRecord);
    navigate('/files');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg border transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit File' : 'Create New Intimation'}</h2>
            <p className="text-slate-500">Section: <span className="text-blue-600 font-semibold">{activeSection}</span></p>
          </div>
        </div>
        <button 
          type="submit" 
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg shadow-blue-100 transition-all"
        >
          <Save size={18} />
          <span>{isEdit ? 'Update Record' : 'Save Record'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Section Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2 sticky top-24">
            {SECTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSection(s)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                  activeSection === s ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields Container */}
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4">{activeSection}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {SCHEMA.filter(field => field.section === activeSection && !field.hidden).map(field => (
                <div key={field.id} className={`${field.type === 'TEXTAREA' || field.type === 'DYNAMIC_CONTACTS' || field.type === 'MULTISELECT' ? 'md:col-span-2' : ''}`}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {field.header}
                    {field.description && <span className="ml-2 normal-case font-normal text-slate-400">({field.description})</span>}
                  </label>

                  {field.type === 'TEXT' && (
                    <input 
                      type="text" 
                      name={field.id} 
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'NUMBER' && (
                    <input 
                      type="number" 
                      name={field.id} 
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'TEXTAREA' && (
                    <textarea 
                      name={field.id} 
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'DROPDOWN' && (
                    <select 
                      name={field.id} 
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="">Select Option</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}

                  {field.type === 'DATE' && (
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <input 
                        type="date" 
                        name={field.id} 
                        value={(formData[field.id] as string) || ''} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {field.type === 'DATETIME' && (
                    <input 
                      type="datetime-local" 
                      name={field.id} 
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'LINK' && (
                    <input 
                      type="url" 
                      name={field.id} 
                      placeholder="https://..."
                      value={(formData[field.id] as string) || ''} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'MULTISELECT' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 max-h-[300px] overflow-y-auto">
                      {field.options?.map(opt => (
                        <label key={opt} className="flex items-center space-x-2 text-sm cursor-pointer p-1.5 hover:bg-white rounded transition-colors">
                          <input 
                            type="checkbox" 
                            checked={((formData[field.id] as string[]) || []).includes(opt)}
                            onChange={() => handleMultiSelect(field.id, opt)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-slate-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === 'DYNAMIC_CONTACTS' && (
                    <div className="space-y-4">
                      {((formData[field.id] as DynamicContact[]) || []).map((contact, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group relative">
                          <div className="flex-1">
                            <input 
                              type="text" 
                              placeholder="Name"
                              value={contact.name}
                              onChange={(e) => updateDynamicContact(field.id as any, idx, 'name', e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-sm mb-2"
                            />
                            <input 
                              type="tel" 
                              placeholder="Phone (10 digits)"
                              value={contact.phone}
                              onChange={(e) => updateDynamicContact(field.id as any, idx, 'phone', e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-sm"
                            />
                          </div>
                          {field.id === 'RESUBMISSION_INFORMATION' && (
                            <div className="flex-1">
                               <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Information Date</label>
                               <input 
                                type="date" 
                                value={contact.date || ''}
                                onChange={(e) => updateDynamicContact(field.id as any, idx, 'date', e.target.value)}
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-sm"
                              />
                            </div>
                          )}
                          <button 
                            type="button" 
                            onClick={() => removeDynamicContact(field.id as any, idx)}
                            className="p-2 text-red-400 hover:text-red-600 bg-white border border-slate-100 rounded-md hover:shadow-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={() => addDynamicContact(field.id as any, field.id === 'RESUBMISSION_INFORMATION')}
                        className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg w-full justify-center border border-dashed border-blue-200"
                      >
                        <Plus size={16} />
                        <span>Add Contact Entry</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FileForm;

import React, { useState } from 'react';

const Metadata = () => {
  const [metadataForm, setMetadataForm] = useState({
    copyrightOwner: '',
    contactInfo: '',
    description: '',
    keywords: '',
    creationDate: new Date().toISOString().split('T')[0]
  });

  const [savedMetadata, setSavedMetadata] = useState([]);

  const handleInputChange = (field, value) => {
    setMetadataForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveMetadata = () => {
    if (metadataForm.copyrightOwner.trim()) {
      const newMetadata = {
        id: Date.now(),
        ...metadataForm,
        savedAt: new Date().toLocaleString()
      };
      setSavedMetadata(prev => [newMetadata, ...prev]);
      
      // Reset form
      setMetadataForm({
        copyrightOwner: '',
        contactInfo: '',
        description: '',
        keywords: '',
        creationDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  const deleteMetadata = (id) => {
    setSavedMetadata(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Metadata Protection</h1>
        
        {/* Metadata Form */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Add Copyright Metadata</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Copyright Owner *</label>
                <input
                  type="text"
                  value={metadataForm.copyrightOwner}
                  onChange={(e) => handleInputChange('copyrightOwner', e.target.value)}
                  placeholder="Your Name or Business"
                  className="w-full p-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Information</label>
                <input
                  type="text"
                  value={metadataForm.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  placeholder="Email or website"
                  className="w-full p-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={metadataForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the image"
                  rows={3}
                  className="w-full p-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 border border-slate-600 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <input
                  type="text"
                  value={metadataForm.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="photography, portrait, commercial"
                  className="w-full p-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Creation Date</label>
                <input
                  type="date"
                  value={metadataForm.creationDate}
                  onChange={(e) => handleInputChange('creationDate', e.target.value)}
                  className="w-full p-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={saveMetadata}
              disabled={!metadataForm.copyrightOwner.trim()}
              className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Metadata Template
            </button>
          </div>
        </div>

        {/* Saved Metadata Templates */}
        {savedMetadata.length > 0 && (
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Saved Templates</h3>
            <div className="space-y-4">
              {savedMetadata.map((metadata) => (
                <div key={metadata.id} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-cyan-300">{metadata.copyrightOwner}</h4>
                      <p className="text-xs text-gray-400">Saved {metadata.savedAt}</p>
                    </div>
                    <button
                      onClick={() => deleteMetadata(metadata.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {metadata.contactInfo && (
                      <div>
                        <span className="text-gray-400">Contact:</span>
                        <span className="ml-2 text-gray-300">{metadata.contactInfo}</span>
                      </div>
                    )}
                    {metadata.description && (
                      <div>
                        <span className="text-gray-400">Description:</span>
                        <span className="ml-2 text-gray-300">{metadata.description}</span>
                      </div>
                    )}
                    {metadata.keywords && (
                      <div>
                        <span className="text-gray-400">Keywords:</span>
                        <span className="ml-2 text-gray-300">{metadata.keywords}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Date:</span>
                      <span className="ml-2 text-gray-300">{metadata.creationDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMetadataForm(metadata)}
                    className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition-colors"
                  >
                    Use This Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-cyan-300 mb-1">How It Works</h4>
                <p className="text-sm text-gray-300">
                  Metadata is embedded invisibly into your images and cannot be removed by cropping or editing. 
                  It provides permanent copyright protection and ownership verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;

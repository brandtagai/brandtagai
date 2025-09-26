import React, { useState, useRef } from 'react';

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            status: 'ready'
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const processImages = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    for (let i = 0; i < uploadedImages.length; i++) {
      setUploadedImages(prev => 
        prev.map((img, index) => 
          index === i ? { ...img, status: 'processing' } : img
        )
      );
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadedImages(prev => 
        prev.map((img, index) => 
          index === i ? { ...img, status: 'complete' } : img
        )
      );
    }
    
    setIsProcessing(false);
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Images</h1>
        
        {/* Upload Area */}
        <div className="max-w-md mx-auto mb-8">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-cyan-500 rounded-xl p-8 text-center cursor-pointer hover:bg-cyan-500/10 transition-colors"
          >
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Drop images here</h3>
            <p className="text-gray-400">or click to browse</p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {uploadedImages.length > 0 && (
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Selected Images</h3>
            <div className="space-y-4 mb-6">
              {uploadedImages.map((image) => (
                <div key={image.id} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium truncate">{image.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {image.status === 'ready' && (
                          <span className="text-sm text-gray-400">Ready</span>
                        )}
                        {image.status === 'processing' && (
                          <>
                            <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-cyan-400">Processing...</span>
                          </>
                        )}
                        {image.status === 'complete' && (
                          <>
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-400">Complete</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Button */}
            <button
              onClick={processImages}
              disabled={isProcessing || uploadedImages.every(img => img.status === 'complete')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Images...' : 'Add Watermarks'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

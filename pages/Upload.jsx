import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserSettings } from "@/entities/mockEntities";
import { Purchase } from "@/entities/mockEntities";
import { User } from "@/entities/mockEntities";
import { processImage } from "@/components/utils/ImageProcessor";
import { Upload as UploadIcon, Image, Download, Zap, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import BottomNav from "@/components/navigation/BottomNav";
import ProcessingScreen from "@/components/upload/ProcessingScreen";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [processingProgress, setProcessingProgress] = useState({ progress: 0, status: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await User.me();
      
      // Load settings
      const userSettings = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      if (userSettings.length > 0) {
        setSettings(userSettings[0]);
      }
      
      // Load credits
      const purchases = await Purchase.filter({ created_by: user.email }, '-purchase_date');
      const totalCredits = purchases.reduce((sum, p) => sum + (p.images_remaining || 0), 0);
      setRemainingCredits(totalCredits);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const maxFiles = Math.min(newFiles.length, remainingCredits, 20);
    setFiles(prev => [...prev, ...newFiles.slice(0, maxFiles)]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (files.length === 0) return;
    
    // Check if user has branding set up
    if (!settings || (!settings.logo_url && !settings.brand_text)) {
      alert("Please set up your branding (logo or text) in Settings before processing images.");
      return;
    }
    
    setIsProcessing(true);
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        setProcessingProgress({ 
          progress: 0, 
          status: `Processing ${files[i].name} (${i + 1}/${files.length})...` 
        });
        
        const result = await processImage(
          files[i], 
          settings,
          (progress, status) => {
            setProcessingProgress({ progress, status });
          }
        );
        
        results.push(result);
        
        // Update credits
        await updateCredits();
      } catch (error) {
        console.error(`Error processing ${files[i].name}:`, error);
      }
    }
    
    setProcessedImages(results);
    setFiles([]);
    setIsProcessing(false);
  };

  const updateCredits = async () => {
    try {
      const user = await User.me();
      const purchases = await Purchase.filter({ created_by: user.email }, '-purchase_date', 1);
      
      if (purchases.length > 0 && purchases[0].images_remaining > 0) {
        await Purchase.update(purchases[0].id, {
          images_remaining: purchases[0].images_remaining - 1
        });
        setRemainingCredits(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.processedImage;
    link.download = image.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    processedImages.forEach(downloadImage);
    setProcessedImages([]);
  };

  if (isProcessing) {
    return <ProcessingScreen 
      files={files} 
      settings={settings} 
      progress={processingProgress.progress}
      status={processingProgress.status}
    />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-lg border-b border-white/20">
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Process Images</h1>
              <p className="text-sm text-blue-200">Client-side watermarking and protection</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{remainingCredits}</div>
              <div className="text-xs text-white/70 -mt-1">Credits</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 px-6 py-2 flex flex-col justify-center space-y-4">
        {/* Setup Check */}
        {settings && !settings.logo_url && !settings.brand_text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-yellow-300 font-semibold">Setup Required</h3>
                <p className="text-yellow-200 text-sm">Add your logo or brand text in Settings</p>
              </div>
              <Link to={createPageUrl("Settings")}>
                <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-1">Instant Watermarking</h2>
          <p className="text-base text-cyan-200">Secure your visual content with instant branding.</p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 max-h-72"
        >
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`h-full border-2 border-dashed rounded-xl p-6 text-center transition-colors flex flex-col items-center justify-center ${
              dragActive
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-white/30 hover:border-cyan-400 hover:bg-cyan-400/5"
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 shadow-2xl mb-4"
            >
              <UploadIcon className="w-full h-full text-white" />
            </motion.div>

            <h3 className="text-lg font-semibold text-white mb-2">Drag and drop to upload your images</h3>
            <p className="text-gray-300 mb-4">
              or click to browse
            </p>
            <p className="text-sm text-gray-400 mb-4">
              (JPG files work best for metadata embedding)
            </p>
            
            <Button
              onClick={() => document.getElementById('file-upload').click()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
            >
              Choose Images
            </Button>
          </div>
        </motion.div>

        {/* Selected Files */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-3"
            >
              <div className="text-center mb-2">
                <span className="text-sm font-medium text-white">
                  {files.length} image{files.length > 1 ? 's' : ''} selected
                </span>
              </div>
              
              <Button
                onClick={processImages}
                disabled={files.length === 0 || remainingCredits === 0 || (!settings?.logo_url && !settings?.brand_text)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg"
                size="lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Process {files.length} Image{files.length > 1 ? 's' : ''}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processed Results */}
        <AnimatePresence>
          {processedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/10 backdrop-blur-md rounded-xl p-3"
            >
              <div className="text-center mb-2">
                <span className="text-sm font-medium text-green-300">
                  ✨ {processedImages.length} image{processedImages.length > 1 ? 's' : ''} processed
                </span>
              </div>
              
              <Button
                onClick={downloadAll}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}

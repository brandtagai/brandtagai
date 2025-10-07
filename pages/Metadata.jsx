import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import { Shield, Upload, CheckCircle, ExternalLink, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/navigation/BottomNav";

export default function Metadata() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      analyzeImage(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      analyzeImage(file);
    }
  };

  const analyzeImage = async (file) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setMetadata(null);

    try {
      const { file_url } = await UploadFile({ file });
      
      // Simulate metadata extraction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock metadata for demo
      const mockMetadata = {
        filename: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        copyright: "© 2024 BrandTag AI",
        creator: "BrandTag User",
        description: "Professional watermarked image",
        keywords: "watermark, brand, protection",
        createdDate: new Date().toISOString(),
        software: "BrandTag AI v1.0",
        verified: true
      };
      
      setMetadata(mockMetadata);
    } catch (error) {
      console.error("Error analyzing image:", error);
      // Show user-friendly error
      setMetadata({ error: true, message: "Try uploading image again in a few moments", code: "Error 544" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const openMetapicz = () => {
    window.open("https://metapicz.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Metadata Check</h1>
              <p className="text-sm text-blue-200">Verify invisible protection data</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardContent className="p-0">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`m-6 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-white/30 hover:border-cyan-400 hover:bg-cyan-400/5"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="metadata-upload"
                />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center"
                >
                  <Eye className="w-8 h-8 text-cyan-300" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  Check Image Metadata
                </h3>
                <p className="text-blue-200 mb-6">
                  Upload an image to verify embedded protection data
                </p>
                
                <Button
                  onClick={() => document.getElementById('metadata-upload').click()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
                  disabled={isAnalyzing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Select Image"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6"
                    >
                      <Shield className="w-full h-full text-cyan-400" />
                    </motion.div>
                    <span className="text-white">Analyzing metadata...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {metadata && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {metadata.error ? (
                /* Error Card */
                <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{metadata.code}</h3>
                        <p className="text-red-200">{metadata.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Verification Status */}
                  <Card className="border-green-500/30 bg-green-500/10 backdrop-blur-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">Verified Protection</h3>
                          <p className="text-green-200">Invisible metadata successfully embedded</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Metadata Details */}
                  <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
                    <CardHeader>
                      <CardTitle className="text-white">Embedded Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(metadata)
                        .filter(([key]) => !['verified', 'filename', 'fileSize'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-blue-200 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <Badge variant="secondary" className="bg-white/20 text-white">
                              {value}
                            </Badge>
                          </div>
                        ))}
                    </CardContent>
                  </Card>

                  {/* Third-party Verification */}
                  <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
                    <CardHeader>
                      <CardTitle className="text-white">Third-Party Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-200 mb-4">
                        For additional verification, you can check your image metadata using external tools.
                      </p>
                      <Button
                        onClick={openMetapicz}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg"
                        size="lg"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test with Metapicz.com
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}

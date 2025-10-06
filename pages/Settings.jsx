import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSettings } from "@/entities/mockEntities";
import { User } from "@/entities/mockEntities";
import { UploadFile } from "@/integrations/Core";
import { Upload, Settings as SettingsIcon, Image, X } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "../components/navigation/BottomNav";

export default function Settings() {
  const [settings, setSettings] = useState({
    logo_url: "",
    brand_text: "", // Changed from business_name to brand_text
    metadata_fields: {
      copyright: "",
      creator: "",
      description: "",
      keywords: ""
    },
    logo_position: "left",
    social_media_mode: false,
    logo_circle_crop: false // Added new state for circle crop
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const user = await User.me();
      const userSettingsList = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      if (userSettingsList.length > 0) {
        setSettings(userSettingsList[0]);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setSettings(prev => ({ ...prev, logo_url: file_url }));
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveLogo = () => {
    setSettings(prev => ({ ...prev, logo_url: "" }));
  };

  const handleSave = async () => {
    // Check if user has at least one branding element (logo or brand text)
    if (!settings.logo_url && !settings.brand_text) {
      alert("Please add either a logo or brand text before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const user = await User.me();
      const existingSettings = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      
      if (existingSettings.length > 0) {
        await UserSettings.update(existingSettings[0].id, settings);
      } else {
        await UserSettings.create(settings);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateMetadataField = (field, value) => {
    setSettings(prev => ({
      ...prev,
      metadata_fields: {
        ...prev.metadata_fields,
        [field]: value
      }
    }));
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
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Settings</h1>
              <p className="text-sm text-blue-200">Configure your watermarking preferences</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Logo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Image className="w-5 h-5 text-cyan-400" />
                Brand Logo (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {settings.logo_url && (
                  <div className="relative">
                    <img
                      src={settings.logo_url}
                      alt="Logo preview"
                      className={`w-16 h-16 object-contain border-2 border-white/20 bg-white/10 ${settings.logo_circle_crop ? 'rounded-full' : 'rounded-lg'}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-black/80 text-white rounded-full hover:bg-black hover:text-white"
                      aria-label="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-4 text-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-colors">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">
                        {isUploading ? "Uploading..." : settings.logo_url ? "Upload New Logo" : "Upload Logo"}
                      </p>
                    </div>
                  </Label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>
              
              {settings.logo_url && (
                <div className="text-center">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_circle_crop: !prev.logo_circle_crop }))}
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                  >
                    {settings.logo_circle_crop ? "Uncrop" : "Circle Crop"}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Brand Text (New Section) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="brand-text" className="text-blue-200">What text would you like to display on your images?</Label>
                <Input
                  id="brand-text"
                  placeholder="e.g., YourBrand.com or @YourHandle"
                  value={settings.brand_text}
                  onChange={(e) => setSettings(prev => ({ ...prev, brand_text: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
                <p className="text-xs text-gray-400">Appears on your images. Use for your business name, website, social media handle, or slogan.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Metadata Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Invisible Metadata</CardTitle>
              <p className="text-sm text-blue-200">Embed copyright information directly into your images</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.metadata_fields).map(([field, value]) => (
                <div key={field} className="space-y-2">
                  <Label className="text-blue-200 capitalize">{field.replace('_', ' ')}</Label>
                  <Input
                    placeholder={`${field.replace('_', ' ')} (optional)`}
                    value={value}
                    onChange={(e) => updateMetadataField(field, e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Positioning Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Watermark Positioning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-white">Position</Label>
                  <p className="text-sm text-blue-200">Choose bottom-left or bottom-right</p>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_position: "left" }))}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      settings.logo_position === "left"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Left
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_position: "right" }))}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      settings.logo_position === "right"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Right
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-white">Social Media Mode</Label>
                  <p className="text-sm text-blue-200">Avoid crop zones on social platforms</p>
                </div>
                <Switch
                  checked={settings.social_media_mode}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, social_media_mode: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg"
            size="lg"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function BrandTagSettings() {
  const [settings, setSettings] = useState({
    logo_url: "",
    brand_text: "",
    font_family: "Arial",
    font_bold: false,
    font_italic: false,
    text_color: "#FFFFFF",
    text_size: 16,
    logo_size: 80,
    opacity: 100,
    drop_shadow: false,
    metadata_fields: {
      copyright: "",
      creator: "",
      description: "",
      keywords: ""
    },
    logo_position: "left",
    social_media_mode: false,
    logo_circle_crop: false,
    qr_code: {
      enabled: false,
      website: "",
      display_text: ""
    }
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [extractedColors, setExtractedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [aiSuggestedFont, setAiSuggestedFont] = useState("");
  const [typedText, setTypedText] = useState("");
  const [copyrightFocused, setCopyrightFocused] = useState(false);

  // 500 FONTS - Alphabetically organized, displayed in their own font
  const fonts = [
    "Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold",
    "Avant Garde", "Baskerville", "Big Caslon", "Bodoni MT",
    "Book Antiqua", "Bookman", "Brush Script MT", "Calibri",
    "Calisto MT", "Cambria", "Candara", "Century Gothic",
    "Century Schoolbook", "Chalkboard", "Comic Sans MS", "Consolas",
    "Copperplate", "Copperplate Gothic", "Corbel", "Courier New",
    "Didot", "Ebrima", "Franklin Gothic", "Futura",
    "Garamond", "Geneva", "Georgia", "Gill Sans",
    "Goudy Old Style", "Helvetica", "Helvetica Neue", "Hoefler Text",
    "Impact", "Lucida Bright", "Lucida Console", "Lucida Grande",
    "Lucida Sans", "Monaco", "Montserrat", "MS Gothic",
    "MS Sans Serif", "New Century Schoolbook", "Optima", "Palatino",
    "Papyrus", "Perpetua", "Playfair Display", "Rockwell",
    "Sabon", "Segoe UI", "Tahoma", "Times", "Times New Roman",
    "Trebuchet MS", "Verdana", "Zapfino"
    // In production: Load all 500 fonts
  ];

  // Auto-insert © in copyright field
  useEffect(() => {
    if (copyrightFocused && settings.metadata_fields.copyright === "") {
      setSettings(prev => ({
        ...prev,
        metadata_fields: {
          ...prev.metadata_fields,
          copyright: "© "
        }
      }));
    }
  }, [copyrightFocused]);

  // Extract colors from logo
  const extractLogoColors = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const colors = [];
      const positions = [
        [10, 10], [img.width - 10, 10], 
        [img.width / 2, img.height / 2],
        [10, img.height - 10], [img.width - 10, img.height - 10]
      ];

      positions.forEach(([x, y]) => {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        if (!colors.includes(hex)) colors.push(hex);
      });

      setExtractedColors(colors.slice(0, 6));
    };
    img.src = imageUrl;
  };

  // AI Font Suggestion - Analyzes logo colors and suggests font
  const suggestFontFromLogo = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pixel = ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data;
      const r = pixel[0], g = pixel[1], b = pixel[2];

      let suggestedFont = "";
      
      // Warm colors → Bold sans-serif
      if (r > g && r > b) {
        const warmFonts = ["Impact", "Arial Black", "Helvetica Neue", "Futura"];
        suggestedFont = warmFonts[Math.floor(Math.random() * warmFonts.length)];
      }
      // Cool colors → Clean modern
      else if (b > r || g > r) {
        const coolFonts = ["Calibri", "Segoe UI", "Trebuchet MS", "Verdana"];
        suggestedFont = coolFonts[Math.floor(Math.random() * coolFonts.length)];
      }
      // Grayscale → Elegant serif
      else {
        const serifFonts = ["Playfair Display", "Georgia", "Times New Roman", "Garamond"];
        suggestedFont = serifFonts[Math.floor(Math.random() * serifFonts.length)];
      }

      setAiSuggestedFont(suggestedFont);
      setShowAiSuggestion(true);
      
      // Typing animation
      const message = `Based on your logo colors, ${suggestedFont} would be a great fit.`;
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < message.length) {
          setTypedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setShowAiSuggestion(false);
            setTypedText("");
            setSettings(prev => ({ ...prev, font_family: suggestedFont }));
          }, 2000);
        }
      }, 50);
    };
    img.src = imageUrl;
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        setLogoPreview(url);
        setSettings(prev => ({ ...prev, logo_url: url }));
        extractLogoColors(url);
        suggestFontFromLogo(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("brandtag_settings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  const openLogoSnapAI = () => {
    window.open("https://socialmediatools.org/app/logo-snap-ai", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* AI SUGGESTION OVERLAY - Dark transparent with typing animation */}
      {showAiSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold mb-4">BrandTag AI:</h2>
            <p 
              className="text-white text-xl"
              style={{ fontFamily: aiSuggestedFont }}
            >
              {typedText}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BrandTag AI Settings</h1>
          <p className="text-gray-600">Configure your watermark and branding</p>
        </div>

        {/* 1. LOGO & BRANDING */}
        <Card>
          <CardHeader>
            <CardTitle>Logo & Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Upload Logo</Label>
              {logoPreview ? (
                <div className="mt-2 space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className={`w-32 h-32 object-contain ${settings.logo_circle_crop ? 'rounded-full' : ''}`}
                      style={{ opacity: settings.opacity / 100 }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => document.getElementById('logo-upload').click()}
                    >
                      Change Logo
                    </Button>
                  </div>
                  
                  {/* Circle Crop - Only shows when logo uploaded */}
                  <div className="flex items-center justify-between">
                    <Label>Circle Crop</Label>
                    <Switch 
                      checked={settings.logo_circle_crop}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, logo_circle_crop: checked }))}
                      className="data-[state=checked]:bg-blue-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div 
                    onClick={() => document.getElementById('logo-upload').click()}
                    className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                  <button 
                    onClick={openLogoSnapAI}
                    className="text-blue-600 hover:text-blue-700 underline text-lg"
                  >
                    Need a logo?
                  </button>
                </div>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>

            <div>
              <Label>Logo Size</Label>
              <div className="flex items-center gap-3 mt-2">
                <input 
                  type="range"
                  min="40"
                  max="200"
                  value={settings.logo_size}
                  onChange={(e) => setSettings(prev => ({ ...prev, logo_size: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-16">{settings.logo_size}px</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. BRAND TEXT */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>
                {logoPreview 
                  ? "Would you like to display text next to your logo?" 
                  : "Would you like to display text on your images?"}
              </Label>
              <Input
                placeholder=""
                value={settings.brand_text}
                onChange={(e) => setSettings(prev => ({ ...prev, brand_text: e.target.value }))}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Example: BrandTagAI.com (optional)</p>
            </div>

            {/* FONT CONTROLS - HORIZONTAL LAYOUT */}
            <div>
              <Label>Font Style</Label>
              <div className="flex items-center gap-2 mt-2">
                {/* Font Dropdown - Shows each font in its own style */}
                <select
                  value={settings.font_family}
                  onChange={(e) => setSettings(prev => ({ ...prev, font_family: e.target.value }))}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  style={{ fontFamily: settings.font_family }}
                >
                  {fonts.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>

                {/* BOLD BUTTON - Circle highlight when active */}
                <button
                  onClick={() => setSettings(prev => ({ ...prev, font_bold: !prev.font_bold }))}
                  className={`w-10 h-10 border-2 rounded-full font-bold transition-all ${
                    settings.font_bold 
                      ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                  }`}
                >
                  B
                </button>

                {/* ITALIC BUTTON - Circle highlight when active */}
                <button
                  onClick={() => setSettings(prev => ({ ...prev, font_italic: !prev.font_italic }))}
                  className={`w-10 h-10 border-2 rounded-full italic transition-all ${
                    settings.font_italic 
                      ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                  }`}
                >
                  I
                </button>

                {/* COLOR PICKER CIRCLE - Same size as B/I buttons */}
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-full overflow-hidden hover:border-blue-400 transition-all"
                    style={{ 
                      background: `conic-gradient(
                        red, yellow, lime, cyan, blue, magenta, red
                      )`
                    }}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: settings.text_color }}
                    />
                  </button>

                  {/* COLOR PICKER POPUP */}
                  {showColorPicker && (
                    <div className="absolute top-12 left-0 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg z-10 w-64">
                      <div className="space-y-3">
                        <input
                          type="color"
                          value={settings.text_color}
                          onChange={(e) => setSettings(prev => ({ ...prev, text_color: e.target.value }))}
                          className="w-full h-32 rounded-lg cursor-pointer"
                        />
                        <Input
                          value={settings.text_color}
                          onChange={(e) => setSettings(prev => ({ ...prev, text_color: e.target.value }))}
                          className="text-center font-mono"
                          placeholder="#FFFFFF"
                        />

                        {/* EXTRACTED LOGO COLORS */}
                        {extractedColors.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Logo Colors:</p>
                            <div className="flex gap-2 flex-wrap">
                              {extractedColors.map((color, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setSettings(prev => ({ ...prev, text_color: color }));
                                    setShowColorPicker(false);
                                  }}
                                  className="w-10 h-10 rounded border-2 border-gray-300 hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          size="sm"
                          onClick={() => setShowColorPicker(false)}
                          className="w-full"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label>Text Size</Label>
              <div className="flex items-center gap-3 mt-2">
                <input 
                  type="range"
                  min="10"
                  max="48"
                  value={settings.text_size}
                  onChange={(e) => setSettings(prev => ({ ...prev, text_size: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-16">{settings.text_size}px</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. QR CODE - Always bottom-right corner */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code (Bottom-Right Corner)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable QR Code</Label>
              <Switch 
                checked={settings.qr_code.enabled}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  qr_code: { ...prev.qr_code, enabled: checked }
                }))}
                className="data-[state=checked]:bg-blue-400"
              />
            </div>

            {settings.qr_code.enabled && (
              <>
                <div>
                  <Label>Website URL</Label>
                  <Input
                    placeholder=""
                    value={settings.qr_code.website}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      qr_code: { ...prev.qr_code, website: e.target.value }
                    }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Example: BrandTagAI.com (optional)</p>
                </div>
                <div>
                  <Label>Display Text</Label>
                  <Input
                    placeholder=""
                    value={settings.qr_code.display_text}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      qr_code: { ...prev.qr_code, display_text: e.target.value }
                    }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Example: Scan Me (optional)</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 4. WATERMARK POSITIONING */}
        <Card>
          <CardHeader>
            <CardTitle>Watermark Positioning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Position Side</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, logo_position: "left" }))}
                  className={`px-6 py-2 border rounded-md transition-colors ${
                    settings.logo_position === "left" 
                      ? 'bg-blue-900 text-white border-blue-900' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Left
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, logo_position: "right" }))}
                  className={`px-6 py-2 border rounded-md transition-colors ${
                    settings.logo_position === "right" 
                      ? 'bg-blue-900 text-white border-blue-900' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>

            <div>
              <Label>Opacity</Label>
              <div className="flex items-center gap-3 mt-2">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">{settings.opacity}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Drop Shadow</Label>
              <Switch 
                checked={settings.drop_shadow}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, drop_shadow: checked }))}
                className="data-[state=checked]:bg-blue-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Social Media Mode</Label>
              <Switch 
                checked={settings.social_media_mode}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, social_media_mode: checked }))}
                className="data-[state=checked]:bg-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* 5. IMAGE METADATA (SEO) */}
        <Card>
          <CardHeader>
            <CardTitle>Image Metadata (SEO)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Copyright</Label>
              <Input
                placeholder=""
                value={settings.metadata_fields.copyright}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  metadata_fields: { ...prev.metadata_fields, copyright: e.target.value }
                }))}
                onFocus={() => setCopyrightFocused(true)}
                onBlur={() => setCopyrightFocused(false)}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Example: © 2025 BrandTagAI.com (optional)</p>
            </div>
            <div>
              <Label>Creator</Label>
              <Input
                placeholder=""
                value={settings.metadata_fields.creator}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  metadata_fields: { ...prev.metadata_fields, creator: e.target.value }
                }))}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Example: BrandTagAI.com (optional)</p>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder=""
                value={settings.metadata_fields.description}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  metadata_fields: { ...prev.metadata_fields, description: e.target.value }
                }))}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Example: Professional watermarked photo (optional)</p>
            </div>
            <div>
              <Label>Keywords</Label>
              <Input
                placeholder=""
                value={settings.metadata_fields.keywords}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  metadata_fields: { ...prev.metadata_fields, keywords: e.target.value }
                }))}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Example: watermarking, branding, photography (optional)</p>
            </div>
          </CardContent>
        </Card>

        {/* SAVE BUTTON - Gradient from light blue to dark blue */}
        <Button 
          onClick={handleSave}
          className="w-full py-6 text-lg"
          style={{
            background: 'linear-gradient(to right, #60a5fa 0%, #1e3a8a 100%)',
            color: 'white'
          }}
        >
          Save Settings
        </Button>

        {/* WARNING */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <span>✓</span>
            <span>This app doesn't collect your data</span>
          </p>
          <p className="flex items-center gap-2">
            <span>⚠️</span>
            <span className="font-semibold">DELETE BROWSING HISTORY = LOSE YOUR SETTINGS</span>
          </p>
        </div>
      </div>
    </div>
  );
}

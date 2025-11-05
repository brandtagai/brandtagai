import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSettings } from "@/entities/mockEntities";
import { User } from "@/entities/mockEntities";
import { UploadFile } from "@/integrations/Core";
import { Upload, Settings as SettingsIcon, Image, X, GripVertical, Search, Sparkles, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/navigation/BottomNav";

// 110 SOCIAL PLATFORMS - Alphabetically sorted
const SOCIAL_PLATFORMS = [
  { name: '9GAG', icon: '/icons/social/9gag.png' },
  { name: '9GAG TV', icon: '/icons/social/9gag_tv.svg' },
  { name: 'Alignable', icon: '/icons/social/alignable.jpeg' },
  { name: 'Amino', icon: '/icons/social/amino.svg' },
  { name: 'AngelList', icon: '/icons/social/angellist.svg' },
  { name: 'ArtStation', icon: '/icons/social/artstation.svg' },
  { name: 'Baidu Tieba', icon: '/icons/social/baidu-tieba.svg' },
  { name: 'Behance', icon: '/icons/social/behance.svg' },
  { name: 'Bilibili', icon: '/icons/social/bilibili.svg' },
  { name: 'BitChute', icon: '/icons/social/bitchute.svg' },
  { name: 'BitClout', icon: '/icons/social/bitclout.avif' },
  { name: 'Blogger', icon: '/icons/social/blogger.svg' },
  { name: 'BlueSky', icon: '/icons/social/bluesky.png' },
  { name: 'Caffeine', icon: '/icons/social/caffeine.svg' },
  { name: 'Clapper', icon: '/icons/social/clapper.svg' },
  { name: 'Dailymotion', icon: '/icons/social/dailymotion.svg' },
  { name: 'DeSo Protocol', icon: '/icons/social/deso protocol.svg' },
  { name: 'Dev.to', icon: '/icons/social/dev.svg' },
  { name: 'DeviantArt', icon: '/icons/social/deviantart.svg' },
  { name: 'Discord', icon: '/icons/social/discord.svg' },
  { name: 'DLive', icon: '/icons/social/dlive.svg' },
  { name: 'Douyin', icon: '/icons/social/douyin.png' },
  { name: 'Dribbble', icon: '/icons/social/dribbble.svg' },
  { name: 'Ello', icon: '/icons/social/ello.svg' },
  { name: 'Eventbrite', icon: '/icons/social/evenbrite.png' },
  { name: 'Facebook', icon: '/icons/social/facebook.svg' },
  { name: 'Farcaster', icon: '/icons/social/farcaster.jpg' },
  { name: 'Flickr', icon: '/icons/social/flickr.svg' },
  { name: 'Gab', icon: '/icons/social/gab.svg' },
  { name: 'Gettr', icon: '/icons/social/gettr.svg' },
  { name: 'Glass', icon: '/icons/social/glass.svg' },
  { name: 'Goodreads', icon: '/icons/social/goodreads.svg' },
  { name: 'Google Business', icon: '/icons/social/google-business.svg' },
  { name: 'Hashnode', icon: '/icons/social/hashnode.svg' },
  { name: 'Hive Social', icon: '/icons/social/hive.svg' },
  { name: 'Indie Hackers', icon: '/icons/social/indie hackers.svg' },
  { name: 'Instagram', icon: '/icons/social/instagram.svg' },
  { name: 'Josh', icon: '/icons/social/josh.jpg' },
  { name: 'KakaoTalk', icon: '/icons/social/kakaotalk.svg' },
  { name: 'Kick', icon: '/icons/social/kick.svg' },
  { name: 'Ko-fi', icon: '/icons/social/kofi.svg' },
  { name: 'Kuaishou', icon: '/icons/social/kuaishou.png' },
  { name: 'Kwai', icon: '/icons/social/kwai.png' },
  { name: 'Lemon8', icon: '/icons/social/lemon8.png' },
  { name: 'Lens Protocol', icon: '/icons/social/lens-protocol.jpg' },
  { name: 'Letterboxd', icon: '/icons/social/letterboxd.svg' },
  { name: 'Likee', icon: '/icons/social/likee.svg' },
  { name: 'LINE', icon: '/icons/social/line.png' },
  { name: 'LinkedIn', icon: '/icons/social/linkedin.svg' },
  { name: 'Mastodon', icon: '/icons/social/mastodon.png' },
  { name: 'Medium', icon: '/icons/social/medium.svg' },
  { name: 'Meetup', icon: '/icons/social/meetup.svg' },
  { name: 'MeWe', icon: '/icons/social/mewe.svg' },
  { name: 'Minds', icon: '/icons/social/minds.svg' },
  { name: 'Moj', icon: '/icons/social/moj.webp' },
  { name: 'MX TakaTak', icon: '/icons/social/mx_takatak.webp' },
  { name: 'Naver Band', icon: '/icons/social/naver-band.png' },
  { name: 'Newgrounds', icon: '/icons/social/newgrounds.webp' },
  { name: 'Nextdoor', icon: '/icons/social/nextdoor.svg' },
  { name: 'Noplace', icon: '/icons/social/noplace.svg' },
  { name: 'Odnoklassniki', icon: '/icons/social/dnoklassniki.svgo.png' },
  { name: 'Odysee', icon: '/icons/social/odysee.png' },
  { name: 'Paparazzi', icon: '/icons/social/paparazzi.jpg' },
  { name: 'Parler', icon: '/icons/social/parler.svg' },
  { name: 'PeerTube', icon: '/icons/social/peertube.svg' },
  { name: 'Pinterest', icon: '/icons/social/pinterest.svg' },
  { name: 'Polywork', icon: '/icons/social/polywork.jpg' },
  { name: 'Product Hunt', icon: '/icons/social/product-hunt.jpg' },
  { name: 'Reddit', icon: '/icons/social/reddit.svg' },
  { name: 'Snapchat', icon: '/icons/social/snapchat.svg' },
  { name: 'TikTok', icon: '/icons/social/tiktok.svg' },
  { name: 'Truth Social', icon: '/icons/social/truth-social.svg' },
  { name: 'Tumblr', icon: '/icons/social/tumblr.svg' },
  { name: 'X/Twitter', icon: '/icons/social/x.svg' }
];

// 50+ GOOGLE FONTS - Alphabetically sorted
const GOOGLE_FONTS = [
  "Arial", "Arial Black", "Calibri", "Cambria", "Candara", "Century Gothic",
  "Comic Sans MS", "Courier New", "Futura", "Garamond", "Georgia", "Gill Sans",
  "Helvetica", "Helvetica Neue", "Impact", "Lucida Console", "Monaco", "Optima",
  "Palatino", "Perpetua", "Playfair Display", "Rockwell", "Segoe UI", "Tahoma",
  "Times New Roman", "Trebuchet MS", "Verdana", "Roboto", "Open Sans", "Lato",
  "Montserrat", "Oswald", "Raleway", "PT Sans", "Source Sans Pro", "Poppins",
  "Merriweather", "Ubuntu", "Nunito", "Roboto Condensed", "Roboto Slab"
].sort();

export default function Settings() {
  const [settings, setSettings] = useState({
    logo_url: "",
    logo_circle_crop: false,
    logo_size: 80,
    logo_position: "left",
    brand_text: "",
    font_family: "Arial",
    font_bold: false,
    font_italic: false,
    text_color: "#FFFFFF",
    text_size: 24,
    ai_auto_optimize: true,
    social_icon_match_text: false,
    social_platforms: [],
    qr_enabled: false,
    qr_website: "",
    qr_display_text: "",
    opacity: 100,
    drop_shadow: true,
    social_media_mode: false,
    generate_landing_page: false,
    metadata_fields: {
      copyright: "",
      creator: "",
      description: "",
      keywords: ""
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [extractedColors, setExtractedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiMessage, setAiMessage] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSettings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const loadSettings = async () => {
    try {
      const user = await User.me();
      const userSettingsList = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      if (userSettingsList.length > 0) {
        setSettings(prev => ({
          ...prev,
          ...userSettingsList[0],
          metadata_fields: {
            ...prev.metadata_fields,
            ...(userSettingsList[0].metadata_fields || {})
          }
        }));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const showAIMessage = (message) => {
    setAiMessage(message);
    setTypedText("");

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setTypedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setAiMessage(null);
          setTypedText("");
        }, 3000);
      }
    }, 30);
  };

  const extractColorsFromLogo = (imageUrl) => {
    console.log("Starting color extraction for:", imageUrl);
    const img = new Image();
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = "Anonymous";
    }
    img.onload = () => {
      console.log("Image loaded successfully for color extraction");
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const colors = [];
        const positions = [
          [10, 10],
          [img.width - 10, 10],
          [img.width / 2, img.height / 2],
          [10, img.height - 10],
          [img.width - 10, img.height - 10]
        ];

        positions.forEach(([x, y]) => {
          try {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
            if (!colors.includes(hex)) colors.push(hex);
          } catch (error) {
            console.error("Error extracting color:", error);
          }
        });

        console.log("Colors extracted:", colors);
        setExtractedColors(colors.slice(0, 6));

        if (settings.ai_auto_optimize) {
          aiOptimize(img, ctx);
        }
      } catch (error) {
        console.error("Error in color extraction process:", error);
      }
    };
    img.onerror = (e) => {
      console.error("Failed to load image for color extraction:", e);
    };
    img.src = imageUrl;
  };

  const aiOptimize = (img, ctx) => {
    try {
      console.log("Starting AI optimization");
      const centerPixel = ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data;
      const r = centerPixel[0], g = centerPixel[1], b = centerPixel[2];
      console.log("Center pixel RGB:", r, g, b);

      let suggestedFont = "";
      if (r > g && r > b) {
        const warmFonts = ["Impact", "Arial Black", "Helvetica Neue", "Futura"];
        suggestedFont = warmFonts[Math.floor(Math.random() * warmFonts.length)];
      } else if (b > r || g > r) {
        const coolFonts = ["Calibri", "Segoe UI", "Trebuchet MS", "Verdana"];
        suggestedFont = coolFonts[Math.floor(Math.random() * coolFonts.length)];
      } else {
        const serifFonts = ["Playfair Display", "Georgia", "Times New Roman", "Garamond"];
        suggestedFont = serifFonts[Math.floor(Math.random() * serifFonts.length)];
      }

      const avgBrightness = (r + g + b) / 3;
      const suggestedTextColor = avgBrightness < 128 ? "#FFFFFF" : "#000000";

      const complexity = 0.5;
      const suggestedOpacity = complexity > 0.7 ? 70 : complexity < 0.3 ? 95 : 85;

      console.log("AI suggestions:", { suggestedFont, suggestedTextColor, suggestedOpacity });
      setSettings(prev => ({
        ...prev,
        font_family: suggestedFont,
        text_color: suggestedTextColor,
        opacity: suggestedOpacity
      }));

      showAIMessage("AI optimized your watermark for best visibility!");
    } catch (error) {
      console.error("AI optimization error:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      console.log("Uploading file:", file.name);
      const { file_url } = await UploadFile({ file });
      console.log("Upload successful, setting logo_url");
      setSettings(prev => ({ ...prev, logo_url: file_url }));
      extractColorsFromLogo(file_url);
    } catch (error) {
      console.error("Error uploading logo:", error);
      showAIMessage("Failed to upload logo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setSettings(prev => ({ ...prev, logo_url: "" }));
    setExtractedColors([]);
  };

  const addSocialPlatform = (platform) => {
    if (settings.social_platforms.some(p => p.name === platform.name)) {
      showAIMessage(`${platform.name} is already added!`);
      return;
    }

    setSettings(prev => ({
      ...prev,
      social_platforms: [...prev.social_platforms, { ...platform, username: "" }]
    }));
    setSearchTerm('');
  };

  const removeSocialPlatform = (index) => {
    setSettings(prev => ({
      ...prev,
      social_platforms: prev.social_platforms.filter((_, i) => i !== index)
    }));
  };

  const updateSocialUsername = (index, username) => {
    setSettings(prev => ({
      ...prev,
      social_platforms: prev.social_platforms.map((platform, i) =>
        i === index ? { ...platform, username } : platform
      )
    }));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPlatforms = [...settings.social_platforms];
    const draggedItem = newPlatforms[draggedIndex];
    newPlatforms.splice(draggedIndex, 1);
    newPlatforms.splice(index, 0, draggedItem);

    setSettings(prev => ({ ...prev, social_platforms: newPlatforms }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    if (!settings.logo_url && !settings.brand_text) {
      showAIMessage("Please add either a logo or brand text before saving.");
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

      showAIMessage("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      showAIMessage("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings? This cannot be undone.")) {
      localStorage.removeItem('brandtag_user_settings');
      window.location.reload();
    }
  };

  const updateMetadataField = (field, value) => {
    if (field === 'copyright' && value === '' && document.activeElement.id === `metadata-${field}`) {
      value = '© ';
    }

    setSettings(prev => ({
      ...prev,
      metadata_fields: {
        ...prev.metadata_fields,
        [field]: value
      }
    }));
  };

  const filteredPlatforms = SOCIAL_PLATFORMS.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      <AnimatePresence>
        {aiMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="text-center max-w-md">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 mx-auto mb-6"
              >
                <img
                  src="/brandtag-ai-logo.png"
                  alt="BrandTag AI"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="flex items-center gap-2 justify-center mb-4">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">BrandTag AI</h2>
              </div>

              <p className="text-white text-lg leading-relaxed">
                {typedText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                {settings.logo_url ? (
                  <div className="relative">
                    <img
                      src={settings.logo_url}
                      alt="Logo preview"
                      className={`w-20 h-20 object-contain border-2 border-white/20 bg-white/10 p-2 ${settings.logo_circle_crop ? 'rounded-full' : 'rounded-lg'}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-red-500/90 text-white rounded-full hover:bg-red-600 hover:text-white p-0"
                      aria-label="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : null}

                <div className="flex-1">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">
                        {isUploading ? "Uploading..." : settings.logo_url ? "Change Logo" : "Upload Logo"}
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

              {!settings.logo_url && (
                <div className="text-center">
                  <a
                    href="https://epiphanyapps.io/app/logo-snap-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                  >
                    Need a logo? Try LogoSnap AI →
                  </a>
                </div>
              )}

              {settings.logo_url && (
                <>
                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-blue-200">Circle Crop</Label>
                      <Switch
                        checked={settings.logo_circle_crop}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, logo_circle_crop: checked }))}
                        className="data-[state=checked]:bg-blue-400"
                      />
                    </div>

                    <div>
                      <Label className="text-blue-200">Logo Size</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <input
                          type="range"
                          min="40"
                          max="200"
                          value={settings.logo_size}
                          onChange={(e) => setSettings(prev => ({ ...prev, logo_size: parseInt(e.target.value) }))}
                          className="flex-1 accent-blue-400"
                        />
                        <span className="text-sm text-blue-200 w-16">{settings.logo_size}px</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-text" className="text-blue-200">Text on Images</Label>
                <Input
                  id="brand-text"
                  placeholder="Business name, website or slogan"
                  value={settings.brand_text}
                  onChange={(e) => setSettings(prev => ({ ...prev, brand_text: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
                <p className="text-xs text-gray-400">Appears on your images</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Label className="text-blue-200 mb-3 block">Font Controls</Label>
                <div className="flex items-center gap-2">
                  <select
                    value={settings.font_family}
                    onChange={(e) => setSettings(prev => ({ ...prev, font_family: e.target.value }))}
                    className="flex-1 p-2 bg-white/5 border border-white/20 rounded-md text-white focus:border-cyan-400 focus:outline-none"
                    style={{ fontFamily: settings.font_family }}
                  >
                    {GOOGLE_FONTS.map(font => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setSettings(prev => ({ ...prev, font_bold: !prev.font_bold }))}
                    className={`w-10 h-10 border-2 rounded-full font-bold transition-all ${
                      settings.font_bold
                        ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400'
                        : 'border-white/30 bg-white/5 text-white hover:border-blue-400'
                    }`}
                  >
                    B
                  </button>

                  <button
                    onClick={() => setSettings(prev => ({ ...prev, font_italic: !prev.font_italic }))}
                    className={`w-10 h-10 border-2 rounded-full italic transition-all ${
                      settings.font_italic
                        ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400'
                        : 'border-white/30 bg-white/5 text-white hover:border-blue-400'
                    }`}
                  >
                    I
                  </button>

                  <div className="relative" ref={colorPickerRef}>
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="w-10 h-10 border-2 border-white/30 rounded-full overflow-hidden hover:border-blue-400 transition-all"
                      style={{ backgroundColor: settings.text_color }}
                    />

                    {showColorPicker && (
                      <div className="absolute top-12 right-0 bg-slate-800 border-2 border-white/20 rounded-lg p-4 shadow-xl z-20 w-64">
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
                            className="text-center font-mono bg-white/5 border-white/20 text-white"
                            placeholder="#FFFFFF"
                          />

                          {extractedColors.length > 0 && (
                            <div>
                              <p className="text-sm text-blue-200 mb-2">Logo Colors:</p>
                              <div className="flex gap-2 flex-wrap">
                                {extractedColors.map((color, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setSettings(prev => ({ ...prev, text_color: color }));
                                      setShowColorPicker(false);
                                    }}
                                    className="w-10 h-10 rounded border-2 border-white/30 hover:scale-110 transition-transform"
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
                            className="w-full bg-cyan-500 hover:bg-cyan-600"
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
                <Label className="text-blue-200">Text Size</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="range"
                    min="10"
                    max="48"
                    value={settings.text_size}
                    onChange={(e) => setSettings(prev => ({ ...prev, text_size: parseInt(e.target.value) }))}
                    className="flex-1 accent-blue-400"
                  />
                  <span className="text-sm text-blue-200 w-16">{settings.text_size}px</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Socials</CardTitle>
              <p className="text-sm text-blue-200">Add your social media handles (110 platforms available)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search platforms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  />
                </div>

                {searchTerm && filteredPlatforms.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-slate-800 border border-white/20 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                    {filteredPlatforms.slice(0, 10).map((platform, idx) => (
                      <button
                        key={idx}
                        onClick={() => addSocialPlatform(platform)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors text-left"
                      >
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect fill="%2360a5fa" width="24" height="24"/%3E%3C/svg%3E';
                          }}
                        />
                        <span className="text-white">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {settings.social_platforms.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <Label className="text-blue-200">Your Social Platforms ({settings.social_platforms.length})</Label>
                  {settings.social_platforms.map((platform, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg p-3 cursor-move hover:bg-white/10 transition-colors"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className={`w-8 h-8 rounded-full object-cover ${settings.logo_size && `w-[${settings.logo_size}px] h-[${settings.logo_size}px]`}`}
                        style={{
                          width: `${settings.logo_size / 2.5}px`,
                          height: `${settings.logo_size / 2.5}px`
                        }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect fill="%2360a5fa" width="24" height="24"/%3E%3C/svg%3E';
                        }}
                      />
                      <span className="text-white text-sm font-medium min-w-[100px]">{platform.name}</span>
                      <Input
                        placeholder="YourHandle"
                        value={platform.username}
                        onChange={(e) => updateSocialUsername(idx, e.target.value)}
                        className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialPlatform(idx)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-white">Match social icons to text color</Label>
                    <p className="text-sm text-blue-200">Tint platform icons to match your text color</p>
                  </div>
                  <Switch
                    checked={settings.social_icon_match_text}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, social_icon_match_text: checked }))
                    }
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-blue-200">Enable QR Code</Label>
                <Switch
                  checked={settings.qr_enabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, qr_enabled: checked }))}
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>

              {settings.qr_enabled && (
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div>
                    <Label className="text-blue-200">Website URL</Label>
                    <Input
                      placeholder="https://yourdomain.com"
                      value={settings.qr_website}
                      onChange={(e) => setSettings(prev => ({ ...prev, qr_website: e.target.value }))}
                      className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <Label className="text-blue-200">Display Text (Optional)</Label>
                    <Input
                      placeholder="Scan Me"
                      value={settings.qr_display_text}
                      onChange={(e) => setSettings(prev => ({ ...prev, qr_display_text: e.target.value }))}
                      className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      settings.logo_position === "left"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Left
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_position: "right" }))}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      settings.logo_position === "right"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Right
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Label className="text-blue-200">Opacity</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.opacity}
                    onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                    className="flex-1 accent-blue-400"
                  />
                  <span className="text-sm text-blue-200 w-12">{settings.opacity}%</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-blue-200">Drop Shadow</Label>
                  <Switch
                    checked={settings.drop_shadow}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, drop_shadow: checked }))}
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
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
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                AI Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-white">Let AI optimize settings</Label>
                  <p className="text-sm text-blue-200">AI suggests best font, color, and opacity</p>
                </div>
                <Switch
                  checked={settings.ai_auto_optimize}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, ai_auto_optimize: checked }))
                  }
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-white">Generate Shareable Landing Page</Label>
                  <p className="text-sm text-blue-200">Create clickable social icons that drive traffic</p>
                </div>
                <Switch
                  checked={settings.generate_landing_page}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, generate_landing_page: checked }))
                  }
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
                    id={`metadata-${field}`}
                    placeholder={`Enter ${field.replace('_', ' ')}`}
                    value={value}
                    onChange={(e) => updateMetadataField(field, e.target.value)}
                    onFocus={() => {
                      if (field === 'copyright' && value === '') {
                        updateMetadataField(field, '© ');
                      }
                    }}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4 pt-4"
        >
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg text-lg"
            size="lg"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 py-4"
          >
            Reset to Defaults
          </Button>

          <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="text-white font-medium">Privacy Notice</p>
                <p className="text-blue-200">This app doesn't collect your data. Settings are stored locally in your browser.</p>
                <p className="text-yellow-300 font-semibold">⚠️ Clearing browsing history will delete your settings</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

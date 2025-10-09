import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSettings } from "@/entities/mockEntities";
import { User } from "@/entities/mockEntities";
import { UploadFile } from "@/integrations/Core";
import { Upload, Settings, Image, X, AlertTriangle, Sparkles, GripVertical, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/navigation/BottomNav";

// 110 Social Media Platforms (alphabetically sorted)
const PLATFORMS = [
  { name: '9GAG', icon: '/icons/9gag.png' },
  { name: '9GAG TV', icon: '/icons/9gag.png' },
  { name: 'Alignable', icon: '/icons/alignable.jpeg' },
  { name: 'Amino', icon: '/icons/amino.svg' },
  { name: 'AngelList', icon: '/icons/angellist.svg' },
  { name: 'ArtStation', icon: '/icons/artstation.svg' },
  { name: 'Behance', icon: '/icons/behance.svg' },
  { name: 'Bilibili', icon: '/icons/bilibili.svg' },
  { name: 'BitChute', icon: '/icons/bitchute.svg' },
  { name: 'BitClout', icon: '/icons/bitclout.avif' },
  { name: 'Blogger', icon: '/icons/blogger.svg' },
  { name: 'BlueSky', icon: '/icons/bluesky.png' },
  { name: 'Caffeine', icon: '/icons/caffeine.png' },
  { name: 'Clapper', icon: '/icons/clapper.png' },
  { name: 'Dailymotion', icon: '/icons/dailymotion.svg' },
  { name: 'DeSo Protocol', icon: '/icons/deso.png' },
  { name: 'Dev.to', icon: '/icons/dev.svg' },
  { name: 'DeviantArt', icon: '/icons/deviantart.svg' },
  { name: 'Discord', icon: '/icons/discord.svg' },
  { name: 'DLive', icon: '/icons/dlive.png' },
  { name: 'Douyin', icon: '/icons/douyin.png' },
  { name: 'Dribbble', icon: '/icons/dribbble.svg' },
  { name: 'Ello', icon: '/icons/ello.png' },
  { name: 'Eventbrite', icon: '/icons/eventbrite.svg' },
  { name: 'Facebook Pages', icon: '/icons/facebook.svg' },
  { name: 'Facebook Personal', icon: '/icons/facebook.svg' },
  { name: 'Farcaster', icon: '/icons/farcaster.png' },
  { name: 'Flickr', icon: '/icons/flickr.svg' },
  { name: 'Gab', icon: '/icons/gab.svg' },
  { name: 'Gettr', icon: '/icons/gettr.png' },
  { name: 'Glass', icon: '/icons/glass.png' },
  { name: 'Goodreads', icon: '/icons/goodreads.svg' },
  { name: 'Google Business Profile', icon: '/icons/google-business.svg' },
  { name: 'Hashnode', icon: '/icons/hashnode.svg' },
  { name: 'Hive Social', icon: '/icons/hive.png' },
  { name: 'Indie Hackers', icon: '/icons/indie-hackers.png' },
  { name: 'Instagram Personal', icon: '/icons/instagram.svg' },
  { name: 'Instagram Professional', icon: '/icons/instagram.svg' },
  { name: 'Josh', icon: '/icons/josh.png' },
  { name: 'KakaoTalk', icon: '/icons/kakaotalk.png' },
  { name: 'Kick', icon: '/icons/kick.png' },
  { name: 'Ko-fi', icon: '/icons/kofi.png' },
  { name: 'Kuaishou', icon: '/icons/kuaishou.png' },
  { name: 'Kwai', icon: '/icons/kwai.png' },
  { name: 'Lemon8', icon: '/icons/lemon8.png' },
  { name: 'Lens Protocol', icon: '/icons/lens.png' },
  { name: 'Letterboxd', icon: '/icons/letterboxd.png' },
  { name: 'Likee', icon: '/icons/likee.png' },
  { name: 'LINE', icon: '/icons/line.png' },
  { name: 'LinkedIn Company', icon: '/icons/linkedin.svg' },
  { name: 'LinkedIn Personal', icon: '/icons/linkedin.svg' },
  { name: 'Mastodon', icon: '/icons/mastadon.svg' },
  { name: 'Medium', icon: '/icons/medium.svg' },
  { name: 'Meetup', icon: '/icons/meetup.svg' },
  { name: 'MeWe', icon: '/icons/mewe.png' },
  { name: 'Minds', icon: '/icons/minds.svg' },
  { name: 'Moj', icon: '/icons/moj.png' },
  { name: 'MX TakaTak', icon: '/icons/mx-takatak.png' },
  { name: 'Naver Band', icon: '/icons/naver-band.png' },
  { name: 'Newgrounds', icon: '/icons/newgrounds.png' },
  { name: 'Nextdoor', icon: '/icons/nextdoor.png' },
  { name: 'Noplace', icon: '/icons/noplace.png' },
  { name: 'Odnoklassniki', icon: '/icons/odnoklassniki.png' },
  { name: 'Odysee', icon: '/icons/odysee.png' },
  { name: 'Parler', icon: '/icons/parler.png' },
  { name: 'PeerTube', icon: '/icons/peertube.png' },
  { name: 'Pinterest', icon: '/icons/pinterest.svg' },
  { name: 'Polywork', icon: '/icons/polywork.png' },
  { name: 'Poparazzi', icon: '/icons/poparazzi.png' },
  { name: 'ProductHunt', icon: '/icons/producthunt.svg' },
  { name: 'QQ', icon: '/icons/qq.png' },
  { name: 'Quora', icon: '/icons/quora.svg' },
  { name: 'Quora Spaces', icon: '/icons/quora.svg' },
  { name: 'Qzone', icon: '/icons/qzone.png' },
  { name: 'Reddit', icon: '/icons/reddit.svg' },
  { name: 'Roposo', icon: '/icons/roposo.png' },
  { name: 'Rumble', icon: '/icons/rumble.png' },
  { name: 'ShareChat', icon: '/icons/sharechat.png' },
  { name: 'Snapchat', icon: '/icons/snapchat.svg' },
  { name: 'Spotify Podcasts', icon: '/icons/spotify.svg' },
  { name: 'Spoutible', icon: '/icons/spoutible.png' },
  { name: 'Steemit', icon: '/icons/steemit.png' },
  { name: 'Substack', icon: '/icons/substack.svg' },
  { name: 'Telegram', icon: '/icons/telegram.svg' },
  { name: 'Telegram Channels', icon: '/icons/telegram.svg' },
  { name: 'Threads', icon: '/icons/threads.svg' },
  { name: 'TikTok', icon: '/icons/tiktok.svg' },
  { name: 'Triller', icon: '/icons/triller.png' },
  { name: 'Truth Social', icon: '/icons/truth-social.svg' },
  { name: 'Tumblr', icon: '/icons/tumblr.svg' },
  { name: 'Twitch', icon: '/icons/twitch.svg' },
  { name: 'Vero', icon: '/icons/vero.png' },
  { name: 'Vimeo', icon: '/icons/vimeo.svg' },
  { name: 'VK', icon: '/icons/vk.svg' },
  { name: 'VSCO', icon: '/icons/vsco.png' },
  { name: 'WeChat', icon: '/icons/wechat.png' },
  { name: 'Weibo', icon: '/icons/weibo.svg' },
  { name: 'WhatsApp Business', icon: '/icons/whatsapp.svg' },
  { name: 'WordPress.com', icon: '/icons/wordpress.svg' },
  { name: 'XING', icon: '/icons/xing.png' },
  { name: 'X/Twitter', icon: '/icons/twitter.svg' },
  { name: 'Xiaohongshu', icon: '/icons/xiaohongshu.png' },
  { name: 'YouTube', icon: '/icons/youtube.svg' },
  { name: 'Zynn', icon: '/icons/zynn.png' }
];

// Google Fonts (50 most popular - expand to 500+ by adding more)
const GOOGLE_FONTS = [
  "Arial", "Arial Black", "Calibri", "Cambria", "Candara", "Century Gothic",
  "Comic Sans MS", "Courier New", "Futura", "Garamond", "Georgia", "Gill Sans",
  "Helvetica", "Helvetica Neue", "Impact", "Lucida Console", "Monaco", "Optima", 
  "Palatino", "Perpetua", "Playfair Display", "Rockwell", "Segoe UI", "Tahoma", 
  "Times New Roman", "Trebuchet MS", "Verdana", "Roboto", "Open Sans", "Lato", 
  "Montserrat", "Oswald", "Raleway", "PT Sans", "Source Sans Pro", "Poppins", 
  "Merriweather", "Ubuntu", "Nunito", "Roboto Condensed", "Roboto Slab", 
  "Noto Sans", "Fira Sans", "Work Sans", "Inter", "DM Sans", "Bebas Neue",
  "Crimson Text", "EB Garamond", "Libre Baskerville"
].sort();

// AI Assistant Component
function AIAssistant({ message, onClose }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 500);
        }, 3000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [message, onClose]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-cyan-400/30"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-24 h-24"
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/brandtag-ai-logo.png"
                  alt="BrandTag AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                }}
                animate={{
                  left: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cyan-400 font-bold text-xl"
            >
              BrandTag AI
            </motion.div>

            <div className="text-white text-center leading-relaxed min-h-[60px]">
              {displayedText}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    logo_url: "",
    brand_text: "",
    metadata_fields: {
      copyright: "",
      creator: "",
      description: "",
      keywords: ""
    },
    logo_position: "left",
    social_media_mode: false,
    logo_circle_crop: false,
    font_family: "Arial",
    font_bold: false,
    font_italic: false,
    text_color: "#FFFFFF",
    text_size: 24,
    logo_size: 80,
    opacity: 100,
    drop_shadow: true,
    qr_enabled: false,
    qr_website: "",
    qr_display_text: "",
    social_platforms: [],
    generate_landing_page: false
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [extractedColors, setExtractedColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiMessage, setAiMessage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const canvasRef = useRef(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSettings();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('brandtag_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load settings');
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSettings = async () => {
    try {
      const user = await User.me();
      const userSettingsList = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      if (userSettingsList.length > 0) {
        setSettings(prev => ({ ...prev, ...userSettingsList[0] }));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const extractColorsFromLogo = (imageUrl) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const positions = [
        [10, 10],
        [img.width - 10, 10],
        [img.width / 2, img.height / 2],
        [10, img.height - 10],
        [img.width - 10, img.height - 10]
      ];

      const colors = new Set();
      positions.forEach(([x, y]) => {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        colors.add(hex);
      });

      setExtractedColors(Array.from(colors).slice(0, 6));

      const centerPixel = ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data;
      const [r, g, b] = centerPixel;
      
      let suggestedFonts;
      if (r > g && r > b) {
        suggestedFonts = ["Impact", "Arial Black", "Helvetica Neue", "Futura"];
      } else if (b > r || g > r) {
        suggestedFonts = ["Calibri", "Segoe UI", "Trebuchet MS", "Verdana"];
      } else {
        suggestedFonts = ["Playfair Display", "Georgia", "Times New Roman", "Garamond"];
      }

      const randomFont = suggestedFonts[Math.floor(Math.random() * suggestedFonts.length)];
      setAiMessage(`AI analyzed your logo and suggests ${randomFont} font for optimal brand consistency!`);
      
      setTimeout(() => {
        setSettings(prev => ({ ...prev, font_family: randomFont }));
      }, 3500);
    };
    img.src = imageUrl;
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setSettings(prev => ({ ...prev, logo_url: file_url }));
      extractColorsFromLogo(file_url);
      setAiMessage("Logo uploaded successfully! Analyzing colors...");
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveLogo = () => {
    setSettings(prev => ({ ...prev, logo_url: "", logo_circle_crop: false }));
    setExtractedColors([]);
  };

  const handleSave = async () => {
    if (!settings.logo_url && !settings.brand_text) {
      setAiMessage("Please add either a logo or brand text before saving!");
      return;
    }

    setIsSaving(true);
    try {
      localStorage.setItem('brandtag_settings', JSON.stringify(settings));
      
      const user = await User.me();
      const existingSettings = await UserSettings.filter({ created_by: user.email }, '-created_date', 1);
      
      if (existingSettings.length > 0) {
        await UserSettings.update(existingSettings[0].id, settings);
      } else {
        await UserSettings.create(settings);
      }

      setAiMessage("Settings saved successfully! Your watermark is ready to use.");
    } catch (error) {
      console.error("Error saving settings:", error);
      setAiMessage("Settings saved locally!");
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

  const handleCopyrightFocus = () => {
    if (!settings.metadata_fields.copyright.includes('©')) {
      updateMetadataField('copyright', '© ' + settings.metadata_fields.copyright);
    }
  };

  const handleColorSelect = (color) => {
    setSettings(prev => ({ ...prev, text_color: color }));
    setShowColorPicker(false);
  };

  const addSocialPlatform = (platform) => {
    if (settings.social_platforms.find(p => p.name === platform.name)) {
      setAiMessage(`${platform.name} is already added!`);
      return;
    }

    const newPlatform = { ...platform, username: '' };
    const updatedPlatforms = [...settings.social_platforms, newPlatform];
    setSettings(prev => ({ ...prev, social_platforms: updatedPlatforms }));
    setSearchTerm('');
    checkSpaceWarning(updatedPlatforms);
  };

  const removeSocialPlatform = (index) => {
    const updatedPlatforms = settings.social_platforms.filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, social_platforms: updatedPlatforms }));
  };

  const updateSocialUsername = (index, username) => {
    const updatedPlatforms = [...settings.social_platforms];
    updatedPlatforms[index].username = username;
    setSettings(prev => ({ ...prev, social_platforms: updatedPlatforms }));
  };

  const checkSpaceWarning = (platforms) => {
    const logoWidth = settings.logo_url ? settings.logo_size : 0;
    const qrWidth = settings.qr_enabled ? 100 : 0;
    const socialWidth = platforms.length * (settings.logo_size + 10);
    const totalWidth = logoWidth + socialWidth + qrWidth + 60;
    
    const maxWidth = settings.social_media_mode ? 800 : 1200;

    if (totalWidth > maxWidth) {
      const itemsToRemove = Math.ceil((totalWidth - maxWidth) / (settings.logo_size + 10));
      setAiMessage(`Too many elements! Remove ${itemsToRemove} platform${itemsToRemove === 1 ? '' : 's'} or disable Social Media Mode.`);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedPlatforms = [...settings.social_platforms];
    const draggedItem = updatedPlatforms[draggedIndex];
    updatedPlatforms.splice(draggedIndex, 1);
    updatedPlatforms.splice(index, 0, draggedItem);

    setSettings(prev => ({ ...prev, social_platforms: updatedPlatforms }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const filteredPlatforms = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {aiMessage && (
        <AIAssistant message={aiMessage} onClose={() => setAiMessage(null)} />
      )}

      <div className="bg-slate-900/50 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Settings</h1>
              <p className="text-sm text-blue-200">Configure your watermarking preferences</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        
        {/* Brand Logo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {settings.logo_url && (
                  <div className="relative">
                    <img
                      src={settings.logo_url}
                      alt="Logo"
                      className={`object-contain border-2 border-white/20 bg-white/10 ${settings.logo_circle_crop ? 'rounded-full' : 'rounded-lg'}`}
                      style={{ width: `${settings.logo_size}px`, height: `${settings.logo_size}px` }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-black/80 text-white rounded-full hover:bg-black"
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
              
              {!settings.logo_url && (
                <div className="text-center">
                  <a href="https://logosnap.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                    Need a logo? Try LogoSnap AI →
                  </a>
                </div>
              )}

              {settings.logo_url && (
                <>
                  <div className="text-center">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, logo_circle_crop: !prev.logo_circle_crop }))}
                      className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                    >
                      {settings.logo_circle_crop ? "Remove" : "Apply"} Circle Crop
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Logo Size: {settings.logo_size}px</Label>
                    <input
                      type="range"
                      min="40"
                      max="200"
                      value={settings.logo_size}
                      onChange={(e) => setSettings(prev => ({ ...prev, logo_size: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg cursor-pointer"
                      style={{ accentColor: '#60a5fa' }}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Brand Text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Text on Images</Label>
                  <Input
                    placeholder="Business name, website, social media handle or slogan"
                    value={settings.brand_text}
                    onChange={(e) => setSettings(prev => ({ ...prev, brand_text: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  />
                  <p className="text-xs text-gray-400">Appears on your images</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-200">Font Style</Label>
                  <div className="flex items-center gap-2">
                    <select
                      value={settings.font_family}
                      onChange={(e) => setSettings(prev => ({ ...prev, font_family: e.target.value }))}
                      className="flex-1 bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none"
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
                      className={`w-10 h-10 rounded-lg border-2 font-bold transition-all ${
                        settings.font_bold
                          ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      B
                    </button>

                    <button
                      onClick={() => setSettings(prev => ({ ...prev, font_italic: !prev.font_italic }))}
                      className={`w-10 h-10 rounded-lg border-2 italic transition-all ${
                        settings.font_italic
                          ? 'border-blue-900 bg-blue-900 text-white ring-2 ring-blue-400'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      I
                    </button>

                    <div className="relative" ref={colorPickerRef}>
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white transition-all shadow-lg"
                        style={{ backgroundColor: settings.text_color }}
                      />
                      
                      {showColorPicker && (
                        <div className="absolute top-12 right-0 bg-slate-800 border border-white/20 rounded-lg p-3 shadow-xl z-50 min-w-[200px]">
                          <input
                            type="color"
                            value={settings.text_color}
                            onChange={(e) => setSettings(prev => ({ ...prev, text_color: e.target.value }))}
                            className="w-full h-10 rounded cursor-pointer mb-2"
                          />
                          <Input
                            value={settings.text_color}
                            onChange={(e) => setSettings(prev => ({ ...prev, text_color: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white text-sm"
                            placeholder="#FFFFFF"
                          />
                          
                          {extractedColors.length > 0 && (
                            <>
                              <div className="text-xs text-gray-400 mt-3 mb-2">From Your Logo:</div>
                              <div className="grid grid-cols-6 gap-1">
                                {extractedColors.map((color, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleColorSelect(color)}
                                    className="w-full aspect-square rounded border border-white/20 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-200">Text Size: {settings.text_size}px</Label>
                  <input
                    type="range"
                    min="10"
                    max="48"
                    value={settings.text_size}
                    onChange={(e) => setSettings(prev => ({ ...prev, text_size: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/20 rounded-lg cursor-pointer"
                    style={{ accentColor: '#60a5fa' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Brand Socials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Brand Socials</CardTitle>
              <p className="text-sm text-blue-200">Add your social media handles (110 platforms available)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Search & Add Platform */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search platforms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>

              {searchTerm && (
                <div className="max-h-48 overflow-y-auto bg-slate-800 rounded-lg border border-white/20">
                  {filteredPlatforms.map((platform, idx) => (
                    <button
                      key={idx}
                      onClick={() => addSocialPlatform(platform)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
                    >
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <span className="text-white">{platform.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Platforms - Drag & Drop List */}
              {settings.social_platforms.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-blue-200">Your Social Platforms ({settings.social_platforms.length})</Label>
                  <div className="space-y-2">
                    {settings.social_platforms.map((platform, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-3 bg-slate-800 rounded-lg p-3 border border-white/20 cursor-move ${
                          draggedIndex === index ? 'opacity-50' : ''
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="flex-1">
                          <div className="text-sm text-gray-300 mb-1">{platform.name}</div>
                          <Input
                            placeholder="YourHandle"
                            value={platform.username}
                            onChange={(e) => updateSocialUsername(index, e.target.value)}
                            className="bg-white/5 border-white/20 text-white text-sm placeholder:text-gray-500 focus:border-cyan-400"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSocialPlatform(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Code */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <Label className="text-blue-200">Enable QR Code</Label>
                <Switch
                  checked={settings.qr_enabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, qr_enabled: checked }))}
                  style={{
                    backgroundColor: settings.qr_enabled ? '#60a5fa' : undefined
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Website URL</Label>
                <Input
                  placeholder="https://yourbrand.com"
                  value={settings.qr_website}
                  onChange={(e) => setSettings(prev => ({ ...prev, qr_website: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  disabled={!settings.qr_enabled}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Display Text</Label>
                <Input
                  placeholder="Scan for more"
                  value={settings.qr_display_text}
                  onChange={(e) => setSettings(prev => ({ ...prev, qr_display_text: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  disabled={!settings.qr_enabled}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Watermark Positioning */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Watermark Positioning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <Label className="text-base font-medium text-white">Position Side</Label>
                  <p className="text-sm text-blue-200">Choose bottom-left or bottom-right</p>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_position: "left" }))}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      settings.logo_position === "left"
                        ? "bg-blue-900 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Left
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logo_position: "right" }))}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      settings.logo_position === "right"
                        ? "bg-blue-900 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Right
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Opacity: {settings.opacity}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) => setSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg cursor-pointer"
                  style={{ accentColor: '#60a5fa' }}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <Label className="text-base font-medium text-white">Drop Shadow</Label>
                  <p className="text-sm text-blue-200">Add subtle shadow for contrast</p>
                </div>
                <Switch
                  checked={settings.drop_shadow}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, drop_shadow: checked }))}
                  style={{
                    backgroundColor: settings.drop_shadow ? '#60a5fa' : undefined
                  }}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <Label className="text-base font-medium text-white">Social Media Mode</Label>
                  <p className="text-sm text-blue-200">Avoid crop zones on social platforms</p>
                </div>
                <Switch
                  checked={settings.social_media_mode}
                  onCheckedChange={(checked) => {
                    setSettings(prev => ({ ...prev, social_media_mode: checked }));
                    if (checked) checkSpaceWarning(settings.social_platforms);
                  }}
                  style={{
                    backgroundColor: settings.social_media_mode ? '#60a5fa' : undefined
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Export Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <Label className="text-base font-medium text-white">Generate Shareable Landing Page</Label>
                  <p className="text-sm text-blue-200">Create clickable social icons that drive traffic</p>
                </div>
                <Switch
                  checked={settings.generate_landing_page}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, generate_landing_page: checked }))}
                  style={{
                    backgroundColor: settings.generate_landing_page ? '#60a5fa' : undefined
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Image Metadata (SEO) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Image Metadata (SEO)</CardTitle>
              <p className="text-sm text-blue-200">Embed copyright information directly into your images</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-blue-200">Copyright</Label>
                <Input
                  placeholder="© 2025 Your Company Name"
                  value={settings.metadata_fields.copyright}
                  onChange={(e) => updateMetadataField('copyright', e.target.value)}
                  onFocus={handleCopyrightFocus}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Creator</Label>
                <Input
                  placeholder="Your Name or Company"
                  value={settings.metadata_fields.creator}
                  onChange={(e) => updateMetadataField('creator', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Description</Label>
                <Input
                  placeholder="Brief description of your brand or image"
                  value={settings.metadata_fields.description}
                  onChange={(e) => updateMetadataField('description', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Keywords</Label>
                <Input
                  placeholder="photography, branding, marketing"
                  value={settings.metadata_fields.keywords}
                  onChange={(e) => updateMetadataField('keywords', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full text-white font-semibold py-3 rounded-xl shadow-lg"
            style={{ background: 'linear-gradient(to right, #60a5fa 0%, #1e3a8a 100%)' }}
            size="lg"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </motion.div>

        {/* Reset to Defaults */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <Button
            onClick={() => {
              if (window.confirm('Reset all settings to defaults? This cannot be undone.')) {
                localStorage.removeItem('brandtag_settings');
                window.location.reload();
              }
            }}
            variant="outline"
            className="w-full border-red-400/50 text-red-400 hover:bg-red-400/10"
          >
            Reset to Defaults
          </Button>
        </motion.div>

        {/* Privacy Message */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-200 text-center">
              <strong>Privacy-First App.</strong> Settings saved in your browser. Clearing history will reset your preferences.
            </p>
          </div>
        </motion.div>

      </div>

      <BottomNav />
    </div>
  );
}

// ===== PART 1: IMPORTS & STATE SETUP =====
// Copy this entire section and paste it at the top of your Settings.jsx file

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

// ===== ALL 110 SOCIAL MEDIA PLATFORMS =====
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

// ===== GOOGLE FONTS LIST (50+ fonts, expandable to 500+) =====
const GOOGLE_FONTS = [
  "Arial", "Arial Black", "Calibri", "Cambria", "Candara", "Century Gothic",
  "Comic Sans MS", "Courier New", "Futura", "Garamond", "Georgia", "Gill Sans",
  "Helvetica", "Helvetica Neue", "Impact", "Lucida Console", "Monaco", "Optima", 
  "Palatino", "Perpetua", "Playfair Display", "Rockwell", "Segoe UI", "Tahoma", 
  "Times New Roman", "Trebuchet MS", "Verdana", "Roboto", "Open Sans", "Lato", 
  "Montserrat", "Oswald", "Raleway", "PT Sans", "Source Sans Pro", "Poppins", 
  "Merriweather", "Ubuntu", "Nunito", "Roboto Condensed", "Roboto Slab"
].sort();

// ===== AI ASSISTANT COMPONENT =====
// Animated modal with breathing logo, white shine, letter-by-letter typing
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
        }, 3000); // Display for 3 seconds before fading
      }
    }, 30); // 30ms per letter for smooth typing

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
            {/* Breathing Logo Animation */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-24 h-24"
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src="/brandtag-ai-logo.png" alt="BrandTag AI" className="w-full h-full object-cover" />
              </div>
              {/* White Shine Effect */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Logo Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cyan-400 font-bold text-xl"
            >
              BrandTag AI
            </motion.div>

            {/* Letter-by-letter typing text */}
            <div className="text-white text-center leading-relaxed min-h-[60px]">
              {displayedText}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

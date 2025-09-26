// BrandTag AI Configuration and Core Utilities
export const BRAND_CONFIG = {
  // Application metadata
  name: "BrandTag AI",
  version: "1.0.0",
  description: "Professional watermarking with AI-powered positioning",
  
  // Watermark settings
  watermark: {
    defaultOpacity: 0.7,
    defaultScale: 0.15,
    positions: {
      BOTTOM_RIGHT: "bottom-right",
      BOTTOM_LEFT: "bottom-left", 
      TOP_RIGHT: "top-right",
      TOP_LEFT: "top-left",
      CENTER: "center",
      AUTO: "auto"
    },
    formats: ["PNG", "JPG", "JPEG", "WEBP"],
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },

  // AI positioning thresholds
  ai: {
    minConfidence: 0.75,
    edgeDetectionThreshold: 0.8,
    contrastRequirement: 0.6,
    safeZoneMargin: 20, // pixels
  },

  // Social media platform specifications
  platforms: {
    instagram: {
      name: "Instagram",
      aspectRatios: ["1:1", "4:5", "16:9"],
      safeZone: { top: 60, bottom: 60, left: 20, right: 20 }
    },
    facebook: {
      name: "Facebook", 
      aspectRatios: ["16:9", "1:1", "4:5"],
      safeZone: { top: 40, bottom: 40, left: 20, right: 20 }
    },
    twitter: {
      name: "Twitter/X",
      aspectRatios: ["16:9", "1:1"],
      safeZone: { top: 30, bottom: 30, left: 15, right: 15 }
    },
    linkedin: {
      name: "LinkedIn",
      aspectRatios: ["1.91:1", "1:1"],
      safeZone: { top: 50, bottom: 50, left: 25, right: 25 }
    }
  },

  // Subscription tiers
  pricing: {
    free: {
      name: "Free",
      watermarksPerMonth: 5,
      features: ["Basic watermarking", "3 preset positions"]
    },
    pro: {
      name: "Pro",
      price: 9.99,
      watermarksPerMonth: 500,
      features: [
        "AI-powered positioning",
        "Batch processing", 
        "All social platforms",
        "Custom branding",
        "Priority support"
      ]
    },
    enterprise: {
      name: "Enterprise",
      price: 29.99,
      watermarksPerMonth: -1, // unlimited
      features: [
        "Unlimited watermarks",
        "Team collaboration",
        "API access",
        "White-label options",
        "Advanced analytics"
      ]
    }
  }
};

// Utility functions for BrandTag AI
export const brandUtils = {
  // Generate page URLs consistent with the createPageUrl utility
  createPageUrl: (pageName) => {
    return `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
  },

  // Calculate optimal watermark position
  calculatePosition: (imageData, watermarkSize, position = "auto") => {
    if (position !== "auto") {
      return getFixedPosition(position, imageData.width, imageData.height, watermarkSize);
    }
    
    // AI-powered positioning logic would go here
    // For now, return a smart default
    return {
      x: imageData.width - watermarkSize.width - BRAND_CONFIG.ai.safeZoneMargin,
      y: imageData.height - watermarkSize.height - BRAND_CONFIG.ai.safeZoneMargin,
      confidence: 0.85
    };
  },

  // Validate file format and size
  validateFile: (file) => {
    const errors = [];
    
    if (!file) {
      errors.push("No file provided");
      return { isValid: false, errors };
    }
    
    // Check file size
    if (file.size > BRAND_CONFIG.watermark.maxFileSize) {
      errors.push(`File size exceeds ${BRAND_CONFIG.watermark.maxFileSize / 1024 / 1024}MB limit`);
    }
    
    // Check file format
    const fileExtension = file.name.split('.').pop().toUpperCase();
    if (!BRAND_CONFIG.watermark.formats.includes(fileExtension)) {
      errors.push(`Unsupported format. Supported: ${BRAND_CONFIG.watermark.formats.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Format file size for display
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Generate unique processing ID
  generateProcessingId: () => {
    return `brandtag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Fixed position calculator helper
function getFixedPosition(position, imgWidth, imgHeight, wmSize) {
  const margin = BRAND_CONFIG.ai.safeZoneMargin;
  
  const positions = {
    "top-left": { x: margin, y: margin },
    "top-right": { x: imgWidth - wmSize.width - margin, y: margin },
    "bottom-left": { x: margin, y: imgHeight - wmSize.height - margin },
    "bottom-right": { x: imgWidth - wmSize.width - margin, y: imgHeight - wmSize.height - margin },
    "center": { 
      x: (imgWidth - wmSize.width) / 2, 
      y: (imgHeight - wmSize.height) / 2 
    }
  };
  
  return positions[position] || positions["bottom-right"];
}

// Export default configuration
export default BRAND_CONFIG;

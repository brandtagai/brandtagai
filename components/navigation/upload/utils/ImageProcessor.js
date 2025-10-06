

// Helper to load external scripts for metadata handling
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.appendChild(script);
  });
};

// Initialize piexif library for EXIF metadata handling
let piexifReady = false;
const initPiexif = async () => {
  if (piexifReady) return true;
  
  try {
    await loadScript("https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.min.js");
    piexifReady = true;
    return true;
  } catch (error) {
    console.error("Failed to load piexif library:", error);
    return false;
  }
};

// Load image from file or URL and return as Image object
const loadImage = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    
    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(source);
    } else {
      img.src = source;
    }
  });
};

// Process image with watermark and metadata
export const processImage = async (file, settings, onProgress) => {
  try {
    onProgress?.(20, "Loading image...");
    
    // Load the original image
    const originalImage = await loadImage(file);
    
    onProgress?.(40, "Applying watermark...");
    
    // Create canvas for processing
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions to match original image
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    
    // Draw original image
    ctx.drawImage(originalImage, 0, 0);
    
    // Apply watermark if settings provided
    if (settings && (settings.logo_url || settings.brand_text)) {
      await applyWatermark(ctx, canvas, settings);
    }
    
    onProgress?.(70, "Processing metadata...");
    
    // Get processed image as data URL
    const processedDataUrl = canvas.toDataURL("image/jpeg", 0.95);
    
    // Handle metadata for JPEG files
    let finalImage = processedDataUrl;
    if (file.type === "image/jpeg" && settings?.metadata_fields) {
      const metadataReady = await initPiexif();
      if (metadataReady) {
        finalImage = await embedMetadata(file, processedDataUrl, settings.metadata_fields);
      }
    }
    
    onProgress?.(100, "Complete!");
    
    return {
      processedImage: finalImage,
      filename: `watermarked_${file.name.replace(/\.[^/.]+$/, "")}.jpg`
    };
    
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

// Apply watermark (logo and/or text) to canvas
const applyWatermark = async (ctx, canvas, settings) => {
  const { logo_url, brand_text, logo_position, social_media_mode, logo_circle_crop } = settings;
  
  // Calculate positioning
  const padding = Math.max(canvas.width * 0.03, 20);
  const socialMediaPadding = social_media_mode ? Math.max(canvas.width * 0.08, 50) : 0;
  
  let logoImg = null;
  let logoWidth = 0;
  let logoHeight = 0;
  
  // Load logo if provided
  if (logo_url) {
    try {
      logoImg = await loadImage(logo_url);
      // Scale logo to appropriate size (max 10% of image width)
      const maxLogoWidth = canvas.width * 0.1;
      const scale = Math.min(maxLogoWidth / logoImg.width, maxLogoWidth / logoImg.height);
      logoWidth = logoImg.width * scale;
      logoHeight = logoImg.height * scale;
    } catch (error) {
      console.error("Failed to load logo:", error);
    }
  }
  
  // Calculate text dimensions if brand text provided
  let textWidth = 0;
  let textHeight = 0;
  if (brand_text) {
    const fontSize = Math.max(canvas.width * 0.025, 16);
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    textWidth = ctx.measureText(brand_text).width;
    textHeight = fontSize;
  }
  
  // Calculate gap between logo and text
  // If circle cropped, use smaller gap since visible logo is actually smaller
  const baseGap = (logoImg && brand_text) ? 15 : 0;
  const gap = logo_circle_crop ? baseGap * 0.5 : baseGap;
  
  // Calculate effective logo width for positioning
  // If circle cropped, the visible part is narrower (diameter = min dimension)
  const effectiveLogoWidth = logo_circle_crop ? Math.min(logoWidth, logoHeight) : logoWidth;
  
  // Calculate total watermark width
  const totalWidth = effectiveLogoWidth + gap + textWidth;
  
  // Determine position based on logo_position setting
  let x, y;
  if (logo_position === "right") {
    x = canvas.width - padding - socialMediaPadding - totalWidth;
  } else {
    x = padding + socialMediaPadding;
  }
  y = canvas.height - padding - socialMediaPadding - Math.max(logoHeight, textHeight);
  
  // Draw logo with optional circle crop
  if (logoImg) {
    if (logo_circle_crop) {
      // Save context state
      ctx.save();
      
      // Create circular clipping path
      const centerX = x + logoWidth / 2;
      const centerY = y + logoHeight / 2;
      const radius = Math.min(logoWidth, logoHeight) / 2;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw the logo within the circular clip
      ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
      
      // Restore context state
      ctx.restore();
    } else {
      // Draw logo normally without crop
      ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
    }
  }
  
  // Draw brand text next to logo (vertically centered)
  if (brand_text) {
    const textX = x + effectiveLogoWidth + gap;
    const textY = y + (logoHeight / 2) + (textHeight / 4); // Center text with logo
    
    // Set text styling
    const fontSize = Math.max(canvas.width * 0.025, 16);
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
    ctx.lineWidth = 2;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    
    // Add shadow for readability
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    // Draw text with stroke and fill
    ctx.strokeText(brand_text, textX, textY);
    ctx.fillText(brand_text, textX, textY);
    
    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
};

// Embed metadata into JPEG image
const embedMetadata = async (originalFile, processedDataUrl, metadataFields) => {
  try {
    // Read original file as a data URL to get existing EXIF data
    const originalDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(originalFile);
    });
    
    // Load existing EXIF data, or create a blank structure if none exists
    let exifData = {};
    try {
      exifData = window.piexif.load(originalDataUrl);
    } catch (e) {
      console.warn("Could not load existing EXIF data, creating new segment.", e);
      exifData = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": null};
    }
    
    // Update metadata fields
    if (metadataFields.copyright) {
      exifData["0th"][window.piexif.ImageIFD.Copyright] = metadataFields.copyright;
    }
    if (metadataFields.creator) {
      exifData["0th"][window.piexif.ImageIFD.Artist] = metadataFields.creator;
    }
    if (metadataFields.description) {
      exifData["0th"][window.piexif.ImageIFD.ImageDescription] = metadataFields.description;
    }
    
    // Add software info
    exifData["0th"][window.piexif.ImageIFD.Software] = "BrandTag AI Client";
    
    // Generate new EXIF binary
    const newExifBinary = window.piexif.dump(exifData);
    
    // Insert metadata into processed image
    return window.piexif.insert(newExifBinary, processedDataUrl);
    
  } catch (error) {
    console.error("Error embedding metadata:", error);
    return processedDataUrl; // Return image without metadata if embedding fails
  }
};

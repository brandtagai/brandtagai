// Mock entities for Bolt preview mode
// Place this file at: src/entities/mockEntities.js

const isPreviewMode = () => {
  return window.location.hostname.includes('staticblitz') || 
         window.location.hostname.includes('webcontainer') ||
         !window.location.hostname.includes('base44');
};

const MOCK_USER = {
  email: 'demo@preview.com',
  name: 'Demo User',
  role: 'user'
};

const MOCK_SETTINGS = {
  id: 'mock-settings-1',
  created_by: 'demo@preview.com',
  logo_url: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=LOGO',
  brand_text: 'DEMO BRAND',
  watermark_position: 'bottom-right',
  watermark_opacity: 0.7,
  watermark_size: 'medium',
  created_date: new Date().toISOString()
};

const MOCK_PURCHASES = [
  {
    id: 'mock-purchase-1',
    created_by: 'demo@preview.com',
    product_id: 'brandtag_bundle_20',
    amount: 10,
    images_remaining: 100,
    purchase_date: new Date().toISOString()
  }
];

// Mock User entity
export const User = {
  me: async () => {
    if (isPreviewMode()) {
      return MOCK_USER;
    }
    // Real implementation would go here
    throw new Error('User.me() not available outside Base44');
  }
};

// Mock UserSettings entity
export const UserSettings = {
  filter: async (query, sort, limit) => {
    if (isPreviewMode()) {
      return [MOCK_SETTINGS];
    }
    throw new Error('UserSettings.filter() not available outside Base44');
  },
  
  create: async (data) => {
    if (isPreviewMode()) {
      console.log('Mock create UserSettings:', data);
      const newSettings = {
        id: `mock-settings-${Date.now()}`,
        created_by: 'demo@preview.com',
        ...data,
        created_date: new Date().toISOString()
      };
      return newSettings;
    }
    throw new Error('UserSettings.create() not available outside Base44');
  },
  
  update: async (id, data) => {
    if (isPreviewMode()) {
      console.log('Mock update UserSettings:', id, data);
      return { ...MOCK_SETTINGS, ...data };
    }
    throw new Error('UserSettings.update() not available outside Base44');
  }
};

// Mock Purchase entity
export const Purchase = {
  filter: async (query, sort, limit) => {
    if (isPreviewMode()) {
      return MOCK_PURCHASES;
    }
    throw new Error('Purchase.filter() not available outside Base44');
  },
  
  list: async (sort, limit) => {
    if (isPreviewMode()) {
      return MOCK_PURCHASES;
    }
    throw new Error('Purchase.list() not available outside Base44');
  },
  
  create: async (data) => {
    if (isPreviewMode()) {
      console.log('Mock create Purchase:', data);
      const newPurchase = {
        id: `mock-purchase-${Date.now()}`,
        created_by: 'demo@preview.com',
        ...data,
        purchase_date: new Date().toISOString()
      };
      MOCK_PURCHASES.push(newPurchase);
      return newPurchase;
    }
    throw new Error('Purchase.create() not available outside Base44');
  },
  
  update: async (id, data) => {
    if (isPreviewMode()) {
      console.log('Mock update Purchase:', id, data);
      MOCK_PURCHASES[0] = { ...MOCK_PURCHASES[0], ...data };
      return MOCK_PURCHASES[0];
    }
    throw new Error('Purchase.update() not available outside Base44');
  }
};

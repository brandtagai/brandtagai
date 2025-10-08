const STORAGE_KEYS = {
  USER_SETTINGS: 'brandtag_user_settings',
  PURCHASES: 'brandtag_purchases'
};

const DEFAULT_USER = {
  email: 'user@brandtag.local',
  name: 'User',
  role: 'user'
};

const getDefaultSettings = () => ({
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
  logo_circle_crop: false
});

export const User = {
  me: async () => {
    return DEFAULT_USER;
  }
};

export const UserSettings = {
  filter: async (query, sort, limit) => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        const defaultSettings = getDefaultSettings();
        const mergedSettings = {
          ...defaultSettings,
          ...settings,
          metadata_fields: {
            ...defaultSettings.metadata_fields,
            ...(settings.metadata_fields || {})
          }
        };
        return [mergedSettings];
      } catch (error) {
        console.error('Error parsing stored settings:', error);
        return [getDefaultSettings()];
      }
    }
    return [];
  },

  create: async (data) => {
    const defaultSettings = getDefaultSettings();
    const newSettings = {
      id: `settings-${Date.now()}`,
      created_by: DEFAULT_USER.email,
      ...data,
      metadata_fields: {
        ...defaultSettings.metadata_fields,
        ...(data.metadata_fields || {})
      },
      created_date: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  },

  update: async (id, data) => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    let existingSettings = {};

    if (stored) {
      try {
        existingSettings = JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored settings:', error);
      }
    }

    const defaultSettings = getDefaultSettings();
    const updatedSettings = {
      ...existingSettings,
      ...data,
      metadata_fields: {
        ...defaultSettings.metadata_fields,
        ...(existingSettings.metadata_fields || {}),
        ...(data.metadata_fields || {})
      },
      id: id || existingSettings.id || `settings-${Date.now()}`,
      created_by: DEFAULT_USER.email,
      updated_date: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(updatedSettings));
    return updatedSettings;
  }
};

export const Purchase = {
  filter: async (query, sort, limit) => {
    const stored = localStorage.getItem(STORAGE_KEYS.PURCHASES);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored purchases:', error);
        return [];
      }
    }
    return [];
  },

  list: async (sort, limit) => {
    const stored = localStorage.getItem(STORAGE_KEYS.PURCHASES);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored purchases:', error);
        return [];
      }
    }
    return [];
  },

  create: async (data) => {
    const stored = localStorage.getItem(STORAGE_KEYS.PURCHASES);
    let purchases = [];

    if (stored) {
      try {
        purchases = JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored purchases:', error);
      }
    }

    const newPurchase = {
      id: `purchase-${Date.now()}`,
      created_by: DEFAULT_USER.email,
      ...data,
      purchase_date: new Date().toISOString()
    };

    purchases.push(newPurchase);
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    return newPurchase;
  },

  update: async (id, data) => {
    const stored = localStorage.getItem(STORAGE_KEYS.PURCHASES);
    let purchases = [];

    if (stored) {
      try {
        purchases = JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored purchases:', error);
      }
    }

    const index = purchases.findIndex(p => p.id === id);
    if (index !== -1) {
      purchases[index] = { ...purchases[index], ...data, updated_date: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
      return purchases[index];
    }

    return data;
  }
};

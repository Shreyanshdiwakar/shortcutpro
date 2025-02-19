import { SUPABASE_API_KEY } from './secrets.js';

class ShortcutPro {
  constructor() {
    this.SUPABASE_URL = 'https://sxlnlkiddsufpbizwmpu.supabase.co';
    this.elements = {
      searchInput: document.getElementById('searchInput'),
      shortcutsList: document.getElementById('shortcutsList'),
      currentSite: document.getElementById('currentSite'),
      loadingState: document.getElementById('loadingState'),
      errorState: document.getElementById('errorState'),
      retryButton: document.getElementById('retryButton'),
      themeToggle: document.getElementById('themeToggle')
    };
    
    this.shortcuts = [];
    this.currentDomain = '';
    
    this.init();
  }

  async init() {
    this.showLoading();
    this.setupEventListeners();
    await this.loadCurrentSite();
    await this.loadShortcuts();
    this.setupTheme();
  }

  setupEventListeners() {
    this.elements.searchInput.addEventListener('input', () => this.handleSearch());
    this.elements.retryButton.addEventListener('click', () => this.loadShortcuts());
    this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  showLoading() {
    this.elements.loadingState.classList.remove('hidden');
    this.elements.errorState.classList.add('hidden');
    this.elements.shortcutsList.innerHTML = '';
  }

  showError(message) {
    this.elements.loadingState.classList.add('hidden');
    this.elements.errorState.classList.remove('hidden');
    this.elements.errorState.querySelector('p').textContent = message;
  }

  hideLoading() {
    this.elements.loadingState.classList.add('hidden');
  }

  async loadCurrentSite() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    this.currentDomain = new URL(tab.url).hostname;
    this.elements.currentSite.textContent = `Shortcuts for: ${this.currentDomain}`;
  }

  async loadShortcuts() {
    try {
      // Check cache first
      const cachedData = await this.getFromCache();
      if (cachedData) {
        this.shortcuts = cachedData;
        this.displayShortcuts(this.shortcuts);
        return;
      }

      // Fetch from Supabase if no cache
      const response = await fetch(
        `${this.SUPABASE_URL}/rest/v1/shortcuts?website=eq.${this.currentDomain}&select=*`,
        {
          headers: {
            'apikey': SUPABASE_API_KEY,
            'Authorization': `Bearer ${SUPABASE_API_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch shortcuts');
      }

      this.shortcuts = await response.json();
      await this.saveToCache(this.shortcuts);
      this.displayShortcuts(this.shortcuts);
    } catch (error) {
      console.error('Error:', error);
      this.showError('Unable to load shortcuts. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  async getFromCache() {
    const cacheKey = `shortcuts_${this.currentDomain}`;
    const result = await chrome.storage.local.get([cacheKey]);
    const cached = result[cacheKey];

    if (cached && cached.timestamp > Date.now() - (24 * 60 * 60 * 1000)) {
      return cached.data;
    }
    return null;
  }

  async saveToCache(data) {
    const cacheKey = `shortcuts_${this.currentDomain}`;
    await chrome.storage.local.set({
      [cacheKey]: {
        data,
        timestamp: Date.now()
      }
    });
  }

  displayShortcuts(shortcuts) {
    if (!shortcuts.length) {
      this.elements.shortcutsList.innerHTML = `
        <div class="no-shortcuts">
          No shortcuts available for ${this.currentDomain}
        </div>
      `;
      return;
    }

    this.elements.shortcutsList.innerHTML = shortcuts
      .map(shortcut => `
        <div class="shortcut-item">
          <div class="shortcut-description">${shortcut.description}</div>
          <div class="shortcut-keys">${shortcut.keys}</div>
        </div>
      `)
      .join('');
  }

  handleSearch() {
    const searchTerm = this.elements.searchInput.value.toLowerCase();
    const filteredShortcuts = this.shortcuts.filter(shortcut => 
      shortcut.description.toLowerCase().includes(searchTerm) ||
      shortcut.keys.toLowerCase().includes(searchTerm)
    );
    this.displayShortcuts(filteredShortcuts);
  }

  async setupTheme() {
    const { theme } = await chrome.storage.local.get('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  async toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    await chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new ShortcutPro();
}); 
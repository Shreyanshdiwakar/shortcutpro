# ShortcutPro 🎯

A Chrome extension that provides quick access to keyboard shortcuts for various websites. The extension detects the current website and displays relevant keyboard shortcuts with a searchable interface.

## Features ✨

- **Website Detection**: Automatically identifies the current website
- **Dynamic Shortcuts**: Fetches shortcuts from Supabase database
- **Search Functionality**: Quick search through available shortcuts
- **Dark/Light Theme**: Supports both dark and light modes
- **Efficient Caching**: 24-hour cache to reduce API calls
- **Floating Button**: Easy access to shortcuts from any webpage
- **Responsive UI**: Clean and minimal interface

## Installation 🚀

1. Clone the repository:
   ```sh
   git clone https://github.com/Shreyanshdiwakar/shortcutpro.git
   ```
2. Create a `secrets.js` file in the root directory and add:
   ```js
   export { SUPABASE_API_KEY };
   ```
3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the extension directory

## Project Status 📊

### Current Progress
- ✅ Basic extension setup with Manifest V3
- ✅ Popup UI implementation
- ✅ Dark/Light theme toggle
- ✅ Content script with floating button
- ✅ Supabase integration structure
- 🚧 Complete database setup (in progress)
- 🚧 API endpoint testing (in progress)
- ⏳ Production deployment (pending)

### Current Issues 🐛
1. Need to set up Supabase database and tables
2. API key configuration and security testing pending
3. Cache invalidation needs testing
4. Cross-browser compatibility not yet tested

### Next Steps 📝
- 🔧 Set up Supabase database with proper schema
- 🔧 Add more website shortcuts to database
- 🔧 Implement error boundary for better error handling
- 🎹 Add keyboard navigation support
- 📂 Implement shortcut categorization
- 💾 Add user preferences storage
- 🛠️ Create automated tests
- 📊 Add analytics for usage tracking

### Future Enhancements 🚀
- 🌍 **Firefox version support**: Expand availability beyond Chrome
- 📝 **Custom shortcut addition by users**: Allow users to define their own shortcuts
- 🔗 **Shortcut sharing between users**: Enable sharing of shortcuts via a community feature
- 📥 **Import/Export functionality**: Provide options to save and restore shortcut configurations
- 📶 **Offline mode support**: Ensure core functionality works without internet
- 🌎 **Multiple language support**: Improve accessibility for non-English speakers
- 🎥 **Visual shortcut demonstration**: Add tutorial animations for better user onboarding
- 📦 **Integration with popular web apps**: Extend support for apps like Slack, Notion, and Google Docs

### Known Limitations 🚧
1. Works only on Chrome browser currently
2. Requires internet connection for first-time shortcut fetch
3. Limited to predefined shortcuts in database
4. No user authentication system yet

### Help Wanted 🤝
We're looking for help with:
- Database schema optimization
- UI/UX improvements
- Testing across different Chrome versions
- Documentation improvements
- Performance optimization
- Security review

## Development 🛠️

### Prerequisites
- Chrome browser
- Supabase account and API key
- Basic knowledge of Chrome extension development

### Local Development
1. Make changes to the code
2. Reload the extension in Chrome
3. Test the changes

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security 🔒

- API keys are stored in `secrets.js` (not committed to repository)
- Uses Chrome's storage API for secure caching
- Implements content security policy
- Minimal required permissions

## Tech Stack 💻

- Chrome Extension Manifest V3
- Supabase for database
- Vanilla JavaScript
- CSS3 with CSS Variables
- Chrome Storage API

## Database Structure 📂

The Supabase database should have a `shortcuts` table with the following schema:

```sql
CREATE TABLE shortcuts (
    id SERIAL PRIMARY KEY,
    website VARCHAR(255) NOT NULL,
    shortcut VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
```

## Project Structure 💁‍♂️

```
shortcutpro/
├── manifest.json        # Extension configuration
├── popup.html           # UI for the extension popup
├── popup.js             # JavaScript logic for popup
├── content.js           # Injected script for floating button
├── background.js        # Background script for handling events
├── styles.css           # Styling for UI
├── secrets.js           # API keys (not committed to repo)
└── README.md            # Project documentation
```

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Chrome Extension Documentation
- Supabase Documentation
- Contributors and users of the extension

## Contact 📧

Shreyansh Diwakar - [GitHub](https://github.com/Shreyanshdiwakar)

Project Link: [https://github.com/Shreyanshdiwakar/shortcutpro](https://github.com/Shreyanshdiwakar/shortcutpro)


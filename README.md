# ShortcutPro - Supabase Backend Integration

## Overview

ShortcutPro is a browser extension that allows users to store and retrieve keyboard shortcuts for different websites. The project integrates with **Supabase** as the backend to store, manage, and fetch shortcut data.

## Current Progress ✅

### **1. Supabase Setup**

- Supabase project created
- Database configured with a `shortcuts` table containing:
  - `id` (Primary Key, Auto Increment)
  - `website` (Text)
  - `action` (Text)
  - `shortcut` (Text)
  - `description` (Text)
  - `keys` (Text)
- Data successfully inserted into the `shortcuts` table
- API keys generated for accessing Supabase REST API

### **2. API Requests & Authentication**

- **GET request setup** to fetch shortcuts using Postman
- **Issues Identified:**
  - Initial request resulted in `404: requested path is invalid`
  - Updated request resulted in `401: No API key found`

### **3. Chrome Extension Files**

- `popup.html` (Frontend UI for extension)
- `popup.js` (Handles user interaction and API calls)
- `content.js` (Injects functionality into webpages)
- `background.js` (Handles extension lifecycle events)
- `manifest.json` (Defines permissions and settings for the extension)

---

## **To-Do List 🛠️**

### **1. Fix Supabase API Authentication 🔥**

-

### **2. Integrate API Calls in Extension 🚀**

-

### **3. UI Improvements 🎨**



### **4. Additional Features (Optional) 🏗️**



---

## **How to Run the Project?**

1. Load the Chrome Extension:

   - Open Chrome → Go to `chrome://extensions/`
   - Enable **Developer Mode**
   - Click **Load unpacked** and select the project folder

2. Test API in Postman:

   - Use **GET** request to `https://<your-supabase-url>/rest/v1/shortcuts`
   - Add headers (`apikey`, `Authorization`)

3. Debug and update API calls in `popup.js`

---

## **Issues & Troubleshooting**

- **401 Unauthorized?** → Check API key headers
- **404 Not Found?** → Ensure the endpoint is correct
- **No data in response?** → Ensure Supabase has records

### **Project Status: Work in Progress 🏗️**

🔹 **Backend:** 80% complete (API setup, database structure, data insertion)
🔹 **Frontend:** 50% complete (Basic UI done, needs API integration)



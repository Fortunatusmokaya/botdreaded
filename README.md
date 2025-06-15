# 🛰️ DREADED AUTOVIEW

> A lightweight WhatsApp bot built with [Baileys](https://github.com/WhiskeySockets/Baileys) that automatically views statuses, simulates fake typing/recording, and helps you save view-once media — no commands, no menus, just works.

---

## 🚀 Features

- ✅ Automatically views WhatsApp statuses  
- ✅ Simulates **fake typing** and **recording**  
- ✅ Saves **view-once** images, videos, and audio by replying with:  
  - `uhm`, `wow`, `nice`, or 🙂 (case-insensitive)  
- ✅ Saves **status posts** by replying with `#save`  
- ✅ Sends all saved media to your own number  
- ✅ Lightweight — **no menus**, **no bloated commands**  

---

## 🧠 How It Works

Once linked, the bot:
- Monitors for view-once media or status posts
- When you reply with any trigger (`uhm`, `🙂`, `#save`, etc.), the bot sends that media directly to you

---

## 🛠️ Installation

### 🖥️ Local (Node.js)

```bash
git clone https://github.com/Fortunatusmokaya/dreaded-autoview
cd dreaded-autoview
npm install
```

Create a `settings.js` file:

```js
module.exports = {
  session: "PASTE_YOUR_BASE64_SESSION_STRING_HERE"
}
```

Then start the bot:

```bash
node main.js
```

---

### ☁️ Deploy to Heroku

Click below to deploy instantly:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/Fortunatusmokaya/dreaded-autoview)

You'll be prompted to paste your `SESSION` (base64) which you get after pairing the bot.

---

## 🧪 How To Use

Once connected, send a message like this to trigger it:

- Reply to a view-once image/video/audio with:  
  `uhm`, `wow`, `nice`, or 🙂  
- Reply to a status with `#save`

All saved media will appear in your private chat.

---

## 📄 License

MIT License. Feel free to fork and modify.

---

## 🌐 Links

- 🔗 Repo: [dreaded-autoview](https://github.com/Fortunatusmokaya/dreaded-autoview)
- 🔗 Website: [https://dreaded-autoview.vercel.app](https://dreaded-autoview.vercel.app) *(optional, update if deployed)*
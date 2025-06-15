const {
  BufferJSON,
  STORIES_JID,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const util = require("util");
const cheerio = require('cheerio');
global.axios = require('axios').default;
const fetch = require('node-fetch');
const chalk = require("chalk");
const { exec, spawn, execSync } = require("child_process");

module.exports = main = async (client, m, chatUpdate) => {
  try {
    
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype === "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype === "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype === "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : "";

    var budy = typeof m.text === "string" ? m.text : "";
    const textL = budy.toLowerCase();

    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == 'buttonsMessage'
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == 'templateMessage'
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == 'product'
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;

    const qmsg = quoted.msg || quoted;
    const mime = quoted.msg ? quoted.msg.mimetype || "" : "";
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender === botNumber;
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    if (m.chat.endsWith('broadcast')) {
      await client.readMessages([m.key]);
    }

    const quotedMessage = m.msg?.contextInfo?.quotedMessage;

    
    if (quotedMessage && textL.startsWith("#save") && m.quoted.chat.includes("status@broadcast")) {
      if (quotedMessage.imageMessage) {
        let imageCaption = quotedMessage.imageMessage.caption;
        let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
        client.sendMessage(client.user.id, {
          image: { url: imageUrl },
          caption: imageCaption
        });
      }

      if (quotedMessage.videoMessage) {
        let videoCaption = quotedMessage.videoMessage.caption;
        let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
        client.sendMessage(client.user.id, {
          video: { url: videoUrl },
          caption: videoCaption
        });
      }
    }

    
    if (/^(uhm|wow|nice|🙂)/i.test(budy) && m.quoted) {
  
      if (quotedMessage?.imageMessage) {
        let imageCaption = quotedMessage.imageMessage.caption || "";
        let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
        client.sendMessage(client.user.id, {
          image: { url: imageUrl },
          caption: imageCaption
        });
      }

      if (quotedMessage?.videoMessage) {
        let videoCaption = quotedMessage.videoMessage.caption || "";
        let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
        client.sendMessage(client.user.id, {
          video: { url: videoUrl },
          caption: videoCaption
        });
      }

      if (quotedMessage?.audioMessage) {
        let audioUrl = await client.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
        client.sendMessage(client.user.id, {
          audio: { url: audioUrl },
          mimetype: quotedMessage.audioMessage.mimetype,
          ptt: quotedMessage.audioMessage.ptt || false
        });
      }
    }

  } catch (error) {
    console.error(error);
  }
};

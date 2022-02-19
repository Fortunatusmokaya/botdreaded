import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "dreaded",
      aliases: ["dreaded", "repo"],
      description: "Gets the Deploy link and deploy guide",
      category: "general",
      usage: `${client.config.prefix}Dreaded`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    await this.client.sendMessage(
      M.sender.jid,
      ` 💎 Dreaded WhatsApp Bot 💎\n\n *Description: Maintained fork of void, The bot's source code being open and public, anybody can use this link to fork and deploy their own dreaded botto* \n\n 💎*URL-https://github.com/Fortunatusmokaya/DREADED* \n\n 🎂*DEPLOY GUIDE: https://github.com/Fortunatusmokaya/Dreaded-Guides* \n`,

      MessageType.text
    );

    return void M.reply("Sent you a personal message containing the bot's repo/script and a deploy guide as well.");
  };
}

import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dreaded',
            description: 'Displays the info.',
            category: 'general',
            usage: `${client.config.prefix}dreaded`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            './assets/images/dreaded-git.png'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: Mimetype.jpeg,
            caption: ` 💎 Dreaded WhatsApp Bot 💎\n\n *Description: Maintained fork of void, The bot's source code being open and public, anybody can use this link to fork and deploy their own dreaded botto* \n\n 💎*URL-https://github.com/Fortunatusmokaya/DREADED* \n\n 🎂*DEPLOY GUIDE: https://github.com/Fortunatusmokaya/Dreaded-Guides* \n` }
        )
    }
}

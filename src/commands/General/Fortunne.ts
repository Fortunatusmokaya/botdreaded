
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'fortunne',
            description: `My owner view`,
            aliases: ['mokaya'],
            category: 'general',
            usage: `${client.config.prefix}cara`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        
        return void M.reply( await request.buffer(`https://www.digitalartsonline.co.uk/cmsdata/slideshow/3441290/6.jpg`),
        MessageType.image,
                    undefined,
                    undefined,
                    `*Fortunne*: *Lol Dreaded Bot, Written in Typescript and fully Modular whatsapp bot in modification by Fortunne mokaya, Still a learner venturing into computer languages and technology, upcoming doctor and nurse as well 💕*\n *Antisocial Sociopath, introvert maybe as well, Am not good with people, I do not interact with people, I hate them lol,,, Phobic,,*`,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later.`))
    }
}

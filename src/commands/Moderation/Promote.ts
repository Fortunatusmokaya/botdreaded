import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'promote',
            description: 'promotes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}promote [@mention | tag]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
					return void M.reply(
						`How can I promote someone without being an admin?`
					);
				if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
				if (!M.mentioned.length)
					return void M.reply(
						`So you want me to ${this.config.command} air💔? Tag a user then.`
					);
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`Don't be a fool, I have Skipped *${username}* as they're already an admin`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`👑 *${username}* is now an ADMIN`)
            }
        })
    }
}

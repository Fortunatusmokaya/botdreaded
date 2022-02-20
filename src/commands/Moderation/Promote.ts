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
						`Make me *ADMIN* first`
					);
				if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
				if (!M.mentioned.length)
					return void M.reply(
						`Who should I *${this.config.command}*? Tag or mention someone.`
					);
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`*${username}* is already an *ADMIN*. What did you mean?`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`👑 *${username}* is now an *ADMIN*`)
            }
        })
    }
}

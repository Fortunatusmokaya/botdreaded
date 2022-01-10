import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            modsOnly: true,
            command: 'purge',
            description: 'Removes all group members',
            aliases: ['finish', 'over'],
            category: 'moderation',
            usage: `${client.config.prefix}purge`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!(M.groupMetadata?.mods.split('@')[0] === M.sender.jid.split('@')[0]))
            return void M.reply('Only the *BOT OWNER* can use this command')
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("I NEED *ADMIN RIGHTS* TO DO THAT!")
        if (!this.purgeSet.has(M.groupMetadata?.id || '')) {
            this.addToPurge(M.groupMetadata?.id || '')
            return void M.reply(
                "Why, why, Please do not do that for whoevers sake! Not good, No need! But if you wish so, then pardon your command once more 😔"
            )
        }
        M.groupMetadata.participants.map(async (user) => {
            if (!user.isAdmin)
                await this.client.groupRemove(M.from, [user.jid]).catch(() => console.log('Failed to remove users'))
        })
        // now remove all admins except yourself and the owner
        M.groupMetadata.admins.map(async (user) => {
            if (user !== M.sender.jid && user !== this.client.user.jid)
                await this.client.groupRemove(M.from, [user]).catch(() => console.log('error removing admin'))
        })
        await M.reply('Watch the game now! Sorry,').catch(() => console.log('Failed to send message'))
        this.client.groupLeave(M.from)
    }

    purgeSet = new Set<string>()

    addToPurge = async (id: string): Promise<void> => {
        this.purgeSet.add(id)
        setTimeout(() => this.purgeSet.delete(id), 60000)
    }
}

/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			modsOnly: true,
			command: "oreset",
			description: "Revokes the group link.",
			category: "dev",
			usage: `${client.config.prefix}oreset`,
			baseXp: 0,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
			return void M.reply(
				"How can I revoke the group link without being an admin?"
			);
		await this.client.revokeInvite(M.from).catch(() => {
			return void M.reply("Failed to revoke the group link");
		});
		return void M.reply("Successfully_Done, Group Link is Revoked!");
	};
}

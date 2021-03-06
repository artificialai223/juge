const invitationPhrases = require('../../assets/json/invitation_phrases.json');

module.exports = {
	name: 'invite',
	aliases: ['botinvite'],
	description: 'Bot invitation link',
	category: 'bot',
	requirements: { botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		message.channel.send(new client.MessageEmbed()
			.setColor(client.utils.hexColor(message))
			.setDescription(client.utils.randomItem(invitationPhrases)
				.replace('{{INVITE_LINK}}', await client.generateInvite(Number(process.env.JUGE_PERMISSIONS)))
			)
		);
	}
};

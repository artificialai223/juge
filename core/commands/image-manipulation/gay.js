const { resolve } = require('path');
const Jimp = require('jimp');

module.exports = {
	name: 'gay',
	aliases: ['gai', 'rainbow'],
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'] },
	cooldown: 10,
	async execute(client, message, params) {
		try {
			message.channel.startTyping();
			const avatar = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
			const filter = await Jimp.read(resolve(__dirname, '..', '..', 'assets', 'png', 'gay.png'));
			const image = await Jimp.read(avatar);
			image.resize(512, 512);
			image.composite(filter, 0, 0);
			await message.channel.send({ files: [{ attachment: await image.getBufferAsync(Jimp.MIME_PNG), name: 'gay.png' }] }).then(message.channel.stopTyping());
		} catch (error) {
			message.channel.send(new client.RichEmbed()
				.setColor(client.utils.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			).then(message.channel.stopTyping());
		}
	}
};

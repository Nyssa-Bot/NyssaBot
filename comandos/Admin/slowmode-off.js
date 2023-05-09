const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "slowmode",
    description: "｢Admin｣ Desativar o modo lento.",
    options: [
        {
            name: "off",
            description: "｢Admin｣ Desativar o modo lento.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "canal",
                    description: "Mencione um canal de texto.",
                    type: Discord.ApplicationCommandOptionType.Channel,
                    required: false,
                }
            ],
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            interaction.deferReply();

            let t = -1;
            let tempo = ms(t);
            let channel = interaction.options.getChannel("canal");

            if (!channel || channel === null) channel = interaction.channel;
            channel.setRateLimitPerUser(tempo / 1000).then(() => {
                const embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`> O canal de texto ${channel} teve seu modo lento definido como \`Desativado\`.`)
                interaction.editReply({ embeds: [embed] })
            }).catch(() => {
                interaction.editReply({ content: `Ops, algo deu errado ao executar este comando, verifique minhas permissões, preciso ter a permisão "Gerenciar Canais".`, ephemeral: true })
            })
        }
    }
}
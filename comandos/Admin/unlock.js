const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    description: "｢Admin｣ Desbloquear um canal.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            description: "Mencione um canal para o desbloquear o chat.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            interaction.deferReply();
            const canal = interaction.options.getChannel("canal")

            canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).then(() => {
                interaction.editReply({ content: `🔓 O canal de texto ${canal} foi desbloqueado!` })
                if (canal.id !== interaction.channel.id) return canal.send({ content: `🔓 Este canal foi desbloqueado!` })
            }).catch(e => {
                interaction.editReply({ content: `❌ Ops, algo deu errado.` })
            })
        }

    }
}
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const config = require("../config.json");
module.exports = {
    name: "gs",
    description: "Galatasaray kadrosunu gösterir",
    type: 1,
    options: [],
    run: async (client, interaction) => {
        try {
            const response = await axios.get('https://api.football-data.org/v4/teams/64', {
                headers: { 'X-Auth-Token': config.apikey }
            });

            const squad = response.data.squad;

            let embed = new EmbedBuilder()
                .setTitle("Galatasaray Kadrosu")
                .setColor(0xFF0000);

            squad.forEach(player => {
                if (player.position) {
                    embed.addFields(
                        { name: player.name, value: player.position, inline: true }
                    );
                } else {
                    embed.addFields(
                        { name: player.name, value: 'Pozisyon Yok', inline: true }
                    );
                }
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply("Verileri çekerken bir hata oluştu.");
        }
    }
};

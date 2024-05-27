const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const config = require("../config.json");
module.exports = {
    name: "lig",
    description: "Lig sıralaması",
    type: 1,
    options: [],
    run: async (client, interaction) => {
        try {            const response = await axios.get('https://api.football-data.org/v4/competitions/PL/standings', {
                headers: { 'X-Auth-Token': config.apikey }
            });

            const standings = response.data.standings[0].table;

            let embed = new EmbedBuilder()
                .setTitle("Premier League Sıralaması")
                .setColor("Gold");

            standings.forEach(team => {
                embed.addFields(
                    { name: `${team.position}. ${team.team.name}`, value: `Puan: ${team.points}`, inline: false }
                );
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply("Verileri çekerken bir hata oluştu.");
        }
    }
};

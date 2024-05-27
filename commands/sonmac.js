const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const config = require("../config.json")
module.exports = {
    name: "sonmaclar",
    description: "Son olan maçları gösterir",
    type: 1,
    options: [],
    run: async (client, interaction) => {
        try {
            const response = await axios.get('https://api.football-data.org/v4/matches', {
                headers: { 'X-Auth-Token': config.apikey }
            });

            const matches = response.data.matches;

            let embed = new EmbedBuilder()
                .setTitle("Son Maçlar")
                .setColor("Green");

            matches.slice(0, 5).forEach(match => {
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const score = match.score.fullTime;
                const result = `${homeTeam} ${score.homeTeam} - ${score.awayTeam} ${awayTeam}`;

                embed.addFields(
                    { name: `${homeTeam} vs ${awayTeam}`, value: `Sonuç: ${score.homeTeam} - ${score.awayTeam}`, inline: true }
                );
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply("Verileri çekerken bir hata oluştu.");
        }
    }
};

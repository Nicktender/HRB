const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`✅ Bot online as ${client.user.tag}`);

  // Optional: send a test message on startup
  const channel = await client.channels.fetch(process.env.REPORT_CHANNEL_ID);

  await channel.send({
    embeds: [
      {
        title: "🤖 Report Bot Online",
        description: "Bot successfully started on Railway.",
        color: 0x57F287,
        fields: [
          {
            name: "🕒 Time",
            value: `<t:${Math.floor(Date.now() / 1000)}:f>`
          }
        ]
      }
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("test_button")
          .setLabel("Test Button")
          .setStyle(ButtonStyle.Secondary)
      )
    ]
  });
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "test_button") {
    await interaction.reply({
      content: `✅ Button clicked by **${interaction.user.tag}**`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

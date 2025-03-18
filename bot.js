require("dotenv").config();
const { Client, GatewayIntentBits, Events, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// To reflect any changes in the discord, re-register bot in the discord.com/developers site under 'OAuth2', 
// under scopes select 'bot', under bot permissions, select 'send messages'.

//add commands here
const commands = [

  {
    name: 'rivals_random_character',
    description: 'Randomly selects a Marvel Rival character from their roster!'
  }
];

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);
async function start_preload() {
    try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
}

start_preload();
const MarvelRoster = ["Adam Warlock", "Black Panther", "Black Widow", "Captain America", 
    "Cloak & Dagger", "Doctor Strange", "Groot", "Hawkeye", "Hela", "Hulk", "Human Torch", "Invisible Woman", "Iron Fist",
    "Iron Man", "Jeff the Land Shark", "Loki", "Luna Snow", "Magik", "Magneto", "Mantis", "Mister Fantastic", "Moon Knight",
    "Namor", "Peni Parker", "Psylocke", "Rocket Raccoon", "Scarlet Witch", "Spider-Man", "Squirrel Girl", "Star-Lord", "Storm",
    "The Punisher", "The Thing", "Thor", "Venom", "Winter Soldier", "Wolverine"];

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
  });
  
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log("command getting executed by " + interaction.user.username);
    //add logic for commands here
    switch(interaction.commandName){
        
        case "rivals_random_character":
            
            const randomIndex = Math.floor(Math.random() * MarvelRoster.length);
            const randomCharacter = MarvelRoster[randomIndex];
            
            if(interaction.user.username == 'brobeeb4'){
                await interaction.reply({content:`IT'S THE OLD MAN!!!! Here you go, old man, this is your character: ${randomCharacter}.`});
                break;
            }
            // const imageURL = need api
            await interaction.reply({content: 'Your random character is ' + randomCharacter + '.'});
            break;
    }
  });

client.login(TOKEN);
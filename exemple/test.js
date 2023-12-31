(async () => {
    const { welCard } = require("welcard");
    const fs = require("fs");

    const card = new welCard()
        .setName("Bienvenue")
        .setAuthor("Zqx_")
        .setServer("Sur 🪐| LunarWave")
        .setColor("auto")
        .setBrightness(50)
        .setThumbnail("https://cdn.discordapp.com/avatars/359924289832484865/dae79e262689070227d7ee2c72b20ae9.png?size=4096")
       
    const cardBuffer = await card.build();

    fs.writeFileSync("card.png", cardBuffer);
    console.log("done")
})()

// Now Direct Immersion With A Bot Discord //

const { welCard } = require("welcard");

let Car = new welCard()
        .setName("Bienvenue")
        .setAuthor("Zqx_")
        .setServer("Sur 🪐| LunarWave")
        .setColor("auto")
        .setBrightness(50)
        .setThumbnail("https://cdn.discordapp.com/avatars/359924289832484865/dae79e262689070227d7ee2c72b20ae9.png?size=4096")
       
    const cardBuffer = await card.build();
    const channel = client.channels.cache.get("ID CHANNEL");

    channel.send({content: `Welcome ${member} on ${member.guild.name}`, files: [cardBuffer]});
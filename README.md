![]()

# About

**WelCard** is a lightweight and futuristic welcome card libary designed for Discord Bots.

- 100% customizable
- Lightweight
- High Quality Assets

# Installation
```
npm i welcard
```

# Exemple
```js
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
```

**Output** : card.png
![output](https://raw.githubusercontent.com/ZqxDev/musicard/main/assets/example.png)

# Support
If you're creating a project with **welCard**, don't hesitate to contact us via our [discord]() server.
(async () => {
    const { welCard } = require("welcard");
    const fs = require("fs");

    const card = new welCard()
        .setName("Paradise")
        .setAuthor("By Alan Walker")
        .setColor("auto")
        .setBrightness(50)
        .setThumbnail("https://i0.wp.com/is4-ssl.mzstatic.com/image/thumb/Music115/v4/20/6a/38/206a382f-da9e-0a6c-81a7-8db2397b6438/886449597628.jpg/600x600bb-60.jpg")
       
    const cardBuffer = await card.build();

    fs.writeFileSync("card.png", cardBuffer);
    console.log("done")
})()
const devmod = false;

const canvas = require("@napi-rs/canvas");
const { colorFetch } = require("../functions/colorFetch");

canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/welcard/"}res/fonts/circularstd-black.otf`, "circular-std");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/welcard/"}res/fonts/notosans-jp-black.ttf`, "noto-sans-jp");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/welcard/"}res/fonts/notosans-black.ttf`, "noto-sans");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/welcard/"}res/fonts/notoemoji-bold.ttf`, "noto-emoji");
canvas.GlobalFonts.registerFromPath(`${devmod ? "" : "node_modules/welcard/"}res/fonts/notosans-kr-black.ttf`, "noto-sans-kr");

class welCard {
    constructor() {
        this.name = null;
        this.author = null;
        this.color = null;
        this.brightness = null;
        this.thumbnail = null;
        this.server = null;
        this.about = null;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setAuthor(author) {
        this.author = author;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setBrightness(brightness) {
        this.brightness = brightness;
        return this;
    }

    setThumbnail(thumbnail) {
        this.thumbnail = thumbnail;
        return this;
    }
    
    setServer(server) {
        this.server = server;
        return this;
    }
    
    setAbout(about) {
        this.about = about;
        return this;
    }

    async build() {
        if (!this.name) { throw new Error('Missing name parameter'); }
        if (!this.author) { throw new Error('Missing author parameter'); }

        let thumbnailURL = this.thumbnail || `${devmod ? "" : "node_modules/welcard/"}res/noimage.jpg`;

        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            thumbnailURL
        );

        const img = await canvas.loadImage(`${devmod ? "" : "node_modules/welcard/"}res/background.png`);

        const thumbnailCanvas = canvas.createCanvas(564, 564);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');

        let thumbnailImage;

        thumbnailImage = await canvas.loadImage(thumbnailURL, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
                }
            }
        });

        const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
        const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
        const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

        thumbnailCtx.beginPath();
        const cornerRadius2 = 45;
        thumbnailCtx.moveTo(0 + cornerRadius2, 0);
        thumbnailCtx.arcTo(
            thumbnailCanvas.width,
            0,
            thumbnailCanvas.width,
            thumbnailCanvas.height,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            thumbnailCanvas.width,
            thumbnailCanvas.height,
            0,
            thumbnailCanvas.height,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            0,
            thumbnailCanvas.height,
            0,
            0,
            cornerRadius2,
        );
        thumbnailCtx.arcTo(
            0,
            0,
            thumbnailCanvas.width,
            0,
            cornerRadius2,
        );
        thumbnailCtx.closePath();
        thumbnailCtx.clip();

        thumbnailCtx.drawImage(
            thumbnailImage,
            thumbnailX,
            thumbnailY,
            thumbnailSize,
            thumbnailSize,
            0,
            0,
            thumbnailCanvas.width,
            thumbnailCanvas.height,
        );

        if (this.name.length > 15) this.name = `${this.name.slice(0, 15)}...`;
        if (this.author.length > 15) this.author = `${this.author.slice(0, 15)}...`;
        if (this.author.length > 15) this.author = `${this.author.slice(0, 15)}...`;

        const image = canvas.createCanvas(1280, 450);
        const ctx = image.getContext('2d');

        ctx.drawImage(img, 0, 0, 1280, 450);

        ctx.fillStyle = `#${validatedColor}`;
        ctx.font = `75px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.name, 70, 120);

        ctx.fillStyle = '#b8b8b8';
        ctx.font = `50px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.author, 75, 190);

        ctx.fillStyle = '#b8b8b8';
        ctx.font = `30px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.server, 75, 380);

        ctx.fillStyle = '#b8b8b8';
        ctx.font = `20px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr`;
        ctx.fillText(this.about, 75, 395);

        ctx.drawImage(thumbnailCanvas, 837, 8, 435, 435);

        return image.toBuffer('image/png');
    }
}

module.exports = { welCard };
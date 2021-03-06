const path = require("path");
const merge = require("webpack-merge");
const ASSETS_PATH = path.join(__dirname, "resources", "assets");
const production = process.env.NODE_ENV === "production";
const validate = require("webpack-validator");
const Joi = require('webpack-validator').Joi;

const PATHS = {
    assets: ASSETS_PATH,
    build: path.join(__dirname, "public", "build"),
    front: {
        app: path.join(ASSETS_PATH, "js", "front", "main.js"),
    },
    back: {
        app: path.join(ASSETS_PATH, "js", "back", "main.js"),
    }
};

var config = require("./build/base.config")(PATHS);

var envConfig = production ? require("./build/prod.config") : require("./build/dev.config")({
    host: null,
    port: null
});

config = merge(
    config,
    envConfig
);

const schema = Joi.object({
    vue: Joi.any()
});

module.exports = validate(config, { schemaExtension: schema });

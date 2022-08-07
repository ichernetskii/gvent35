const path = require("path");
const dotenv = require("dotenv");

require("@babel/register")({
    extends: path.resolve(__dirname, "..", ".babelrc")
})

const noop = () => {}
require.extensions[".scss"] = noop;
require.extensions[".svg"] = noop;
require.extensions[".png"] = noop;
require.extensions[".jpg"] = noop;

//const data = require("./js/assets/data.js").default;
const Sitemap = require("react-router-sitemap").default;
const router = require("./components/router").default;

// const params = {
//     "/production/:art": [{
//         art: data.production.map(item => item.art)
//     }],
// };

const dotenvConfig = dotenv.config({ path: `./config/.env.production.local` }).parsed;

new Sitemap(router())
    .filterPaths({})
//    .applyParams(params)
    .build(dotenvConfig.SERVER_NAME + dotenvConfig.BASE_PATH)
    .save('./dist/release/sitemap.xml')

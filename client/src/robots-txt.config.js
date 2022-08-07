const basePath = process.env.BASE_PATH;
const fileName = basePath && basePath[basePath.length - 1] === "/" ? "sitemap.xml" : "/sitemap.xml"

module.exports = {
    policy: [
        {
            userAgent: "*",
            allow: "/",
            crawlDelay: 10,
            cleanParam: "utm_source&utm_medium&utm_campaign"
        },
    ],
    sitemap: `${process.env.SERVER_NAME}${basePath}${fileName}`,
    host: process.env.SERVER_NAME,
};

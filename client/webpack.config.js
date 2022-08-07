/* --------------- modules & plugins --------------------------- */

const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

/* --------------- config -------------------------------------- */

const paths = {
    src: {
        abs: path.resolve(__dirname, "src"),
        rel: "src"
    },
    dist: {
        debug: {
            abs: path.resolve(__dirname, "dist/debug"),
            rel: "dist/debug"
        },
        release: {
            abs: path.resolve(__dirname, "dist/release"),
            rel: "dist/release"
        }
    },
    folders: {
        js: "js",
        style: "style",
        translation: "translation",
        img: "images",
        favicon: path.join("images", "favicon"),
        svg: "svg",
        html: "ejs",
        fonts: "fonts",
        components: "components"
    }
};

/* ---------------- module.exports ----------------------------- */

module.exports = (env = {}) => {

/* --------------- const --------------------------------------- */

    const {mode = "development"} = env;
    const isDev = mode === "development";
    const isProd = mode === "production";
    const dotenvConfig = dotenv.config({ path: `./config/.env.${mode}.local` }).parsed;

/* --------------- functions ----------------------------------- */

    const getFilenameTemplate = (fileName, hash, ext) => isProd ? `${fileName}-[${hash}:8].${ext}` : `[name].${ext}`;
    const fixSlashes = path => path.replace("\\","/");
    const getPlugins = () => {
        // load env-variables
        const envVariables = Object.fromEntries(
            Object
                .entries(dotenvConfig)
                .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
        );

		const ogImageName = dotenvConfig.BASE_PATH && dotenvConfig.BASE_PATH[dotenvConfig.BASE_PATH.length - 1] === "/" ? "images/main.jpg" : "/images/main.jpg";

        let plugins = [
            new CleanWebpackPlugin({
                // cleanStaleWebpackAssets: isProd // очищать неиспользуемое при ребилде?
            }),
            new webpack.DefinePlugin({
                ...envVariables,
                "process.env.isProd": isProd
            }),
            new FaviconsWebpackPlugin({
                logo: "./images/deflector.png",
                prefix: "./images/favicons_[contenthash:4]/",
                cache: true,
                favicons: {
                    background: "#fff",
                    theme_color: "#2396FF",
                    icons: {
                        android: isProd,              // Create Android homescreen icon. `boolean` or `{ offset, background }`
                        appleIcon: isProd,             // Create Apple touch icons. `boolean` or `{ offset, background }`
                        appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
                        coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background }`
                        favicons: isProd,              // Create regular favicons. `boolean`
                        firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
                        windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }`
                        yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
                    }
                }
            }),
            new htmlWebpackPlugin({
                inject: false,
                chunks: ["main"],
                template: fixSlashes(path.join(paths.folders.html, "index.ejs")),
                filename: "index.html",
                lang: "ru",
				baseHref: dotenvConfig.SERVER_NAME ? `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` : "",
                meta: [
                    { charset: "utf-8" },
                    { content: "ie=edge", "http-equiv": "x-ua-compatible" },
                    { name: "description", content: "Профессиональное обследование систем вентиляции. Полный комплекс работ по чистке вентиляции. Работы по пробивке завалов в каналах, видеодиагностике шахт и воздуховодов.", lang: "ru" },
                    { name: "author", content: "Smarto" },
                    { name: "robots", content: isProd ? "index, follow" : "none" },
					{ name: "theme-color", content: "#2396FF" },
					{ property: "og:title", content: "Жилпромвентиляция - обслуживание систем вентиляции" },
					{ property: "og:description", content: "Профессиональное обследование систем вентиляции. Полный комплекс работ по чистке вентиляции. Работы по пробивке завалов в каналах, видеодиагностике шахт и воздуховодов." },
					{ property: "og:image", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}${ogImageName}` },
					{ property: "og:image:type", content: "image/jpeg" },
					{ property: "og:image:width", content: "700" },
					{ property: "og:image:height", content: "700" },
					{ property: "og:type", content: "website" },
					{ property: "og:url", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` },
					{ property: "og:locale", content: "ru_RU" },
					{ property: "og:site_name", content: "Сайт «Жилпромвентиляция»" }
                ],
                headHtmlSnippet: `
                    <!--[if lt IE 9]>
                        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/r29/html5.min.js"></script>
                    <![endif]-->
                `,
                title: "Жилпромвентиляция - обслуживание систем вентиляции",
                mobile: true,
				links: [
					{ rel: "canonical", href: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` },
					{ rel: "preconnect", href: "//api-maps.yandex.ru" },
					{ rel: "dns-prefetch", href: "//api-maps.yandex.ru" },
					{ rel: "preconnect", href: "//mc.yandex.ru" },
					{ rel: "dns-prefetch", href: "//mc.yandex.ru" }
				],
                buildDate: new Date().toString(),
                mode: mode,
                yandexMetrika: `
					<script type="text/javascript" >
					   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					   ym(77888665, "init", {
							clickmap:true,
							trackLinks:true,
							accurateTrackBounce:true,
							webvisor:true
					   });
					</script>
					<noscript><div><img src="https://mc.yandex.ru/watch/77888665" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
                `,
                minify: isProd
            })
        ];

		// <script type="text/javascript" >
		// 	setTimeout(() => {
		// 	(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		// 		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		// 	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
		// 	ym(77888665, "init", {
		// 	clickmap:true,
		// 	trackLinks:true,
		// 	accurateTrackBounce:true,
		// 	webvisor:true
		// });
		// }, 400);
		// </script>
		// <noscript><div><img src="https://mc.yandex.ru/watch/77888665" style="position:absolute; left:-9999px;" alt="" /></div></noscript>

        if (isProd) {
			plugins.push(
				new CopyWebpackPlugin({
					patterns: [
						{ from: "./ejs/.htaccess", to: "./.htaccess", toType: "file"},
						{ from: "./images/home-page/about.jpg", to: "./images/main.jpg", toType: "file"},
					]
				})
			);

			plugins.push(
				new RobotstxtPlugin({ configFile: "./src/robots-txt.config.js" })
			);

            plugins.push(
                new MiniCSSExtractPlugin({
                    filename: fixSlashes(path.join(paths.folders.style, getFilenameTemplate("main", "fullhash", "css")))
                })
            );

            // Compress images
            plugins.push(
                new ImageminPlugin({
                    test: /\.(jpe?g|png|gif|svg|webp)$/i,
                    optipng: {
                        optimizationLevel: 6,
                    },
                    svgo: {
                        plugins: [ {
                            removeViewBox: false
                        }, {
                            convertStyleToAttrs: false
                        }]
                    },
                    plugins: [
                        imageminMozjpeg({
                            quality: 70,
                            progressive: true
                        })
                    ]
                })
            );
        }

        return plugins;
    }

    const cssLoaders = (extra, module = false) => {
        let loaders = [
			isProd ?
				{
					loader: MiniCSSExtractPlugin.loader,
					options: {
						publicPath: "../"
					},
				} : "style-loader",
            {
                loader: require.resolve("css-loader"),
                options: {
                    importLoaders: 2,
                    modules: module ? {
                        compileType: "module",
                        localIdentName: "[local]___[name]___[hash:base64:5]"
                    } : false
                }
            }
        ];

        // post css
        if (isProd) {
            loaders.push({
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [[
                            "postcss-preset-env",
                            { autoprefixer: {grid: "autoplace"} },
                            "postcss-object-fit-images"
                        ]],
                    },
                },
            });
        }

        // extra css
        if (extra) {
            if (typeof extra === "string") {
                loaders.push(extra);
            } else if (extra instanceof Array) {
                loaders = loaders.concat(extra);
            }
        }

        return loaders;
    }

/* --------------- return  ------------------------------------- */

	return {
        context: paths.src.abs,
        target: isProd ? "browserslist" : "web", // disable browserslist for development
        devtool: isProd ? undefined : "source-map",
        resolve: {
            extensions: [".js", ".jsx", ".json"],
            alias: {
                "@": paths.src.abs,
                "js": path.resolve(paths.src.abs, paths.folders.js),
                "style": path.resolve(paths.src.abs, paths.folders.style),
                "img": path.resolve(paths.src.abs, paths.folders.img),
                "translation": path.resolve(paths.src.abs, paths.folders.translation),
                "components": path.resolve(paths.src.abs, paths.folders.components),
                "html": path.resolve(paths.src.abs, paths.folders.html),
            }
        },
        optimization: {
            splitChunks: {
                chunks: isProd ? "all" : "async"
            },
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                `...`,
                new CssMinimizerPlugin()
            ]
        },
        performance: {
            maxEntrypointSize: isProd ? 250000 : 1024*1024,
            maxAssetSize: isProd ? 250000 : 1024*1024
        },
        mode: isProd ? "production" : "development",
        devServer: {
            open: true,
            port: 4201,
			// host: "192.168.1.45",
			host: "localhost",
            proxy: {
                "/api": {
                    target: "http://localhost:5003"
                },
                "/*/**": {
                    pathRewrite: function (path, req) {
                        const index = req.rawHeaders.findIndex(item => item === "Referer");
                        if (index === -1) return ""; // not found header
                        const u = req.rawHeaders[index + 1].replace(/\/[^\/]*$/, "");
                        const url = new URL(u);
                        const pathName = url.pathname;
                        return req.url.replace(pathName, "");
                    },
                    target: "http://localhost:4201",
                    changeOrigin: false
                }
            },
            publicPath: "/",
            overlay: {
                warnings: true,
                errors: true
            },
            historyApiFallback: true
        },
        entry: {
            main: fixSlashes("./" + path.join(paths.folders.js, "index.js"))
        },
        output: {
            path: isProd ? paths.dist.release.abs : paths.dist.debug.abs,
            publicPath: "./",
            filename: fixSlashes(path.join(paths.folders.js, getFilenameTemplate("[name]", "fullhash", "js")))
        },
        module: {
            rules: [
                // HTML
                {
                    test: /\.ejs$/i,
                    exclude: /node_modules/,
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    }
                },

                // Loading images
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    exclude: path.resolve(__dirname, paths.src.rel, paths.folders.fonts),
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: paths.folders.img,
                                name: getFilenameTemplate("[name]", "hash", "[ext]"),
                                esModule: false
                            }
                        }
                    ]
                },

                // SVG
                {
					test: /\.(svg)$/,
					exclude: path.resolve(__dirname, paths.src.rel, paths.folders.fonts),
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: paths.folders.svg,
								name: getFilenameTemplate("[name]", "hash", "svg"),
								esModule: false
							}
						}
					]
                },

                // Loading fonts
                {
                    test: /fonts?.*\.(ttf|otf|eot|woff2?|svg)$/,
                    use: [
                        {
							loader: "file-loader",
							options: {
								outputPath: paths.folders.fonts,
								name: "[name]/[name].[ext]",
								esModule: false
							}
                        }
                    ]
                },

                // Babel loader
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },

                // CSS loaders
                {
                    test: /\.(css)$/,
                    use: cssLoaders()
                },

                // SCSS loaders
                // SCSS except modules
                {
                    test: /\.(s[ca]ss)$/,
                    exclude: /\.module\.s[ca]ss$/,
                    use: cssLoaders("sass-loader", false)
                },
                // SCSS modules
                {
                    test: /\.module\.scss$/,
                    use: cssLoaders("sass-loader", true)
                }
            ]
        },
        plugins: getPlugins()
    };
}

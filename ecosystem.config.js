module.exports = {
    apps: [{
        name: "gvent35.ru",
        script: "npm -- run server:prod",
        env: {
            NODE_ENV: "development"
        },
        env_production : {
            NODE_ENV: "production"
        },
        error_file: "err.log",
        out_file: "out.log",
        log_file: "combined.log",
        autorestart: true,
        watch: false,
        instance_var: "5003",
        append_env_to_name: true
    }]
}

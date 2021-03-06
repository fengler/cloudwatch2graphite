
exports.readCmdOptions = function() {
    // this will read the default configuration file
    var config = require('config');
    var parseArgs = require('minimist')(process.argv.slice(2));

    // show help message if -h or --help is present
    if (parseArgs.h || parseArgs.help) {
        console.log("This app uses config/default.json as default config file. Use config/default.json.sample as a base " +
        "to create your own configuration with correct AWS credentials.");
        console.log("Config file name can be overridden by -c or --config-file command line argument");
        process.exit(0);
    }

    var overrideConfig = parseArgs["c"] || parseArgs["config-file"]

    // override configuration if -c or --config-file is present
    if (overrideConfig) {
        var fs = require('fs');
        var configJson = fs.readFileSync("./config/" + overrideConfig);
        config = JSON.parse(configJson);
    }

    if(!config.metricsConfig || !config.metricsConfig.metrics) {
        console.error("Error: Invalid metric configuration");
        process.exit(1);
    }

    return config;
}


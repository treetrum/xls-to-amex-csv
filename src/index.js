const yargs = require("yargs");
const xlsToAmexCSV = require("./xlsToAmexCSV");

const argv = yargs
    .option("input", {
        alias: "i",
        description: "The input file to parse",
        type: "string",
        required: true
    })
    .option("output", {
        alias: "o",
        description: "The output file",
        type: "string",
        required: true
    })
    .help()
    .alias("help", "h").argv;

xlsToAmexCSV(argv.input, argv.output);

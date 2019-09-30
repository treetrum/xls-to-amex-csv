const xlsx = require("xlsx");
const csvParse = require("csv-parse");
const csvStringify = require("csv-stringify");
const moment = require("moment");
const fs = require("fs");

const xlsToAmexCSV = (INPUT_FILE, OUTPUT_FILE) => {
    const wb = xlsx.readFile(INPUT_FILE);
    const rawCSV = xlsx.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);
    const csvFromDate = rawCSV.substring(rawCSV.indexOf("Date"), rawCSV.length);

    const parsed = csvParse(csvFromDate, {}, (error, output) => {
        if (error) throw error;
        const modifiedLines = [];
        if (output.length) {
            output.forEach((row, index) => {
                if (index !== 0) {
                    row[0] = moment(row[0], "DD MMM YYYY").toISOString();
                }
                modifiedLines.push(row);
            });
            debugger;
        }
        csvStringify(modifiedLines, (stringifyError, modifiedString) => {
            if (stringifyError) throw stringifyError;
            fs.writeFile(OUTPUT_FILE, modifiedString, err => {
                if (err) throw err;
                console.log("DONE");
            });
        });
    });
};

module.exports = xlsToAmexCSV;

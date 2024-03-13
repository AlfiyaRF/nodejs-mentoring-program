const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const UNIX_OS_CMD = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const WINDOWS_OS_CMD = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

function getCommandForOS() {
    const type = os.type();
    switch (type) {
        case 'Windows_NT':
          return WINDOWS_OS_CMD;
        case 'Linux':
        case 'Darwin':
          return UNIX_OS_CMD;
        default:
          return null;
    }
}

async function getOutput(command) {
    const execCmd = promisify(exec);
    const out = await execCmd(command);
    return out.stdout.trim();
}

async function writeLog(command) {
    const output = await getOutput(command);
    const time = Math.floor(new Date().getTime() / 1000)
    const log = `${time} : ${output}\n`;

    fs.appendFile('src/task2/activityMonitor.log', log, (err) => {
        if (err) throw err;
    });
}

async function printOutput(command) {
    const out = await getOutput(command);
    process.stdout.write(out + '\r');
}

function setCbInterval(cb, interval) {
    const command = getCommandForOS();
    cb(command);
    setInterval(() => {
        cb(command);
    }, interval);
}

async function getCmdOutput() {
    setCbInterval(printOutput, 100);
    setCbInterval(writeLog, 60000);
}

module.exports = {
    getCmdOutput,
};
import {
    TerminalWindow,
    TerminalWindowGroup,
    TerminalWindowMenu
} from
    "../submodules/NodeJs-TerminalWindow/src";

import
    "./keyboardListeners";

import {
    spawn
} from
    "child_process";

// -----------------------------------------------------------------------------

process.stdout.write("\x1b[2J"); // clear terminal
process.stdout.write("\x1b[?25l"); // hide cursor
process.on('exit', () => {
    process.stdout.write("\x1b[2J"); // clear terminal
    process.stdout.write("\x1b[?25h"); // show cursor on exit
});

// -----------------------------------------------------------------------------

const menu = new TerminalWindowMenu(0, 0, 25, -10, 'menu');
const info = new TerminalWindow(0, -9, 25, null, 'info');
const log = new TerminalWindowGroup(26, 0, null, null, 'log');

// -----------------------------------------------------------------------------

const addProcess = (title: string, command: string, ...options: string[]) => {
    const panel = log.addPanel(title);
    const cmd = spawn(command, options);
    menu.panel.addOption(title, () => log.selectPanel(panel));
    cmd.stdout.on('data', data => panel.addContent(data));
}

addProcess("Ping no Google", "ping", "google.com");
addProcess("Ping no Facebook", "ping", "facebook.com");
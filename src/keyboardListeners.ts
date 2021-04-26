import { TerminalWindow, TerminalWindowMenu } from "../submodules/NodeJs-TerminalWindow/src";

const readline = require("readline");
const stdin = process.stdin;
readline.emitKeypressEvents(stdin);
stdin.setRawMode(true);

stdin.on("keypress", (c, key) => {
    if (key.name == "tab" && key.shift) {
        TerminalWindow.prevWindow();
        return;
    }

    if (key.name == "tab") {
        TerminalWindow.nextWindow();
        return;
    }

    if (key.name == "return" && TerminalWindow.currentWindow instanceof TerminalWindowMenu) {
        TerminalWindow.currentWindow.panel.selectCurretOption();
        return;
    }

    if (key.name == "up" && key.ctrl && TerminalWindow.currentWindow instanceof TerminalWindowMenu) {
        TerminalWindow.currentWindow.panel.onlyScrollUp();
        return;
    }

    if (key.name == "down" && key.ctrl && TerminalWindow.currentWindow instanceof TerminalWindowMenu) {
        TerminalWindow.currentWindow.panel.onlyScrollDown();
        return;
    }

    if (key.name == "up") {
        TerminalWindow.currentWindow.panel.scrollUp();
        return;
    }

    if (key.name == "down") {
        TerminalWindow.currentWindow.panel.scrollDown();
        return;
    }

    if (key.name == "left") {
        TerminalWindow.currentWindow.panel.scrollLeft();
        return;
    }

    if (key.name == "right") {
        TerminalWindow.currentWindow.panel.scrollRight();
        return;
    }

    if (key.name == 'c' && key.ctrl) {
        process.exit();
    }

    console.log(c, key)
});
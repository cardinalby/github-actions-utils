#!/usr/bin/env node

import {exec, ExecException} from 'child_process';

if (process.argv.length !== 3) {
    process.stderr.write(process.argv.length < 3
        ? 'File path is not provided'
        : 'Too many arguments'
    );
    process.exit(1);
}

const filePath = process.argv[2];
if (filePath.length === 0 || filePath.indexOf('"') !== -1) {
    process.stderr.write('Invalid file path provided');
    process.exit(1);
}

exec(
    `git status --porcelain "${filePath}"`,
    (error: ExecException | null, stdout: string, stderr: string) => {
        if (error || stdout || stderr) {
            process.stderr.write(
                `${filePath} is changed during the workflow. ` +
                "Please ensure, you didn't forget to build and pack your action before commit"
            );
            process.exit(1);
        }
        process.stdout.write(`No changes found in ${filePath}`);
    });
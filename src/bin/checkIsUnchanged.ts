#!/usr/bin/env node

import {exec, ExecException} from 'child_process';
import * as ghActions from '@actions/core';

function checkIsUnchanged() {
    if (process.argv.length !== 3) {
        ghActions.setFailed(process.argv.length < 3
            ? 'File path is not provided'
            : 'Too many arguments');
        return;
    }

    const filePath = process.argv[2];
    if (filePath.length === 0 || filePath.indexOf('"') !== -1) {
        ghActions.setFailed('Invalid file path provided');
        return;
    }

    exec(
        `git status --porcelain "${filePath}"`,
        (error: ExecException | null, stdout: string, stderr: string) => {
            if (error || stdout || stderr) {
                ghActions.setFailed(
                    `${filePath} is changed during the workflow. ` +
                    "Please ensure, you didn't forget to build and pack your action before commit. Diff:"
                );
                if (error) {
                    return;
                }
                exec(
                    `git diff "${filePath}"`,
                    (error: ExecException | null, stdout: string) => {
                        process.stdout.write(stdout);
                    })
            } else {
                ghActions.info(`No changes found in ${filePath}`);
            }
        });
}

checkIsUnchanged();
import * as ghActions from '@actions/core';
import { getWorkspacePath } from './actionContext';

function hasInteger(string: string) {
    return /^[-+]?\d+$/.test(string);
}

function isNumeric(string: string) {
    return isFinite(parseFloat(string));
}

function getPathInput(inputName: string, required: true): string;
function getPathInput(inputName: string, required: false): string|undefined;
function getPathInput(inputName: string, required: boolean): string|undefined {
    const input = ghActions.getInput(inputName, { required });
    if (required && !input) {
        throw new Error(`Input ${inputName} is empty`)
    }
    return input
        ? getWorkspacePath(input)
        : undefined;
}

function getBoolInput(inputName: string, required: true): boolean;
function getBoolInput(inputName: string, required: false): boolean|undefined;
function getBoolInput(inputName: string, required: boolean): boolean|undefined {
    const input = ghActions.getInput(inputName, { required }).toLowerCase();
    if (input === '1' || input === 'true' || input === 'yes') {
        return true;
    }
    if (input === '0' || input === 'false' || input === 'no') {
        return false;
    }
    if (!required && input === '') {
        return undefined;
    }
    throw new Error(`Input ${inputName} has invalid boolean value`);
}

function getIntInput(inputName: string, required: true): number;
function getIntInput(inputName: string, required: false): number|undefined;
function getIntInput(inputName: string, required: boolean): number|undefined {
    const input = ghActions.getInput(inputName, { required })
    if (hasInteger(input)) {
        return parseInt(input, 10);
    }
    if (!required && input === '') {
        return undefined;
    }
    throw new Error(`Input ${inputName} has invalid integer value`);
}

function getNumberInput(inputName: string, required: true): number;
function getNumberInput(inputName: string, required: false): number|undefined;
function getNumberInput(inputName: string, required: boolean): number|undefined {
    const input = ghActions.getInput(inputName, { required })
    if (isNumeric(input)) {
        return parseFloat(input);
    }
    if (!required && input === '') {
        return undefined;
    }
    throw new Error(`Input ${inputName} has invalid number value`);
}

function getStringInput(inputName: string, required: true, isSecret: boolean): string;
function getStringInput(inputName: string, required: false, isSecret: boolean): string|undefined;
function getStringInput(inputName: string, required: boolean, isSecret: boolean = false): string|undefined {
    const input = ghActions.getInput(inputName, { required });
    if (!required && input === '') {
        return undefined;
    }
    if (isSecret) {
        ghActions.setSecret(input);
    }
    return input;
}

export const actionInputs = {
    getString: getStringInput,
    getInt: getIntInput,
    getFloat: getNumberInput,
    getBool: getBoolInput,
    getWsPath: getPathInput
}

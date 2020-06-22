import * as ghActions from '@actions/core';

export class ActionOutput {
    private readonly _name: string;
    private _value: string | undefined;

    constructor(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public getValue(): string | undefined {
        return this._value;
    }

    public setValue(value: string) {
        this._value = value;
        ghActions.setOutput(this._name, value);
    }
}

export class ActionTrOutput<T> {
    private readonly _name: string;
    private readonly _transform: (v: T) => string;
    private _value: T | undefined;
    private _stringValue: string | undefined;

    constructor(name: string, transform: (v: T) => string) {
        this._name = name;
        this._transform = transform;
    }

    public getName(): string {
        return this._name;
    }

    public getValue(): T | undefined {
        return this._value;
    }

    public setValue(value: T) {
        this._value = value;
        this._stringValue = this._transform(value);
        ghActions.setOutput(this._name, this._stringValue);
    }

    public getStringValue(): string | undefined {
        return this._stringValue;
    }
}
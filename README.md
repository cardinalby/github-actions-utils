![Build status](https://github.com/cardinalby/github-actions-utils/workflows/npm-publish/badge.svg)
## Introduction
Common utils JS/TS Github Action

## Installation
`npm install github-actions-utils`

## Usage
### Handling inputs
Extract available inputs to the object and check theirs types:
```typescript
import { actionInputs, transformIfSet } from 'github-actions-utils';

const myActionInputs = {
    // required
    input1: actionInputs.getString('input1', true),
    secretInput2: actionInputs.getString('secretInput2',
        true, // required 
        true  // set value as secret
    ),
    // cast to int (or throw), optional
    intInput: actionInputs.getInt('intInput'),
    // cast to number (or throw), optional,
    floatInput: actionInputs.getFloat('floatInput'),
    // return absolute path from relative to GITHUB_WORKSPACE, required
    pathInput: actionInputs.getWsPath('pathInput', true),
    // read string input (optional) and transform it to array (split by | sign)
    arrayInput: transformIfSet(actionInputs.getString('arrayInput', false), s => s.split('|')),
};
```

### Handling outputs
Extract available outputs to the object:
```typescript
import { ActionOutput, ActionTrOutput } from 'github-actions-utils';

const myActionOutputs = {
    output1Name: new ActionOutput('output1Name'),
    // accepts array, joins it to string using | glue
    arrayOutput2Name: new ActionTrOutput('arrayOutput2Name', v => v.join('|')),
    // accepts boolean value, converts to 'true' or 'false' string
    boolOutputName: new ActionTrOutput<boolean>('boolOutputName', b => b ? 'true' : 'false'),
};

// Calls setOutput(...) inside
myActionOutputs.output1Name.setValue('output1value');
myActionOutputs.arrayOutput2Name.setValue(['el1', 'el2']);
myActionOutputs.boolOutputName.setValue(true);

myActionOutputs.arrayOutput2Name.getValue(); // -> ['el1', 'el2']
myActionOutputs.arrayOutput2Name.getStringValue(); // -> 'el1|el2'
```
extensionName: new ActionOutput('extensionName'),

### Check ncc package is built
If you use `ncc` command to pack your action code (as 
[github example](https://github.com/actions/javascript-action) suggests), you may want to ensure that you
didn't forget to run `ncc` command and commit packed js file.

Add script to your `package.json`:
```json
...
"scripts": {
    "build": "tsc",
    "pack": "ncc build",
    "all": "npm run build && npm run pack",
    "checkPackCommited": "checkIsUnchanged ./dist/index.js"   <---- this one
  }
...
```
Add script call in a build-test workflow after pack:
```yaml
- name: Check pack is up-to-date
  run: npm run checkPackCommited
```
This command will check that after build performed in workflow `./dist/index.js` file remains unchanged.
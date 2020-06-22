![Build status](https://github.com/cardinalby/github-actions-utils/workflows/npm-publish/badge.svg)
### Introduction
Common utils JS/TS Github Action

### Installation
`npm install github-actions-utils`

### Usage
```typescript
import { actionInputs } from 'github-actions-utils';
const strInput = actionInputs.getString('inputName', true /** required */);
const absPath = actionInputs.getWsPath('inputNameWithRelativePath', true /** required */);
...
```
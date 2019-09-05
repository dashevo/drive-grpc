# Drive GRPC

[![Build Status](https://travis-ci.com/dashevo/drive-grpc.svg?branch=master)](https://travis-ci.com/dashevo/drive-grpc)
[![NPM version](https://img.shields.io/npm/v/@dashevo/drive-grpc.svg)](https://npmjs.org/package/@dashevo/drive-grpc)

> Drive GRPC definition files and generated clients

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
npm install @dashevo/dapi-grpc
```

## Usage

```js
import {
  TransactionsPromiseClient,
  StartTransactionRequest,
} from '@dashevo/drive-grpc';

const client = new TransactionPromiseClient('http://localhost:8080');

const request = new StartTransactionRequest();

await client.startTransaction(request);
```

## Contributing

Feel free to dive in! [Open an issue](https://github.com/dashevo/drive-grpc/issues/new) or submit PRs.

## License

[MIT](LICENSE) &copy; Dash Core Group, Inc.

#!/usr/bin/env bash

PROTO_PATH="$PWD/protos"
CLIENTS_PATH="$PWD/clients"

BUILD_PATH="$PWD/build"

# Clean build

rm -rf "$BUILD_PATH/*"

# Generate client for `Transaction` service

docker run -v "$PROTO_PATH:$PROTO_PATH" \
           -v "$BUILD_PATH:$BUILD_PATH" \
           --rm \
           grpcweb/common \
           protoc -I="$PROTO_PATH" "transaction.proto" \
                   --js_out="import_style=commonjs:$BUILD_PATH"

# Clean node message classes

rm -rf "$CLIENTS_PATH/nodejs/*_protoc.js"
rm -rf "$CLIENTS_PATH/nodejs/*_pbjs.js"

# Copy compiled modules with message classes

cp "$BUILD_PATH/transaction_pb.js" "$CLIENTS_PATH/nodejs/transaction_protoc.js"

# Generate node message classes

$PWD/node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -r core_root -o "$CLIENTS_PATH/nodejs/transaction_pbjs.js" "$PROTO_PATH/transaction.proto"

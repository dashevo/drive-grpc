#!/usr/bin/env bash

PROTO_PATH="$PWD/protos"
CLIENTS_PATH="$PWD/clients"

BUILD_PATH="$PWD/build"

# Clean node message classes

rm -rf "$CLIENTS_PATH/nodejs/*_protoc.js"
rm -rf "$CLIENTS_PATH/nodejs/*_pbjs.js"

for file in $PROTO_PATH/*
do
    if [[ -f $file ]]; then
        # Generate client

        file_name=$(basename $file)
        service_name=${file_name%.proto}

        docker run -v "$PROTO_PATH:$PROTO_PATH" \
                -v "$BUILD_PATH:$BUILD_PATH" \
                --rm \
                grpcweb/common \
                protoc -I="$PROTO_PATH" "$file_name" \
                        --js_out="import_style=commonjs:$BUILD_PATH"

        # Copy compiled modules with message classes

        cp "$BUILD_PATH/${service_name}_pb.js" "$CLIENTS_PATH/nodejs/${service_name}_protoc.js"

        # Generate node message classes

        $PWD/node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -r ${service_name}_root -o \
            "$CLIENTS_PATH/nodejs/${service_name}_pbjs.js" \
            "$PROTO_PATH/${file_name}"
    fi
done

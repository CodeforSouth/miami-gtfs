#!/bin/sh

for n in `seq 1 10`; do curl -o `date +%s`.json localhost:3000/api/protobuf; sleep 120; done

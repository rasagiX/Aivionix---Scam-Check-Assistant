#!/usr/bin/env bash

cd frontend
npm install
npm run build

cd ...
cp -r fontend/dist backend/dist

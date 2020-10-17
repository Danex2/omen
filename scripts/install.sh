#!/bin/env bash

curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
yum install -y nodejs
yum install -g pm2
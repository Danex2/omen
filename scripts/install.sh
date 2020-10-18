#!/bin/env bash

set -e

curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
echo TOKEN=$(aws ssm get-parameter --name "TOKEN" --query "Parameter.Value") >> .bash_profile
echo export TOKEN >> .bash_profile
yum install -y nodejs
yum install -y yarn
npm install -g pm2
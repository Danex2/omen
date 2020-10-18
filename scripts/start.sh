#!/bin/env bash

cd /home/ec2-user/app

echo TOKEN=$(aws ssm get-parameter --name "TOKEN" --query "Parameter.Value") >> .bash_profile
echo export TOKEN >> .bash_profile

pm2 start index.js --name omen
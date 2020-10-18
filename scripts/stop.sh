#!/bin/env bash

echo TOKEN=$(aws ssm get-parameter --name "TOKEN" --query "Parameter.Value") >> .bash_profile
echo export TOKEN >> .bash_profile

cd /home/ec2-user/app

pm2 stop omen
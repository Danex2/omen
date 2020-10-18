#!/bin/env bash

cd /home/ec2-user/app

export TOKEN=$(aws ssm get-parameter --name "TOKEN" --query "Parameter.Value") 

yarn
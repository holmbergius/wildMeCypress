#!/bin/bash

MOST_RECENT_BUILD=`curl -s 'https://circleci.com/api/v1.1/recent-builds?circle-token=b496d22a9ebbed3ae8c8836287d5974d01975f4a&limit=1'| grep 'build_num'|grep -o '\d\+'|sort -r|head -n1`

curl -X POST "https://circleci.com/api/v1.1/project/github/Atticus29/wildMeCypress/$MOST_RECENT_BUILD/retry?circle-token=b496d22a9ebbed3ae8c8836287d5974d01975f4a"


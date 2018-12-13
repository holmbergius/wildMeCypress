#!/bin/bash

PERSONAL_TOKEN=c527ed3d832e3d106ee1e5fd7be0147185984172

MOST_RECENT_BUILD=`curl -s "https://circleci.com/api/v1.1/recent-builds?circle-token=$PERSONAL_TOKEN&limit=1"| grep 'build_num'|grep -o '\d.'|sed 's/,//g'|sort -r -n|head -n1`

curl -X POST "https://circleci.com/api/v1.1/project/github/holmbergius/wildMeCypress/$MOST_RECENT_BUILD/retry?circle-token=$PERSONAL_TOKEN"


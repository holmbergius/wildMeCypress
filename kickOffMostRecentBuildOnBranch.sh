#!/bin/bash
PERSONAL_TOKEN=c527ed3d832e3d106ee1e5fd7be0147185984172
MOST_RECENT_SUCCESSFUL_BUILD_ON_BRANCH=`curl -s "https://circleci.com/api/v1.1/project/github/holmbergius/wildMeCypress/tree/matchCheckOnly?circle-token=$PERSONAL_TOKEN&limit=1" | jq '.[0].previous_successful_build.build_num'`
curl -X POST "https://circleci.com/api/v1.1/project/github/holmbergius/wildMeCypress/$MOST_RECENT_SUCCESSFUL_BUILD_ON_BRANCH/retry?circle-token=$PERSONAL_TOKEN" | jq '.status'

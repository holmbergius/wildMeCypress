#!/bin/bash
PERSONAL_TOKEN=c527ed3d832e3d106ee1e5fd7be0147185984172
curl -X POST "https://circleci.com/api/v1.1/project/github/holmbergius/wildMeCypress/tree/matchCheckOnly?circle-token=$PERSONAL_TOKEN" | jq '.status'

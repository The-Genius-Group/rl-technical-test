#!/bin/bash
while IFS= read -r line; do
    # Skip empty lines and comments
    if [[ -z "$line" || "$line" =~ ^# ]]; then
        continue
    fi

    #Remove ISO formatted date from end of string
    line=$(echo "$line" | sed -E 's/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$//')

    #Trim leading and trailing whitespace
    line=$(echo "$line" | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')

    #Replace all whitespace with '='
    line=$(echo "$line" | sed -E 's/[[:space:]]+/=/g')

    echo "$line"
done
for file in ./cypress/integration/*
do
  sed -i.bak 's/[^a-z]it(/it.skip(/g' "$file"
done



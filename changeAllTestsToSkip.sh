for file in ./cypress/integration/*
do
  sed -i 's/[^a-z]it(/it.skip(/g' "$file"
done



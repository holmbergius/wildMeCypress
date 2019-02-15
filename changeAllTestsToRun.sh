for file in ./cypress/integration/currentWildbookLive/*
do
  ls -larth $file
  sed -i '' 's/^it.skip(/it(/g' "$file"
  sed -i '' 's/[^a-z]it.skip(/it(/g' "$file"
done



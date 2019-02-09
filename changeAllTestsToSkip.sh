for file in ./cypress/integration/currentWildbookLive/*
do
  ls -larth $file
  sed -i '' 's/^it(/it.skip(/g' "$file"
  sed -i '' 's/[^a-z]it(/it.skip(/g' "$file"
done

for file in ./cypress/integration/flukeBookLive/*
do
  ls -larth $file
  sed -i '' 's/^it(/it.skip(/g' "$file"
  sed -i '' 's/[^a-z]it(/it.skip(/g' "$file"
done

for file in ./cypress/integration/localInstance/*
do
  ls -larth $file
  sed -i '' 's/^it(/it.skip(/g' "$file"
  sed -i '' 's/[^a-z]it(/it.skip(/g' "$file"
done



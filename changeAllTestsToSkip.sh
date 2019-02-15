for file in ./cypress/integration/*/*
do
  ls -larth $file
  sed -i '' 's/^it(/it.skip(/g' "$file"
  sed -i '' 's/[^a-z]it(/it.skip(/g' "$file"
done

echo "TRAVIS_BRANCH"
echo $TRAVIS_BRANCH

echo "TRAVIS_TAG"
echo $TRAVIS_TAG

NODE_ENV='development'

if [[ $TRAVIS_BRANCH == "master" && -z "$TRAVIS_TAG" ]]; then
  NODE_ENV='staging'
  echo 'staging'
elif [ ! -z "$TRAVIS_TAG" ]; then
  NODE_ENV='production'
  echo 'PROD'
fi

export $NODE_ENV

#!/usr/bin/env bash

echo "Current version:"
git describe --tags

echo
echo "Enter new version:"
read VERSION

echo $VERSION

# # Pull, create a version, and push.
git checkout master
git pull
git tag -a $VERSION -m `${VERSION}`
git push -u origin --tags

echo "Pushed! Please visit https://github.com/hdavidzhu/purpose/releases"

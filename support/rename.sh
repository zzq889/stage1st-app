#!/usr/bin/env bash

oldAppName=Stage1st
oldLowerCaseName=`echo $oldAppName | tr '[:upper:]' '[:lower:]'`
newAppName=$1
newLowerCaseName=`echo $newAppName | tr '[:upper:]' '[:lower:]'`

appRoot=`dirname $0`/..

[ -z "${newAppName}" ] && echo 'Missing required parameter newAppName' && exit 1

# gather all modification targets
filesToModify=$(grep -riIl "$oldLowerCaseName" --exclude='rename.sh' $appRoot/*)
filesToRename=$(find "${appRoot}/ios" "${appRoot}/android" -type f -ipath "*${oldLowerCaseName}*")

# replace strings in files
for fileToModify in $filesToModify; do
  sed -i.bak "s/${oldAppName}/${newAppName}/g;s/${oldLowerCaseName}/${newLowerCaseName}/g" $fileToModify
done
find "${appRoot}" -name '*.bak' -exec rm {} \;

if [ -d "${appRoot}/.git" -a -n "$(command -v git)" ]; then
  # stage all string replacements and set up to stage renames, below
  git add --update
  mvCmd="git mv"
else
  mvCmd="mv"
fi

for fileToRename in $filesToRename; do
  newName=$(echo $fileToRename | sed "s/$oldAppName/$newAppName/g;s/$oldLowerCaseName/$newLowerCaseName/g")
  mkdir -p $(dirname "$newName") && $mvCmd "$fileToRename" "$newName"
done

# remove leftover empty directories
rmdir -p $(find "$appRoot" -ipath "*${oldLowerCaseName}*" -type d) 2>/dev/null

YELLOW='\033[1;33m'
CLEAR='\033[0m'
printf "\nRenamed application to ${newAppName}"
printf "${YELLOW}\n\nIf you have previously built the application, please clean your build artifacts"
printf "${YELLOW}\n\nAndroid:\n(cd android; ./gradlew clean)"
printf "${YELLOW}\n\niOS:\nClean build folders in XCode (Option+Shift+Cmd+K)\nReinstall CocoaPods (cd ios; pod install)\n"

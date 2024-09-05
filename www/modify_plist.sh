#!/bin/bash
# Path to the Info.plist file within your project
PLIST="./platforms/ios/Hoffman App/Hoffman App-Info.plist"

# Check if PlistBuddy is available on the system
if ! command -v /usr/libexec/PlistBuddy &> /dev/null
then
    echo "PlistBuddy could not be found"
    exit
fi

# Add NSAppTransportSecurity to Info.plist
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity dict" "$PLIST"

# Allow arbitrary loads (disables ATS)
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSAllowsArbitraryLoads bool true" "$PLIST"

echo "Modified Info.plist successfully."

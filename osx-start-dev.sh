#!/usr/bin/env bash

CLIENT_APP=~/palloncino/antonioguiotto/client
SERVER_APP=~/palloncino/antonioguiotto/server

# This script is ONLY for OSX using Terminal 

osascript -e "
      tell application \"Terminal\"
        activate
        tell application \"System Events\" to keystroke \"t\" using command down
        
        repeat while contents of selected tab of window 1 starts with linefeed
          delay 0.2
        end repeat
        do script \"cd $CLIENT_APP && npm start\" in window 1
        tell application \"System Events\" to keystroke \"t\" using command down
        
        repeat while contents of selected tab of window 1 starts with linefeed
          delay 0.2
        end repeat
        do script \"cd $CLIENT_APP && npm run sass:watch\" in window 1
        tell application \"System Events\" to keystroke \"t\" using command down

        repeat while contents of selected tab of window 1 starts with linefeed
          delay 0.2
        end repeat
        do script \"cd $SERVER_APP && npm run start:dev\" in window 1

      end tell
    "

echo "⚡️ Everything is up and running ⚡️ 💪😝🤙";
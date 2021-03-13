# Record Your Life Every 1 hour
A tool that can improve your productivity.
Record what you were doing every 1 hour helps you examine your life and prevents procrastinating.

# Dependencies
If you want to try other static web server to serve the page, you can skip this part.
* Python
* Flask (a python library)

# How to use
1. Use a static web server to serve the `index.html` page (the default web server is `static_page_server.py`)
1. In your browser, go to the website the server served (go to `http://127.0.0.1:9487`)
1. Accept the notification permission

# Fetures
* It caches all resources needed in your browser. Once you open this tool in your browser, you can close your web server.
* This tool is inspired by PWA. You can install this tool in your device.
* Every 1 hour this tool will display desktop notification. Click the notification and the tool will open.
* In `index.html`, press `submit` button to store your life record in the indexDB, `Save Record` to save records, `Clear Record` to clear all data in the indexDB, and `Reset Timer` to reset the 1 hour timer.

# License
It is MIT licensed.

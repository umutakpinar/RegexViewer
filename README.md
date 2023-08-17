# VBRegexViewer
  Simple Regex Viewer Desktop App.

- Run VBRegexViewer without installation :
  ---
    - **via browser** : Clone the repo. Double click main.html file or open it with any web browser.
    - **via electron.js**  : Locate the cloned folder. Open terminal, run `npm start` (needs electron.js).

- Run VBRegexViewer with installation :
  ---
    - Existed Builds
      ---
        - Go to download page : [VBRegexViewer](https://drive.google.com/drive/folders/1Lfcm4sCOWE2Us1Oulh_ZqjFxUmWExfNy?usp=share_link)
        - Download and extract the related .zip file which compatible with your OS.
        - Run vbregexviewer.exe for Windows or run vbregexviewer for MacOS.
          
    - Taking a Fresh Build
      ---
        You can take your own build file for any OS with electron.
        - Install Node.js & Npm.
        - Clone the repo.
        - Locate the cloen folder, run `npm install` and install the project dependencies.
        - run `npm install electron-packager -g`
            - for MacOS Build (x86) :  
              `electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds`
            - for MacOS Build (arm64) :  
              `electron-packager . --overwrite --platform=darwin --arch=arm64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds`
            - for Windows Build :  
              `electron-packager . vbregexviewer --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="VBRegexViewer"`
        - Your build files will appear under the release-builds folder.   
          > [!NOTE]
          > For Linux builds see the electron [documentation](https://www.electronjs.org/docs/latest/development/build-instructions-linux).
---
- Screenshots
  ---
  ![Shows process time & matches](https://github.com/umutakpinar/RegexViewer/blob/c615519ccfb224865013ea1aaf0a7232cb1633a7/screenshots/screenshot_1.png)
  ![Supports dark mode](https://github.com/umutakpinar/RegexViewer/blob/c615519ccfb224865013ea1aaf0a7232cb1633a7/screenshots/screenshot_2.png)
  ![Light mode](https://github.com/umutakpinar/RegexViewer/blob/c615519ccfb224865013ea1aaf0a7232cb1633a7/screenshots/screenshot_3.png)
  ![Setting the flags](https://github.com/umutakpinar/RegexViewer/blob/c615519ccfb224865013ea1aaf0a7232cb1633a7/screenshots/screenshot_4.png)

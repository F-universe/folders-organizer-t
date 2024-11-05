Folder Organizer Application
This application is a simple web-based file and folder management system built with Flask for the backend and HTML/CSS/JavaScript for the frontend. It allows users to create, rename, view, and upload files within folders, as well as open files directly from the interface.

Main Features
Folder Creation: Create new folders from the interface.
Folder Renaming: Rename existing folders in both the interface and the filesystem.
File Upload: Upload files to the selected folders and view them in the interface.
File Viewing: Display the files within a folder and make them clickable to open.
Fullscreen Folder View Modal: When a folder is opened, it displays in a fullscreen modal with a list of files and a central upload button, which can also be triggered using the Alt+C shortcut.


app.py:

Manages the backend of the project using Flask.
Provides endpoints for:
Uploading files to a specific folder.
Renaming an existing folder.
Retrieving a list of files within a folder.
Serving files from the directory, allowing them to be opened directly in the browser.
templates/index.html:

Defines the structure of the user interface page.
Includes the button to create a new folder and the layout for displaying folders and files.
Contains the fullscreen modal for viewing and managing files in a specific folder.
static/style.css:

Contains styles for the user interface, including folder layout, buttons, and the fullscreen modal.
Manages the design of the central "Upload" button and styling for the context menu.
static/functions.js:

Contains JavaScript functions to manage interactions with the interface:
Creating, renaming, and deleting folders.
Opening the modal and displaying files in a folder.
Uploading files and dynamically updating the file list.
Alt+C keyboard shortcut to trigger the upload button in the modal.
Displays files as clickable links that open files in a new browser tab.
Starting the Project
Run the Flask server:
bash

python app.py
Open your browser and go to http://127.0.0.1:5000/.

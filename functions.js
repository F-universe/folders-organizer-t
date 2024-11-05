let selectedFolder = null;

// Function to create a new folder
function createFolder() {
    const newFolder = document.createElement("div");
    newFolder.className = "folder";
    newFolder.innerText = "New Folder";

    // Right-click event for context menu
    newFolder.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selectedFolder = newFolder;
        showContextMenu(e);
    });

    // Double-click event to open the folder
    newFolder.addEventListener("dblclick", () => openFolder(newFolder.innerText));

    const container = document.getElementById("foldersContainer");
    container.appendChild(newFolder);
}

// Function to show the context menu
function showContextMenu(event) {
    const contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
}

// Function to hide the context menu
function hideContextMenu() {
    const contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "none";
}

// Function to rename the selected folder and update in backend
function renameFolder() {
    if (selectedFolder) {
        const oldName = selectedFolder.innerText;
        const newName = prompt("Enter new folder name:", oldName);
        
        if (newName && newName !== oldName) {
            fetch('/rename-folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ old_name: oldName, new_name: newName })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    selectedFolder.innerText = newName;
                } else {
                    alert(data.error);
                }
            });
        }
    }
    hideContextMenu();
}

// Function to delete the selected folder
function deleteFolder() {
    if (selectedFolder) {
        selectedFolder.remove();
    }
    hideContextMenu();
}

// Function to open a folder and display its contents
function openFolder(folderName) {
    document.getElementById("folderName").innerText = folderName;
    document.getElementById("folderModal").style.display = "flex";

    fetch(`/list-files/${folderName}`)
    .then(response => response.json())
    .then(data => {
        if (data.files) {
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = "";
            data.files.forEach(file => {
                const fileItem = document.createElement("div");
                
                // Create a link for each file to open it
                const fileLink = document.createElement("a");
                fileLink.href = `/files/${folderName}/${file}`;
                fileLink.target = "_blank";
                fileLink.innerText = file;
                
                fileItem.appendChild(fileLink);
                fileList.appendChild(fileItem);
            });
        }
    });
}

// Function to close the folder modal
function closeFolder() {
    document.getElementById("folderModal").style.display = "none";
    document.getElementById("fileList").innerHTML = ""; // Clear file list
}

// Function to upload files
function uploadFile() {
    document.getElementById("fileInput").click();
}

// Function to handle file input and upload to the server
function addFiles(event) {
    const folderName = document.getElementById("folderName").innerText;
    const files = event.target.files;

    for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);

        fetch(`/upload/${folderName}`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const fileList = document.getElementById("fileList");
                const fileItem = document.createElement("div");
                
                const fileLink = document.createElement("a");
                fileLink.href = `/files/${folderName}/${file.name}`;
                fileLink.target = "_blank";
                fileLink.innerText = file.name;

                fileItem.appendChild(fileLink);
                fileList.appendChild(fileItem);
            } else {
                alert("Error uploading file: " + data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

// Shortcuts
window.addEventListener("keydown", (event) => {
    if (event.altKey && event.key === "c") {
        document.getElementById("uploadButton").click();
    }
});

window.addEventListener("click", () => {
    hideContextMenu();
});

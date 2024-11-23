document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tab-form");
    const container = document.getElementById("tab-container");
    const saveButton = document.getElementById("save-files");

    // Add new tab
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const categories = document.getElementById("categories").value.trim();
        const url = document.getElementById("url").value.trim();

        if (!name || !categories || !url) {
            alert("All fields are required!");
            return;
        }

        const newTab = createCard(name, categories, url);
        container.appendChild(newTab);
        form.reset();
    });

    // Save the resulting page
    saveButton.addEventListener("click", () => {
        const tabsHTML = Array.from(container.children)
            .map(tab => {
                const clone = tab.cloneNode(true);
                const deleteButton = clone.querySelector(".delete-tab");
                if (deleteButton) {
                    deleteButton.remove(); // Remove delete buttons for saved file
                }
                return clone.outerHTML;
            })
            .join("\n");

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tab Overview</title>
    <link rel="stylesheet" href="styles.css">
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const tabs = document.querySelectorAll(".tab");
            tabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    const url = tab.dataset.url;
                    window.open(url, "_blank");
                });
            });
        });
    </script>
</head>
<body>
    <main>
        <div id="tab-container">
            ${tabsHTML}
        </div>
    </main>
</body>
</html>
        `;

        downloadFile("index.html", htmlContent);
    });

    function createCard(name, categories, url) {
        const newTab = document.createElement("div");
        newTab.classList.add("tab");
        newTab.dataset.url = url;

        newTab.innerHTML = `
            <iframe src="${url}" class="tab-iframe"></iframe>
            <div class="tab-details">
                <button class="delete-tab">X</button>
                <h3>${name}</h3>
                <p>Category: ${categories}</p>
            </div>
        `;

        // Open URL in a new tab on card click
        newTab.addEventListener("click", (event) => {
            if (!event.target.classList.contains("delete-tab")) {
                window.open(url, "_blank");
            }
        });

        // Stop propagation and delete tab on delete button click
        const deleteButton = newTab.querySelector(".delete-tab");
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            newTab.remove();
        });

        return newTab;
    }

    function downloadFile(filename, content) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([content], { type: "text/html" }));
        a.download = filename;
        a.click();
    }
});

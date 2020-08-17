async function loadingChange() {
    if (document.readyState == "complete") {
        await loadHeader();
        loadFooter();
    }
}

// document.onreadystatechange = loadingChange;

window.onload = loadingChange;
function loadingChange() {
    if (document.readyState == "complete") {
        loadHeader();
        loadFooter();
    }
}

// document.onreadystatechange = loadingChange;

window.onload = loadingChange;
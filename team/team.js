async function loadingChange() {
    await waitInitial;
    fixScreenWidth();
    await loadHeader();
    loadFooter();
}

// document.onreadystatechange = loadingChange;

window.onload = loadingChange;
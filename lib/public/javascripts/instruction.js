/**
 *  The animation for the collapsible elements using the class collapsible.
 *      https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible_symbol
 */
let collapsibles = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}


/**
 *  Copy the content of a pre on a click and displays a toolTip
 *      https://atomiks.github.io/tippyjs/
 *      https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
 */
let pres = document.getElementsByTagName('pre');
for (let i = 0; i < pres.length; i++) {
    let pre = pres[i];
    pre.addEventListener("click", function () {
        var tooltipMsg = "Copié avec succès";
        navigator.clipboard.writeText(pre.textContent).then(function () {
            /* clipboard successfully set */
        }, function () {
            /* clipboard write failed */
        });
        const instance = pre._tippy;
        instance.setContent(tooltipMsg);
        instance.show(1000)
    });
    pre.addEventListener("mouseleave", function () {
        const instance = pre._tippy;
        instance.setContent('Cliquez pour copier')
    });
}

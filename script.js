window.onload = function () {
    loaduser();
    var elem = "";

    async function loaduser() {
        const res = await fetch("https://flagcdn.com/es/codes.json");
        const banderas = await res.json();
        cargabanderas(banderas);
    }

    function cargabanderas(banderas) {
        var arr = Object.entries(banderas);
        let cont = 1;
        let total = document.querySelector(".origen").children.length;
        while (cont <= 8) {
            let num = Math.floor(Math.random() * (arr.length - 0 + 1) + (0));
            let codigo = arr[num][0];
            let nombre = arr[num][1];
            let foto = document.getElementById(`fot${cont}`);
            foto.src = `https://flagcdn.com/${codigo}.svg`
            foto.alt = nombre;
            cont++;
            do {
                num = Math.floor(Math.random() * (7 - 0 + 1) + (0));
            } while (document.querySelector(".destino").children[num].children.length == 1);

            document.querySelector(".destino").children[num].innerHTML = `<span>${nombre}<span>`;

        }


    }



    let origen = document.querySelector(".origen");
    let destino = document.querySelector(".destino");
    document.querySelector("button").addEventListener("click", comprobar);
    document.querySelector(".reinicia").addEventListener("click", reini);

    for (const foto of origen.children) {
        foto.addEventListener("touchstart", guarda);
        foto.addEventListener("dragstart", dragstart);
        foto.addEventListener("dragend", dragend);

    }

    for (const caja of destino.children) {
        caja.addEventListener("touchstart", guarda);
        caja.addEventListener("dragover", dragover);
        caja.addEventListener("dragleave", dragleave);
        caja.addEventListener("drop", drop);
        caja.addEventListener("dragenter", dragenter);
    }


    function dragstart(e) {
        for (const caja of destino.children) {
            if (caja.children.length == 1) {
                caja.addEventListener("dragover", dragover);
                caja.addEventListener("dragleave", dragleave);
                caja.addEventListener("drop", drop);
                caja.addEventListener("dragenter", dragenter);
            }
        }

        this.classList.add("gris");
        e.dataTransfer.setData("text/plain", this.id);

    }
    function guarda(e) {
        if (elem != "" && e.target.id.includes("desti")) {
            elem.classList.remove("gris");
            e.target.appendChild(elem.parentElement);

            elem = "";
        } else {
            if (e.target.id.includes("fot"))
                if (elem.classList == "gris") {
                    elem.classList.remove("gris");
                }
            e.target.classList.add("gris");
            elem = e.target;
        }
    }

    function dragenter(e) {
        this.classList.add("bordedot");

    }
    function dragend(e) {
        this.classList.remove("gris");

    }
    function dragover(e) {
        e.preventDefault();

    }
    function dragleave(e) {
        this.classList.remove("bordedot");

    }

    function drop(e) {



        this.classList.remove("bordedot");
        console.log("Drop");

        let x = document.getElementById(e.dataTransfer.getData("text/plain"));
        let z = e.target;

        if (z.tagName == "IMG") {
            z.parentElement.parentElement.appendChild(x);
        }
        else {
            z.appendChild(x);
            this.removeEventListener("dragover", dragover);
            this.removeEventListener("dragenter", dragenter);
        }



    }

    function comprobar() {

        for (const comp of destino.children) {
            if (comp.children.length == 2) {

                if ((comp.children[0].textContent).toUpperCase() == (comp.children[1].firstElementChild.alt).toUpperCase()) {
                    comp.style.border = "solid green 4px";
                    console.log("yeepa");
                }
                else {
                    comp.children[0].textContent = comp.children[1].firstElementChild.alt.toUpperCase();
                    comp.children[0].style.zIndex = 4;
                    comp.style.border = "solid red 4px";
                }
            }

        }
        this.disabled = "true";


    }

    function reini() {
        window.location.reload();
    }
}




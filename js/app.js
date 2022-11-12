const params = new URLSearchParams(window.location.search);

let username = "";

if (params.has('username') == true) {
    username = params.get('username');
    // Almacenar el nuevo username en el local storage
    localStorage.desafiosUsername = username
}
else {
    // Leer el último valor de true almacenado en memoria
    username = localStorage.desafiosUsername? localStorage.desafiosUsername : ""
}

if(username == "") {
    alert("NOT LOGIN");
}

const divUsername = document.querySelector('#username');
divUsername.textContent = `¡Hola ${username}!`

// Quitar los parametros de la URL
window.history.pushState({}, document.title, window.location.pathname);


function validateFile(fileData) {
    try {
    if(fileData != "") {
        row1 = fileData.split("\n")[0];
        codeNumber = Number(row1.split(":")[1]);
        return codeNumber;
    }
    } catch (error) {
        console.log(error);
    }
    return -1;
}

// Boton enviar
document.querySelector("#enviar").onclick = async () => {

    challengeNumber = validateFile(fileData);
    if(challengeNumber < 0 || !challengeNumber) {
        alert("Error, archivo ingresado inválido");
        return;
    }

    const url = `${domain}/api/python/challenge/${challengeNumber}`
    challengeTestHide();
    //console.log(fileData);
    const data = {
        username: username,
        code: fileData,
    }
    let jsonData = null;
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(resp.ok) {
            jsonData = await resp.json()
        } else {
            alert("No pudo completarse la solicitud");
        }
    } catch (error) {
        console.log(error);
        alert("No se pudo conectar con el sistema de desafios");
    }

    try {
        if(jsonData != null) {
            challengeTest(jsonData);
            challengeTestShow();
            clearUploadedFiles();
        }
    } catch (error) {
        console.log(error);
        alert("Error al cargar los datos del test");
    }
}



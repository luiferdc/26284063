const params = new URLSearchParams(window.location.search);
const idioma = params.get('idioma');

let url_idioma = "../conf/config" + idioma + ".json";

// cargando configuracion
fetch(url_idioma)
    .then(response => {
        if(!response.ok){
            throw new Error("No se pudo cargar la configuración");
        }
        return response.json();
    })
    .then(config => {
        document.getElementById('ati').textContent = config.config.sitio[0];
        document.getElementById('ucv').textContent = config.config.sitio[1];
        document.getElementById('periodo').textContent = config.config.sitio[2];
        
        document.getElementById('saludo').textContent = config.config.saludo + ", Luis Fernando...";
        document.getElementById('botonBuscar').textContent = config.config.buscar;
        document.getElementById('footer').textContent = config.config.copyRight;
        
    })
    .catch(error => {
        console.error("Error al cargar la configuración: ", error);
    })

//cargando listado de estudiantes
fetch("../datos/index.json")
    .then(response => {
        if(!response.ok){
            throw new Error("No se pudo cargar el listados de los estudiantes");
        }
        return response.json();
    })

    .then(datos => {
        const lista = document.getElementById('lista-estudiantes');
        datos.perfiles.forEach(perfil => {
            const li = document.createElement('li');
            const foto = document.createElement('img');
            const nombre = document.createElement('p');
            li.className = 'card';

            nombre.textContent = perfil.nombre;
            foto.src="../datos/"+perfil.imagen;

            li.appendChild(foto);
            li.appendChild(nombre);
            lista.appendChild(li);
        })
    })


/*
const lista = document.getElementById('lista-estudiantes');

perfiles.forEach(perfil => {
    const li = document.createElement('li');
    const foto = document.createElement('img');
    const nombre = document.createElement('p');
    li.className = 'card';

    nombre.textContent = perfil.nombre
    foto.src="../datos/"+perfil.imagen;

    li.appendChild(foto);
    li.append(nombre);
    lista.appendChild(li);
})
*/
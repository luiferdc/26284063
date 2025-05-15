const params = new URLSearchParams(window.location.search);
const idioma = params.get('idioma');

let url_idioma = "../conf/config" + idioma + ".json";
let mensaje_busqueda_vacia = "";

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
        mensaje_busqueda_vacia = config.config.busqueda_vacia;
    })
    .catch(error => {
        console.error("Error al cargar la configuración: ", error);
    });

//cargando listado de estudiantes
const lista = document.getElementById('lista-estudiantes');
fetch("../datos/index.json")
    .then(response => {
        if(!response.ok){
            throw new Error("No se pudo cargar el listados de los estudiantes");
        }
        return response.json();
    })

    .then(datos => {
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
    });

const inputBusqueda = document.getElementById('busqueda');
let estudiantes = [];

fetch('../datos/index.json')
    .then(response => response.json())
    .then(data =>{
        estudiantes = data.perfiles;
    })
    .catch(error =>{
        console.error('No se pudo cargar el json que contiene la lista de estudiantes', error);
    });

//funcion para mostrar estudiantes en la lista
function mostrarEstudiantes(filtrados, texto){

    if(filtrados.length === 0){
        lista.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = mensaje_busqueda_vacia + texto;
        li.style = 'color: #3c78d8';
        lista.appendChild(li);
    }else{
        lista.innerHTML = '';
        filtrados.forEach(est =>{
        const li = document.createElement('li');
        const foto = document.createElement('img');
        const nombre = document.createElement('p');
        li.className = 'card';

        nombre.textContent = est.nombre;
        foto.src = "../datos/" + est.imagen

        li.appendChild(foto);
        li.appendChild(nombre);
        lista.appendChild(li);

    }) 
    }
    
}

//escuchar cambios en el campo busqueda
inputBusqueda.addEventListener('input',() =>{

    const texto = inputBusqueda.value.toLowerCase();
    const filtrados = estudiantes.filter(est =>
        est.nombre.toLowerCase().includes(texto)
    );
    
    mostrarEstudiantes(filtrados,texto);
})
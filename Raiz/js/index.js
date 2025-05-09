import {config} from '../conf/configES.js';
import {perfiles} from '../datos/index.js'

document.getElementById('ati').textContent = config.sitio[0];
document.getElementById('ucv').textContent = config.sitio[1];
document.getElementById('periodo').textContent = config.sitio[2];
document.getElementById('saludo').textContent = config.saludo + ", Luis Fernando...";
document.getElementById('botonBuscar').textContent = config.buscar;
document.getElementById('footer').textContent = config.copyRight;

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
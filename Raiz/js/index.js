import {config} from '../conf/configES.js';

document.getElementById('ati').textContent = config.sitio[0];
document.getElementById('ucv').textContent = config.sitio[1];
document.getElementById('periodo').textContent = config.sitio[2];
document.getElementById('saludo').textContent = config.saludo + ", Luis Fernando...";
document.getElementById('botonBuscar').textContent = config.buscar;
document.getElementById('footer').textContent = config.copyRight;
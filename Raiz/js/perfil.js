const params = new URLSearchParams(window.location.search);
const perfilCi = params.get("ci");
const idioma = params.get('idioma');

let ruta_foto = "";
let url_idioma = "../conf/config" + idioma + ".json";



//Configurando el perfil.html
fetch(url_idioma)
    .then(response => response.json())
    .then(config => {
        document.getElementById('color').textContent = config.config.color;
        document.getElementById('libro').textContent = config.config.libro;
        document.getElementById('musica').textContent = config.config.musica;
        document.getElementById('videojuego').textContent = config.config.video_juego;
        document.getElementById('lenguajes').textContent = config.config.lenguajes;
        document.getElementById('email').textContent = config.config.email;
        console.log(this);
    })
    .catch(error => {
        console.error('no se pudo configurar el idioma de la pagina',error);
        document.body.innerHTML = "<h2>No se pudo configurar el idioma de la pagina, el parametro debe ser EN, ES o PT</h2>"
    })



// Cargando la informacion del perfil del estudiante    
// cargando ruta de foto
fetch("../datos/index.json")
    .then(response => response.json())
    .then(config => {
       const perfil = config.perfiles.find(p => p.ci===perfilCi)
       ruta_foto = perfil.imagen;
       //console.log(ruta_foto);
    })

if(perfilCi){
    const url = "../datos/"+perfilCi+"/perfil.json";
    
    fetch(url)
        .then(response => response.json())
        .then(perfil =>{
            document.getElementById('nombre').textContent = perfil.perfil.nombre;
            document.getElementById('foto').src = "../datos/" + ruta_foto;
            document.getElementById('descripcion').textContent = perfil.perfil.descripcion;
            document.getElementById('color_v').textContent = perfil.perfil.color;
            document.getElementById('libro_v').textContent = perfil.perfil.libro;
            document.getElementById('musica_v').textContent = perfil.perfil.musica;
            document.getElementById('videojuego_v').textContent = perfil.perfil.video_juego;
            document.getElementById('lenguajes_v').textContent = perfil.perfil.lenguajes;
            document.getElementById('email_v').textContent = perfil.perfil.email;
        })
        .catch(error => {
            console.error("Error al cargar el perfil:",error);
            document.body.innerHTML = "<h2>Error al cargar el perfil, la cedula introducida no se encuentra en los datos</h2>"
        })
     

}else{
    document.body.innerHTML = "<h2>No se especifico ninguna cedula como parametro en el URL</h2>"
}
const formBusqueda = document.querySelector('#form__busqueda');
const CajaBusqueda = document.querySelector('.caja__busqueda');
const resultadoBusqueda = document.querySelector('#resultado__busqueda');
const mostraMás = document.querySelector('#Mostrar__mas');

let keyword = "";  // Variable que almacena la palabara a buscar 
let page = 1; // Número de páginas de la busqueda 
const accessKey = "AstKSAvRgKBGfhxYEueISrZ0SRWogKu7_4XRRCgUr9U";

// Función que mostrará las imagenes relacionadas con la plabra de la busqueda

async function BuscarImages(){
    keyword = CajaBusqueda.value; 

    const url = `https://api.unsplash.com/search/photos?page=${page}=&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Realiza la busqueda 
    const  response = await fetch(url);
    const data = await response.json();

    // console.log(data); 

    if (page ===1){
        resultadoBusqueda.innerHTML = "";
    }

    const resultados = data.results;

    resultados.map((result) => {
        const imagen = document.createElement("img");
        imagen.src = result.urls.small;
        const imagenLink = document.createElement("a");
        imagenLink.href = result.links.html;
        imagenLink.target = "_blank";

        imagenLink.appendChild(imagen);

        resultadoBusqueda.appendChild(imagenLink);
    });

    mostraMás.style.display = "block";

} 

// Agregamos la funcionalidad para cuandop se presione enter o se haga click en el boton buscar 

formBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;

    //Llamamos la función 
    BuscarImages();
});

mostraMás.addEventListener("click", () => {
    page++;
    BuscarImages();
})
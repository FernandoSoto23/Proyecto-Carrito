//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarritos = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarritoBtn.addEventListener("click",(e)=>{
        articulosCarritos = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Eliminar un curos del carito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        articulosCarritos = articulosCarritos.filter((curso)=>curso.id !== cursoId);
    } 
    console.log(articulosCarritos);
    carritoHTML();
}
function leerDatosCurso(curso){
    //crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('p span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemmento ya existe en el carrito
    const existe = articulosCarritos.some((curso)=> curso.id === infoCurso.id);
    
    if(existe){
        const cursos = articulosCarritos.map((curso)=>{
            if(curso.id === infoCurso.id){
                curso.cantidad += 1;
                return curso;
            }else{
                return curso;
            }
        });
       articulosCarritos = [...cursos]; 
    }else{
        //Agrega elementos al arreglo de carritos
         articulosCarritos = [...articulosCarritos,infoCurso];
    }
    
    

/* 
    console.log(articulosCarritos); */
    carritoHTML();
}

//Muestra el carrito de compras en el Html

function carritoHTML(){
    //Limpiar el html
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarritos.forEach((curso)=>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${imagen}" width="100"/></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>

        `; 
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row); 
    });
}

//Elimina los cursos del tbody

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


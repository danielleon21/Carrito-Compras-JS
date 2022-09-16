// Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // agregar al carrito
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // vaciar carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // elimina del arreglo por el data id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    //Refrescar carrito
    carritoHTML();
  }
}

function leerDatosCurso(curso) {
  //console.log(curso);

  //Objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Comprobar si el curso ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objecto actualizado
      } else {
        return curso; //Retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //Arregla elementos al arreglo de carritos
  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras
function carritoHTML() {
  // Limpiar HTML
  limpiarHTML();
  // Recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src='${imagen}' width="100"/>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
    `;
    // Agrega el html del carrito al tbody
    contenedorCarrito.appendChild(row);
  });
}

// eliminar cursos del tbody

function limpiarHTML() {
  // forma lenta
  //   contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

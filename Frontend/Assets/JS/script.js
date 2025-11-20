const dataSection = document.getElementById("Mostrando")
const dataSectionBuying = document.getElementById("carro")

// Mostrar los datos sin filtros
async function renderData() {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/producto')
    FullData = await response.json()
    
    console.log(FullData)
    let template = "";
    i=2  // Inicializa en valor de 3 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la cuarta tarjeta
    limite_caracter = 26;
    FullData.forEach((Data) => {
    i+=1
    if (i==3){
        template += `<div class = "row ms-5">`
        i = 0
    }
    if (Data.nom_p.length > limite_caracter) {
        nombre_producto = Data.nom_p.substring(0, limite_caracter) + "...";
    }
    else{
        nombre_producto = Data.nom_p
    }
    template += `
        <div class="col-lg-3 ms-5 me-5 mt-3 d-flex">
            <div class="card h-100 tarjetas">
                <div class="container-fluid text-center h-50">
                    <img src=${Data.imagen_url} class="card-img-top" style="padding:20px">
                </div>
                <div class="card-body h-50">  
                    <div class="row">
                        <h2 class="card-title">${nombre_producto}</h2>
                    </div>
                    <div class="row">
                        <h4 class="card-text">${Data.tipo}</h4>
                    </div>
                
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>$${Data.precio}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5">
                            <p>${Data.stock}</p>
                        </div>
                        <div class="col-sm-7">
                            <button type="button" class="btn btn-secondary  ingreso_carro" onclick='ingresar_carro("${Data.nom_p}")'>Pedir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    if (i==2){
        template+=`</div>`
    } // Actualmente esta configurado para que haga un listado de 4 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
    })
    dataSection.innerHTML = template;
}




// Formato de la variable filtros: 
// filtros = [{
// "nombre"
// "precio" 
// "mayor_o_menor"
// }], si en la variable se agrega un -1, el programa lo ignorara como atributo para filtrar. La unica excepcion a la regla es en los atributos relacionados al precio

async function renderDataWithFilters(filtros, tipos) {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/producto')
    FullData = await response.json()
    
    console.log(FullData)
    console.log(tipos)
    let template = "";
    i=2  // Inicializa en valor de 3 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la cuarta tarjeta
    limite_caracter = 26;
    
    FullData.forEach((Data) => {
    if ((tipos.includes(Data.tipo) || tipos[0] == -1) && (Data.nom_p.includes(filtros[0]) || filtros[0] == -1) && ( (Data.precio > filtros[1] && filtros[2] == "mayor") || (Data.precio < filtros[1] && filtros[2] == "menor") ) ){
        i+=1
        if (i==3){
            template += `<div class = "row ms-5">`
            i = 0
        }
        if (Data.nom_p.length > limite_caracter) {
            nombre_producto = Data.nom_p.substring(0, limite_caracter) + "...";
        }
        else{
            nombre_producto = Data.nom_p
        }
        template += `
        <div class="col-lg-3 ms-5 me-5 mt-3">
            <div class="card tarjetas">
                <img src=${Data.imagen_url} class="card-img-top" style="padding:20px">
                <div class="card-body">  
                
                    <div class="row">
                        <h2 class="card-title">${nombre_producto}</h2>
                    </div>
                    <div class="row">
                        <h4 class="card-text">${Data.tipo}</h4>
                    </div>
                
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>$${Data.precio}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5">
                            <p>${Data.stock}</p>
                        </div>
                        <div class="col-sm-7">
                            <button type="button" class="btn btn-secondary" onclick='ingresar_carro("${Data.nom_p}")'>Pedir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
        if (i==2){
            template+=`</div>`
        } // Actualmente esta configurado para que haga un listado de 4 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
    }})
    dataSection.innerHTML = template;
}


function filters(){
    tipos= []
    filtros = []
    
    filtro1 = document.querySelectorAll('#tipos input[type="checkbox"]:checked').forEach(selected => tipos.push(selected.value));  
    filtro2 = document.getElementById("name").value
    filtro3 = document.getElementById("price").value
    filtro4 = document.querySelectorAll('#signo input[type="radio"]');
    
    if (tipos.length == 0){
        tipos.push(-1)
    }

    if (filtro2.trim() != ""){ // El .trim es para evitar que el usuario pueda entregar un espacio vacio como filtro por nombre
        filtros.push(filtro2)
    }
    else{
        filtros.push(-1)
    }

    if (filtro3 > 0){
        filtros.push(filtro3)
        filtros.push(filtro4) 
    }
    else{
        filtros.push(0)
        filtros.push("mayor")
    } 
    // Esto es para evitar el caso en el que el usuario coloca como precio 0 o un numero negativo, y al mismo tiempo un inferior que, llevando a un caso en el que no mostrara ningun producto debido a que ningun producto tendra un precio inferior a 0 o negativo
    // Logica del filtro de precio: "Si el valor del producto es superior/inferior al valor indicado en el filtro, mostrar el producto"
    console.log(filtros)    
    renderDataWithFilters(filtros, tipos)
}

async function ingresar_carro(producto){ // Parametros: producto = Valor que se ingresara al listado de carro
    const carro = JSON.parse(localStorage.getItem("carro")) || [] // Esta linea permite cargar el carro actual, para evitar sobreescribir sobre la existente
    if (carro.find(carro => carro.id == producto.id) == false){ // Si el producto no se ha agregado anteriormente, agregar al listado del carro. 
        carro.push({id: producto.id, nombre: producto.nom_p, cantidad: 1}) 
    } else { // Si el producto ya existe, identificar su ubicacion en la lista y modificar el numero que representa la cantidad a pedir
        i = 0
        carro.foreach((prod) => {
            if (prod.id == producto.id){
                carro[i+1] = carro[i+1]+1
            }
            i+=1
        })
        alert("Se ha agregado su producto en el carro")
    }
    localStorage.setItem("carro", JSON.stringify(carritoActual))  // Esta linea permite guardar el nuevo carro en un JSON temporal que se almacena localmente. Es para evitar perder los datos al momento de cargar una diferente pagina.
}

async function mostrar_carro(){ // El parametro se obtiene de una variable que se actualiza en la funcion ingresar_carro()
    dataSectionBuying.innerHTML = ""    
    console.log()
    let template = "";
    i=2  // Inicializa en valor de 2 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la tercera tarjeta
    // const carro = JSON.parse(localStorage.getItem("carro")) || []
    carro.forEach((Data) => {
        i+=1
        if (i==3){
            template += `<div class = "row ms-5">`
            i = 0
        }
        template += `
            <div class="col-sm-5 ms-5 me-5 mt-3 ">
                <div class="card">
                    <div class="row">
                        <div class="col">
                            <img src=${Data.covers.card} width="200px">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title">${Data.title}</h5>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <p class="card-text"> <i class="bi bi-heart-fill"></i> ${Data.favourite_count}  |  <i class="bi bi-play"></i>  ${Data.play_count}   |  ${Data.status}</p>
                    </div>
                </div>
            </div>
        `
        // !!!! El formato/template aun no se ha modificado, asi que no tiene sentido las variables y la forma en que se muestran los datos en las tarjetas

        if (i==2){
            template+=`</div>`
        } // Actualmente esta configurado para que haga un listado de 3 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
        })
    dataSectionBuying.innerHTML = template;
}

async function verificacion_pedido(){
    const carro = JSON.parse(localStorage.getItem("carro")) || []
    const rut = document.getElementById('rut').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    
    existe = 0
    const db = await fetch('/api/cliente')
    db.forEach(user => {
        if (user.rut == rut && user.nombre == nombre && user.apellido == apellido){
            existe = 1
        }        
    });
    if (existe == 1){
        carro.forEach(pedido => {
            
        });
    }
    else{
        alert("No se han encontrado coincidencias")
    }
}

// Hay que verificar si funciona esto. Es para ejecutar alguna funcion al ingresar a la pagina indicada
const page = window.location.pathname
console.log(page) 

if (page === "/catalogo.html") {
    renderData()    
} else if (page === "/pedido.html") {
    mostrarcarro()
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const rut = document.getElementById('rut').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
    
        await fetch('/api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rut, nombre, apellido })
        });
    
        form.reset();
        cargarMonedas(); // refrescar la lista
      });
} else if (page === "/index.html"){
    renderData()
}



const dataSection = document.getElementById("Mostrando")

// Mostrar los datos sin filtros. Activado al ingresar al catalogo
async function renderData() {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/producto')
    FullData = await response.json()
    
    console.log(FullData)
    let template = "";
    i=2  // Inicializa en valor de 2 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la tercera tarjeta
    limite_caracter = 26;
    FullData.forEach((Data) => {
    i+=1
    if (i==3){
        template += `<div class = "row ms-2">`
        i = 0
    }
    if (Data.nom_p.length > limite_caracter) {
        nombre_producto = Data.nom_p.substring(0, limite_caracter) + "...";
    }
    else{
        nombre_producto = Data.nom_p
    }
    template += `
        <div class="col-sm-3 ms-4 me-4 mt-4">
            <article class="card">
                <img src="${Data.imagen_url}" class="card-img-top" style="padding:20px">
                <header class="card-body">
                    <div class="row">
                        <h2 class="card-title">${nombre_producto}</h2>
                    </div>
                </header>
                <section class="card-body">
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
                            <p>${Data.stock} restantes</p>
                        </div>
                        <div class="col-sm-7">
                            <button type="button" class="btn btn-secondary  ingreso_carro" onclick='ingresar_carro(${JSON.stringify(Data)})'>Pedir</button>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    `
    if (i==2){
        template+=`</div>`
    } // Actualmente esta configurado para que haga un listado de 3 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
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
    i=2  // Inicializa en valor de 2 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la tercera tarjeta
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
        <div class="col-sm-5 ms-5 me-5 mt-3">
            <article class="card">
                <img src="${Data.imagen_url}" class="card-img-top" style="padding:20px">
                <header class="card-body">
                    <div class="col-sm-6">

                        <div class="row">
                            <h2 class="card-title">${Data.nom_p}</h2>
                        </div>
                        <div class="row">
                            <h4 class="card-text">${Data.tipo}</h4>
                        </div>
                </header>
                <section class="card-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <h5>${Data.precio}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5">
                            <p>${Data.stock} restantes</p>
                        </div>
                        <div class="col-sm-7">
                            <button type="button" class="btn btn-secondary" onclick='ingresar_carro(${JSON.stringify(Data)}); console.log(${JSON.stringify(Data)})'>Pedir</button>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    `
        if (i==2){
            template+=`</div>`
        } // Actualmente esta configurado para que haga un listado de 3 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
    }})
    dataSection.innerHTML = template;
}

async function renderDataTop() {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/producto')
    FullData = await response.json()
    response2 = await fetch('/api/venta')
    FullData2 = await response2.json()
    

    console.log(FullData)
    console.log(FullData2)
    let template = "";
    i=2  // Inicializa en valor de 2 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la tercera tarjeta
    limite_caracter = 26;
    
    FullData2.some((p) => {
        FullData.some((Data) => {
            if (Data.codigo_p == p.codigo_p){
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
                    <div class="col-sm-2 ms-5 me-5 mt-3">
                        <article class="card">
                            <img src="${Data.imagen_url}" class="card-img-top" style="padding:20px">
                            <header class="card-body">
                                <div class="col">

                                    <div class="row">
                                        <h2 class="card-title">${Data.nom_p}</h2>
                                    </div>
                            </header>
                            <section class="card-body">
                                    <div class="row">
                                        <h4 class="card-text">${Data.tipo}</h4>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-8">
                                            <h5>$${Data.precio}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <p>${Data.stock} restantes</p>
                                    </div>
                                    <footer class="col-sm-7">
                                        <button type="button" class="btn btn-secondary" onclick='ingresar_carro(${JSON.stringify(Data)})'>Pedir</button>
                                    </footer>
                                </div>
                            </section>
                        </article>
                    </div>
                    `
                    if (i==2){
                        template+=`</div>`
                    } // Actualmente esta configurado para que haga un listado de 3 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
                return true
            }
            return false
        })
        if (i==2){
            return true
        }
    })

    

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
    const carro = JSON.parse(localStorage.getItem("carro")) || [];

    // Verificacion de existencia del producto
    const productoExistente = carro.find(carro => carro.id == producto.codigo_p);

    // Si el producto no existe, lo agregamos al carro
    if (!productoExistente) { 
        carro.push({id: producto.codigo_p, nombre: producto.nom_p, cantidad: 1});
    } else {  // Si el producto ya existe, aumentamos la cantidad 
        productoExistente.cantidad += 1;
    }
    localStorage.setItem("carro", JSON.stringify(carro));
    console.log(carro)
    const page = window.location.pathname
    if (page == '/pedido.html'){
        mostrar_carro()
    }
}

async function eliminar_carro(producto){
    const carro = JSON.parse(localStorage.getItem("carro")) || [];
    const index = carro.findIndex(c=>c.id == producto.codigo_p)
    if (carro[index].cantidad == 1){
        carro.splice(index,1)
    } else {
        carro[index].cantidad -=1
    }
    localStorage.setItem("carro", JSON.stringify(carro))
    mostrar_carro()
}

async function mostrar_carro(){
    dataSection.innerHTML = ""    
    console.log()
    let template = "";
    response = await fetch('/api/producto')
    FullData = await response.json()
    i=2  // Inicializa en valor de 2 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la tercera tarjeta
    const carro = JSON.parse(localStorage.getItem("carro")) || []
    carro.forEach((c) => {
        FullData.forEach(Data => {
            if (Data.codigo_p == c.id) {
                i += 1
                if (i == 3) {
                    template += `<div class = "row ms-5">`
                    i = 0
                }
                template += `
                    <div class="col-sm-3 ms-5 me-5 mt-3">
                        <article class="card">
                            <img src="${Data.imagen_url}" class="card-img-top" style="padding:20px">
                            <header class="card-body">
                                <div class="col-sm-6">
                                    <div class="row">
                                        <h2 class="card-title">${Data.nom_p}</h2>
                                    </div>
                            </header>
                            <section class="card-body">
                                    <div class="row">
                                        <h4 class="card-text">${Data.tipo}</h4>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-8">
                                            <h5>$${Data.precio*c.cantidad} Precio total</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <p>${c.cantidad} en el carro</p>
                                    </div>
                        `
                        if (c.cantidad < Data.stock){  // Agregar boton de "añadir" unicamente cuando hay más existencias.
                            template+=`
                                    <footer class="col-sm-7">
                                        <button type="button" class="btn btn-secondary" onclick='eliminar_carro(${JSON.stringify(Data)})'>Eliminar</button>
                                        <button type="button" class="btn btn-secondary" onclick='ingresar_carro(${JSON.stringify(Data)})'>Agregar</button>
                                    </footer>
                                    `
                        }
                        else{
                            template+=`
                                    <footer class="col-sm-7">
                                        <button type="button" class="btn btn-secondary" onclick='eliminar_carro(${JSON.stringify(Data)})'>Eliminar</button>
                                    </footer>
                                    `                            
                        }
                        template+=`
                                </div>
                            </section>
                        </article>
                    </div>
                    `
                if (i == 2) {
                    template += `</div>`
                } // Actualmente esta configurado para que haga un listado de 3 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
            }
        })
    });
    dataSection.innerHTML = template;
}

// Mostrar boletas
async function renderTicket(){
    dataSection.innerHTML = ""    
    let template = "";
    response = await fetch('/api/vista')
    FullData = await response.json()
    template += `
        <table class="table table-striped table-hover table-bordered align-middle mt-3">
            <thead class="table-dark text-center">
                <tr>
                    <th>RUT</th>
                    <th>COMPRADOR</th>
                    <th>PRODUCTO</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO TOTAL</th>
                    <th>FECHA</th>
                </tr>
            </thead>
            <tbody>
    `;

    FullData.forEach(data => {
        fecha = new Date(data.fecha_compra).toLocaleDateString()
        template += `
            <tr>
                <td>${data.rut}</td>
                <td>${data.comprador}</td>
                <td>${data.nom_p}</td>
                <td class="text-center">${data.cantidad}</td>
                <td class="text-end">$${data.total}</td>
                <td>${fecha}</td>
            </tr>
        `;
    });

    template += `
            </tbody>
        </table>
    `;
    dataSection.innerHTML = template
}


// Ejecutar funciones especificas por ingreso de pagina.
const page = window.location.pathname
console.log(page) 

if (page == "/catalogo.html") {
    renderData()    
} else if (page == "/pedido.html") {
    mostrar_carro()
    const form = document.getElementById('datos_usuario')
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const rut = document.getElementById('rut').value
        const nombre = document.getElementById('user_name').value
        const apellido = document.getElementById('user_lastname').value
        const database = (await fetch('/api/cliente'))
        const db = await database.json()
        const carro = JSON.parse(localStorage.getItem("carro")) || [] // Esta linea permite cargar el carro actual, para evitar sobreescribir sobre la existente
        console.log(db)
        const cliente = db.find(user => user.rut == rut && user.nom_c == nombre && user.apell_c == apellido);
    
        if (!cliente){
            alert("Verificar datos de usuario")
            return
        }
        else{
            for (const pedido of carro) {
                const res = await fetch('/api/venta', {
                        method: 'POST',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({ 
                            cantidad: pedido.cantidad, 
                            rut: rut ,
                            codigo_p: pedido.id })
            })
            if (!res.ok) {
                const msg = await res.text();
                alert("Error en el pedido: " + msg);
                return;
            }
            alert("Se ha realizado su compra del articulo " + pedido.nombre)
            }
        }
    })
} else if (page == "/index.html"){
    renderDataTop()
} else if (page == "/facturas.html"){
    renderTicket()
}
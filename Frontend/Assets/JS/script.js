// Mostrar los datos sin filtros
async function renderData() {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/monedas')
    FullData = await response.json()
    
    console.log(FullData)
    let template = "";
    i=3  // Inicializa en valor de 3 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la cuarta tarjeta
    
    FullData.forEach((Data) => {
    i+=1
    if (i==4){
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

    if (i==3){
        template+=`</div>`
    } // Actualmente esta configurado para que haga un listado de 4 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
    })
    dataSection.innerHTML = template;
}




// Formato de la variable filtros: 
// filtros = [{
// "tipo_producto" 
// "nombre"
// "precio" 
// "mayor_o_menor"
// }], si en la variable se agrega un -1, el programa lo ignorara como atributo para filtrar. La unica excepcion a la regla es en los atributos relacionados al precio

async function renderDataWithFilters(filtros) {
    dataSection.innerHTML = ""
    // Esto pedira los datos al servidor del backend, y luego lo convertira en formato json
    response = await fetch('/api/monedas')
    FullData = await response.json()
    
    console.log(FullData)
    let template = "";
    i=3  // Inicializa en valor de 3 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la cuarta tarjeta
    
    FullData.forEach((Data) => {
    if ((Data.tipo == filtros[0] || filtros[0] == -1) && (Data.nombre.includes(filtros[1]) || filtros[1] == -1) && ( (Data.precio > filtros[2] && filtros[3] == "mayor") || (Data.precio < filtros[2] && filtros[3] == "menor") ) ){
        i+=1
        if (i==4){
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
        // !!!! El formato/template aun no se ha modificado, asi que no tienen sentido las variables y la forma en que se muestran los datos en las tarjetas

        if (i==3){
            template+=`</div>`
        } // Actualmente esta configurado para que haga un listado de 4 columnas -> 1 fila, este "if" permite cerrar con un </div> para el <div class=row> en el lugar correcto
    }})
    dataSection.innerHTML = template;
}


function filters(){
    // !!!! Tal vez sea posible optimizarlo, aunque no estoy seguro de como se podria optimizar
    filtro1 = document.getElementById("tipo")  
    filtro2 = document.getElementById("nombre")
    filtro3 = document.getElementById("precio")
    filtro4 = document.getElementById("signo")

    filtros = []

    if (filtro1){ // !!!! ¿Tal vez podriamos crear una segunda lista para las categorias? (actualmente solo admite 1 categoria, lo que puede ser muy limitante para el usuario)
        filtros.push(filtro1.value)
    }
    else{
        filtros.push(-1)
    }

    if (filtro2.value.trim() != ""){ // El .trim es para evitar que el usuario pueda entregar un espacio vacio como filtro por nombre
        filtros.push(filtro2.value)
    }
    else{
        filtros.push(-1)
    }

    
    if (filtro3.value() > 0){
        filtros.push(filtro3.value)
        filtros.push(filtro4.value) 
    }
    else{
        filtros.push(0)
        filtros.push("mayor")
    } 
    // Esto es para evitar el caso en el que el usuario coloca como precio 0 o un numero negativo, y al mismo tiempo un inferior que, llevando a un caso en el que no mostrara ningun producto debido a que ningun producto tendra un precio inferior a 0 o negativo
    // Logica del filtro de precio: "Si el valor del producto es superior/inferior al valor indicado en el filtro, mostrar el producto"
    console.log(filtros)    
    renderDataWithFilters(filtros)
}


function guardarInformacionCategory() {
    
    $("#resultadoCategory").empty();
    let myData = { name: $("#nameCategory").val(), description: $("#descripcionCategory").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Category/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            limpiarCategory();
            traerInformacionCategory();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionCategory() {
    $.ajax({
        url: BASE_URL + '/api/Category/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaCategory(respuesta);

        }
    }
    );
}

function pintarRespuestaCategory(items) {

    $("#resultadoCategory").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Name</th><th>Description</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td><button onclick='borrarCategory(" + items[i].id + ")'>Borrar</button>";
        myTable += "<td><button onclick='actualizarCategory(" + items[i].id + ")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoCategory").append(myTable);
}

function borrarCategory(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Category/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionCategory();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarCategory(idElemento) {

    $("#resultado").empty();
    
    let myData = { id: idElemento, name: $("#nameCategory").val(), description: $("#descripcionCategory").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Category/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionCategory();
            limpiarCategory();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarCategory() {
    $("#nameCategory").val("");
    $("#descripcionCategory").val("");
}


function guardarInformacionMotorbike() {

    $("#resultadoMotorbike").empty();
    let myData = { brand: $("#brandMotorbike").val(), year: $("#year_bMotorbike").val(), description: $("#descriptionMotorbike").val(), name: $("#nameMotorbike").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Motorbike/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            limpiarMotorbike();
            traerInformacionMotorbike();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionMotorbike() {
    $.ajax({
        url: BASE_URL + '/api/Motorbike/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaMotorbike(respuesta);

        }
    }
    );
}

function pintarRespuestaMotorbike(items) {

    $("#resultadoMotorbike").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Brand</th><th>Year</th><th>Description</th><th>Name</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].year + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable+="<td><button onclick='borrarMotorbike("+items[i].id+")'>Borrar</button>";
        myTable+="<td><button onclick='actualizarMotorbike("+items[i].id+")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoMotorbike").append(myTable);

}


function borrarMotorbike(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Motorbike/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionMotorbike();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarMotorbike(idElemento) {

    $("#resultado").empty();
    
    let myData = { id: idElemento, brand: $("#brandMotorbike").val(), year: $("#year_bMotorbike").val(), description: $("#descriptionMotorbike").val(), name: $("#nameMotorbike").val()  }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Motorbike/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionMotorbike();
            limpiarMotorbike();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarMotorbike() {
    $("#brandMotorbike").val("");
    $("#year_bMotorbike").val("");
    $("#descriptionMotorbike").val("");
    $("#nameMotorbike").val("");
}

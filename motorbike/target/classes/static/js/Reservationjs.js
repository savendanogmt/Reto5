

function guardarInformacionReservation() {

    $("#resultadoReservation").empty();
    let myData = { startDate: $("#startDate").val(), devolutionDate: $("#devolutionDate").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Reservation/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionReservation();
            limpiarReservation();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionReservation() {
    $.ajax({
        url: BASE_URL + '/api/Reservation/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaReservation(respuesta);

        }
    }
    );
}

function pintarRespuestaReservation(items) {

    $("#resultadoReservation").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>startDate</th><th>devolutionDate</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idReservation + "</td>";
        myTable += "<td>" + items[i].startDate + "</td>";
        myTable += "<td>" + items[i].devolutionDate + "</td>";
        myTable+="<td><button onclick='borrarReservation("+items[i].idReservation+")'>Borrar</button>";
        myTable+="<td><button onclick='actualizarReservation("+items[i].idReservation+")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoReservation").append(myTable);

}

function borrarReservation(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Reservation/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionReservation();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarReservation(idElemento) {

    $("#resultado").empty();
    
    let myData = { idReservation: idElemento, startDate: $("#startDate").val(), devolutionDate: $("#devolutionDate").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Reservation/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionReservation();
            limpiarReservation();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarReservation() {
    $("#startDate").val("");
    $("#devolutionDate").val("");
}

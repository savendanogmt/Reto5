

function guardarInformacionMessage() {

    $("#resultadoMessage").empty();
    let myData = { messageText: $("#messageText").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Message/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            limpiarMessage();
            traerInformacionMessage();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionMessage() {
    $.ajax({
        url: BASE_URL + '/api/Message/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaMessage(respuesta);

        }
    }
    );
}

function pintarRespuestaMessage(items) {

    $("#resultadoMessage").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Message</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idMessage + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";

        myTable+="<td><button onclick='borrarMessage("+items[i].idMessage+")'>Borrar</button>";
        myTable+="<td><button onclick='actualizarMessage("+items[i].idMessage+")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoMessage").append(myTable);

}


function borrarMessage(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Message/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionMessage();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarMessage(idElemento) {

    $("#resultado").empty();
    
    let myData = { idMessage: idElemento, messageText: $("#messageText").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Message/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionMessage();
            limpiarMessage();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarMessage() {
    $("#messageText").val("");
}

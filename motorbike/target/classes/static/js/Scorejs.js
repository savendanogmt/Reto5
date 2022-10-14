

function guardarInformacionScore() {

    $("#resultadoScore").empty();
    let myData = { stars: $("#stars").val(), messageText: $("#messageTextS").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Score/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionScore();
            limpiarScore();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionScore() {
    $.ajax({
        url: BASE_URL + '/api/Score/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaScore(respuesta);

        }
    }
    );
}

function pintarRespuestaScore(items) {

    $("#resultadoScore").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Stars</th><th>Message</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idScore + "</td>";
        myTable += "<td>" + items[i].stars + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";
        //myTable+="<td><button onclick='borrarScore("+items[i].idScore+")'>Borrar</button>";
        myTable+="<td><button onclick='actualizarScore("+items[i].idScore+")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoScore").append(myTable);

}

/*
function borrarScore(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Score/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionScore();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}*/

function actualizarScore(idElemento) {

    $("#resultado").empty();
    
    let myData = { idScore: idElemento, stars: $("#stars").val(), messageText: $("#messageTextS").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Score/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionScore();
            limpiarScore();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarScore() {
    $("#stars").val("");
    $("#messageTextS").val("");
}

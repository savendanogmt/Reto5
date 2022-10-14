

function guardarInformacionClient() {

    $("#resultado").empty();
    let myData = { email: $("#emailClient").val(), password: $("#passwordClient").val(), name: $("#nameClient").val(), age: $("#ageClient").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Client/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionClient();
            limpiarClient();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionClient() {
    $.ajax({
        url: BASE_URL + '/api/Client/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaClient(respuesta);

        }
    }
    );
}

function pintarRespuestaClient(items) {

    $("#resultadoClient").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Email</th><th>Password</th><th>Name</th><th>Age</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idClient + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].password + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td><button onclick='borrarClient(" + items[i].idClient + ")'>Borrar</button>";
        myTable += "<td><button onclick='actualizarClient(" + items[i].idClient + ")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoClient").append(myTable);

}

function borrarClient(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Client/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionClient();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarClient(idElemento) {

    $("#resultado").empty();
    
    let myData = { idClient: idElemento, email: $("#emailClient").val(), password: $("#passwordClient").val(), name: $("#nameClient").val(), age: $("#ageClient").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Client/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionClient();
            limpiarClient();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarClient() {
    $("#emailClient").val("");
    $("#nameClient").val("");
    $("#passwordClient").val("");
    $("#ageClient").val("");
}

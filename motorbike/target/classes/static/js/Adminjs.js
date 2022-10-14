//const BASE_URL = 'http://152.70.143.130:8080'
const BASE_URL = 'http://localhost:8080'


function guardarInformacionAdmin() {

    $("#resultadoAdmin").empty();
    let myData = { email: $("#emailAdmin").val(), password: $("#passwordAdmin").val(), name: $("#nameAdmin").val(), age: $("#ageAdmin").val(), }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Admin/save',
        type: 'POST',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionAdmin();
            limpiarAdmin();
            console.log(respuesta);
            alert("Inserción exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function traerInformacionAdmin() {
    $.ajax({
        url: BASE_URL + '/api/Admin/all',
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuestaAdmin(respuesta);

        }
    }
    );
}

function pintarRespuestaAdmin(items) {

    $("#resultadoAdmin").empty();

    let myTable = "<table border=3>";
    myTable += "<tr><th>Id</th><th>Email</th><th>Password</th><th>Name</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].idAdmin + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].password + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable+="<td><button onclick='borrarAdmin("+items[i].idAdmin+")'>Borrar</button>";
        myTable+="<td><button onclick='actualizarAdmin("+items[i].idAdmin+")'>Actualizar</button>";
        myTable += "</tr>";

    }
    myTable += "</table>";
    $("#resultadoAdmin").append(myTable);

}


function borrarAdmin(idElemento) {

    $.ajax({
        url: BASE_URL + '/api/Admin/' + idElemento,
        type: 'DELETE',
        datatype: "JSON",
        success: function (respuesta) {
            // console.log(respuesta);
            traerInformacionAdmin();
            alert("Borrado exitoso");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function actualizarAdmin(idElemento) {

    $("#resultado").empty();
    
    let myData = { idAdmin: idElemento, email: $("#emailAdmin").val(), password: $("#passwordAdmin").val(), name: $("#nameAdmin").val(), age: $("#ageAdmin").val() }
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: BASE_URL + '/api/Admin/update',
        type: 'PUT',
        data: dataToSend,
        datatype: "JSON",
        contentType: 'application/json',
        success: function (respuesta) {
            traerInformacionAdmin();
            limpiarAdmin();
            alert("Actualizacion exitosa");
        },
        error: function (xhr, status) {
            alert('Operacion no satisfactoria,' + xhr.status);
        }
    }
    );
}

function limpiarAdmin() {
    $("#emailAdmin").val("");
    $("#nameAdmin").val("");
    $("#passwordAdmin").val("");
    $("#ageAdmin").val("");
}
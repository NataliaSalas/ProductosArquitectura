//llamado ajax en query

//que este listo cuando cargo la pagina
$('document').ready(function (){
    getCliente();
});

/*llamar todo_lo_ que ya tengo en la base de datos, linea 27 y 28*/

function getCliente(){
    $.ajax({
        url: 'api/cliente/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintCliente(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

/*funcion para guargar lo que se ponga en el formulario adjunto a esto va un codigo
* html linea de la 16 a la 25*/
function saveCliente(){

    let cliente={
        nombreEmpresa:$("#nombreEmpresa").val(),
        nombreDueno:$("#nombreDueno").val(),
        direccion:$("#direccion").val(),
        correo:$("#correo").val(),
        numero:$("#numero").val(),
        nit:$("#nit").val()
    }
    let dataToSend=JSON.stringify(cliente);
    $.ajax({
        url: 'api/cliente/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getCliente();

            $("#nombreEmpresa").val("");
            $("#nombreDueno").val("");
            $("#direccion").val("");
            $("#correo").val("");
            $("#numero").val("");
            $("#nit").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

function paintCliente(r) {
    let tableHTML = `
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>Nombre Empresa</th>
                    <th>Nombre Dueño</th>
                    <th>Dirección</th>
                    <th>Correo</th>
                    <th>Número</th>
                    <th>NIT</th>
                    <th>Borrar</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < r.length; i++) {
        tableHTML += `
                <tr>
                    <td>${r[i].nombreEmpresa}</td>
                    <td>${r[i].nombreDueno}</td>
                    <td>${r[i].direccion}</td>
                    <td>${r[i].correo}</td>
                    <td>${r[i].numero}</td>
                    <td>${r[i].nit}</td>
                    <td><a onclick="deleteCliente(${r[i].id})"><img src="../images/trash.png" class="ui image avatar"></a></td>
                    <td><img src="../images/edit.png" class="ui image avatar"></td>
                </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    $("#parrilla").html(tableHTML);
}

function deleteCliente(id){
    Swal.fire({
        title: 'Seguro quieres borrar este cliente?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Sí estoy seguro',
        cancelButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            //Swal.fire('Saved!', '', 'success')
            $.ajax({
                url: 'api/cliente/delete/'+id,
                type:'DELETE',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(data) {
                    // Aquí procesamos los datos obtenidos
                    Swal.fire('Borrado!', '', 'success');
                    getCliente();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Aquí manejamos cualquier error que pueda haber ocurrido
                    console.log(textStatus + ': ' + errorThrown);
                }
            });
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })

}


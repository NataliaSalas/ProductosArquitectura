//llamado ajax en query

//que este listo cuando cargo la pagina
$('document').ready(function (){
    getProducto();
});

/*llamar todo_lo_ que ya tengo en la base de datos, linea 27 y 28*/

function getProducto(){
    $.ajax({
        url: 'api/inventario/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintProducto(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

/*funcion para guargar lo que se ponga en el formulario adjunto a esto va un codigo
* html linea de la 16 a la 25*/
function saveProducto(){

    let producto={
        nombre:$("#nombre").val(),
        referencia:$("#referencia").val(),
        clasificacion:$("#clasificacion").val(),
        marca:$("#marca").val(),
        precio:$("#precio").val()
    }
    let dataToSend=JSON.stringify(producto);
    $.ajax({
        url: 'api/inventario/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getProducto();

            $("#nombre").val("");
            $("#referencia").val("");
            $("#clasificacion").val("");
            $("#marca").val("");
            $("#precio").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

function paintProducto(r) {
    let tableHTML = `
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Referencia</th>
                    <th>Clasificacion</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Borrar</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < r.length; i++) {
        tableHTML += `
                <tr>
                    <td>${r[i].nombre}</td>
                    <td>${r[i].referencia}</td>
                    <td>${r[i].clasificacion}</td>
                    <td>${r[i].marca}</td>
                    <td>${r[i].precio}</td>
                    <td><a onclick="deleteProducto(${r[i].id})"><img src="../images/trash.png" class="ui image avatar"></a></td>
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

function deleteProducto(id){
    Swal.fire({
        title: 'Seguro quieres borrar este producto?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Sí estoy seguro',
        cancelButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            //Swal.fire('Saved!', '', 'success')
            $.ajax({
                url: 'api/inventario/delete/'+id,
                type:'DELETE',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(data) {
                    // Aquí procesamos los datos obtenidos
                    Swal.fire('Borrado!', '', 'success');
                    getProducto();
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


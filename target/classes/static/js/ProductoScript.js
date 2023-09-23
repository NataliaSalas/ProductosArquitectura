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
        descripcion:$("#descripcion").val(),
        marca:$("#marca").val(),
        precio:$("#precio").val(),
        image:$("#image").val()
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
            $("#descripcion").val("");
            $("#marca").val("");
            $("#precio").val("");
            $("#image").val("")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

/*
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
                    <th>Cunsultar QR</th>
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
                    <td><a onclick="generarQR(${r[i].id})"><img src="../images/lupa.png" class="ui image avatar"></a></td>
                </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    $("#parrilla").html(tableHTML);
}
*/

function paintProducto(r){
    let d="";

    for(i=0;i<r.length;i++){
        d+=`
                    <div class="ui card">
              <div class="image">
                <img src="${r[i].image}">
              </div>
              <div class="content">
                <a class="header">Nombre producto: ${r[i].nombre}</a>
                <a class="header">Referencia:  ${r[i].referencia}</a>
                <a class="header">Marca:  ${r[i].marca}</a>
                <div class="meta">
                  <a class="description">Descripcion producto: ${r[i].descripcion}</a>
                </div>
                
              </div>
              
              <div class="extra content">
                <a>
                  <i class="price icon"></i>
                  $ ${r[i].precio}
                </a>
              </div>
              
              <div class="extra content">
                <a>
                  <a onclick="deleteProducto(${r[i].id})"><img src="../images/trash.png" class="ui image avatar"></a></td>
                  <img src="../images/edit.png" class="ui image avatar"></td>
                  <a onclick="generarQR(${r[i].id})"><img src="../images/lupa.png" class="ui image avatar"></a></td>
                </a>
              </div>
              
            </div>
         
        `;
    }
    $("#parrilla").html(d);
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

function generarQR(id){
    Swal.fire({
                title: 'QR!',
                html: '<div id="qrcode"></div>',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
        });///
    $.ajax({
            url: 'api/inventario/findById/'+id,
            type:'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                // Aquí procesamos los datos obtenidos
                console.log(data);
                var cadena = "Producto: \n\t- Nombre: "+data.nombre+
                                       "\n\t- Referencia: "+data.referencia+
                                       "\n\t- Clasificacion: "+data.descripcion+
                                       "\n\t- Marca: "+data.marca+
                                       "\n\t- Precio: "+data.precio;
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: cadena,
                    width: 350,  // Aumenta el ancho a 400 píxeles
                    height: 350, // Aumenta el alto a 400 píxeles
                    //logo: "logo_t1.png",
                    colorDark : "#0000DD",
            //	    logoWidth: undefined,
            //	    logoHeight: undefined,
                    //logoBackgroundColor: '#ffffff',
                    logoBackgroundTransparent: false,
                    ////
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Aquí manejamos cualquier error que pueda haber ocurrido
                console.log(textStatus + ': ' + errorThrown);
            }
    });
    qrcode.clear();
    //qrcode.makeCode("New Content Here");
}



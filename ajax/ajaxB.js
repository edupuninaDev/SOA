let url;
let isEdit = false;
let currentModal = null;
$( document ).ready( function () {
    loadUsers();

} );

function loadUsers() {
    $.ajax( {
        url: 'http://localhost/SOA/Controllers/ApiRest.php',
        method: 'GET',
        success: function ( data ) {
            $( '#dg tbody' ).empty(); // Limpia las filas existentes
            data.forEach( estudiante => {
                $( '#dg tbody' ).append( `
                    <tr data-estudiante='${JSON.stringify( estudiante )}'>
                        <td>${estudiante.cedula}</td>
                        <td>${estudiante.nombre}</td>
                        <td>${estudiante.apellido}</td>
                        <td>${estudiante.telefono}</td>
                        <td>${estudiante.direccion}</td>
                        <td>
                            <button class="btn btn-sm btn-primary edit-btn">Editar</button>
                            <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                        </td>
                    </tr>
                `);
            } );
        },
        error: function ( xhr, status, error ) {
            console.error( 'Error al cargar los datos:', error );
        }
    } );
}


function newUser() {
    $( '#fm' )[0].reset();
    $( '#dlgLabel' ).text( 'Nuevo Estudiante' );
    url = 'http://localhost/SOA/Controllers/ApiRest.php';
    isEdit = false;
    currentModal = new bootstrap.Modal( document.getElementById( 'dlg' ) );
    currentModal.show();
}

$( document ).on( 'click', '.edit-btn', function () {
    const row = $( this ).closest( 'tr' ).data( 'estudiante' );
    $( '#fm' )[0].reset();
    $( '#cedula' ).val( row.cedula );
    $( '#nombre' ).val( row.nombre );
    $( '#apellido' ).val( row.apellido );
    $( '#telefono' ).val( row.telefono );
    $( '#direccion' ).val( row.direccion );
    $( '#dlgLabel' ).text( 'Editar Estudiante' );
    url = 'http://localhost/SOA/Controllers/ApiRest.php?cedula=' + row.cedula;
    isEdit = true;  // Asegúrate que isEdit se pone en true para la edición
    currentModal = new bootstrap.Modal( document.getElementById( 'dlg' ) );
    currentModal.show();
} );

$( document ).on( 'click', '.delete-btn', function () {
    const row = $( this ).closest( 'tr' ).data( 'estudiante' );
    if ( confirm( "¿Estás seguro de que deseas eliminar este estudiante?" ) ) {
        $.ajax( {
            url: 'http://localhost/SOA/Controllers/ApiRest.php',
            method: 'DELETE',
            data: JSON.stringify( { cedula: row.cedula } ),
            contentType: 'application/json',
            success: function () {
                alert( "Estudiante eliminado correctamente" );
                loadUsers();
            },
            error: function ( xhr, status, error ) {
                alert( "Error al eliminar estudiante: " + error );
            }
        } );
    }
} );


function saveUser() {
    $( '#fm' ).on( 'submit', function ( e ) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        let data = $( '#fm' ).serializeArray();
        let jsonData = {};
        $.each( data, function ( i, field ) {
            jsonData[field.name] = field.value;
        } );

        if ( !isEdit ) {
            // Realiza un POST si no es una edición
            $.ajax( {
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify( jsonData ),
                success: function ( result ) {
                    currentModal.hide(); // Cierra el modal
                    loadUsers(); // Recarga los datos de los estudiantes
                    // Muestra un mensaje de error con Bootstrap

                },
                error: function ( xhr, status, error ) {
                    console.error( 'Error al guardar los datos:', error );
                }
            } );
        } else {
            // Realiza un PUT si es una edición
            $.ajax( {
                url: url,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify( jsonData ),
                success: function ( result ) {
                    currentModal.hide(); // Cierra el modal 
                    loadUsers(); // Recarga los datos de los estudiantes
                    // Muestra un mensaje de error con Bootstrap
                },
                error: function ( xhr, status, error ) {
                    console.error( 'Error al guardar los datos:', error );
                }
            } );
        }
    } );
}

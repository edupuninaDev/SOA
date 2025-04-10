
let url = '../Controllers/ApiRest.php';
let isEdit; // Variable to track if we are editing a user
$( document ).ready( function () {
    $( '#dg' ).datagrid( {
        url: url,
        method: 'GET',
        success: function ( data ) {
            $( '#dlg' ).datagrid( 'reload' );
            console.log( data );
            return data;
        }
    } );
}
);


function newUser() {
    $( '#dlg' ).dialog( 'open' ).dialog( 'center' ).dialog( 'setTitle', 'Nuevo Estudiante' );
    $( '#fm' ).form( 'clear' );
    url = '../Controllers/ApiRest.php'; // Set the URL for creating a new user
    isEdit = false; // Set isEdit to false for new user
}

function editUser() {
    var row = $( '#dg' ).datagrid( 'getSelected' );
    if ( row ) {
        $( '#dlg' ).dialog( 'open' ).dialog( 'center' ).dialog( 'setTitle', 'Edit User' );
        $( '#fm' ).form( 'load', row );
        url = '../Controllers/ApiRest.php?cedula=' + row.cedula; // URL for updating a user
        isEdit = true; // Set isEdit to true for editing user
    }
}

function saveUser() {
    $( '#fm' ).form( 'submit', {
        onSubmit: function () {
            let data = $( '#fm' ).serializeArray();
            let jsonData = {};
            $.each( data, function ( i, field ) {
                jsonData[field.name] = field.value;
            } );

            if ( !isEdit ) {
                $.ajax( {
                    url: url,
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify( jsonData ),
                    success: function ( result ) {
                        $( '#dlg' ).dialog( 'close' );
                        $( '#dg' ).datagrid( 'reload' );
                    },
                } );
            } else {
                $.ajax( {
                    url: url,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify( jsonData ),
                    success: function ( result ) {
                        if ( !result.success ) {
                            $( '#dlg' ).dialog( 'close' );
                            $( '#dg' ).datagrid( 'reload' );
                        } else {
                            $.messager.show( {
                                title: 'Error',
                                msg: result.message
                            } );
                        }
                    },

                } );
            }
            return false;
        }
    } );
}


function destroyUser() {
    var row = $( '#dg' ).datagrid( 'getSelected' );
    if ( row ) {
        $.messager.confirm( 'Confirmar', '¿Estás seguro de que deseas eliminar este estudiante?', function ( r ) {
            if ( r ) {
                $.ajax( {
                    url: '../Controllers/ApiRest.php',
                    method: 'DELETE',
                    data: JSON.stringify( { cedula: row.cedula } ),
                    contentType: 'application/json',
                    success: function ( response ) {
                        alert( "Estudiante eliminado correctamente" );
                        $( '#dg' ).datagrid( 'reload' );
                    },
                    error: function ( xhr, status, error ) {
                        alert( "Error al eliminar estudiante: " + error );
                    }
                } );
            }
        } );
    } else {
        alert( "Selecciona un estudiante para eliminar." );
    }
}

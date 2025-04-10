<?php
include_once "../Models/Select.php";
include_once "../Models/Insert.php";
include_once "../Models/Delete.php";
include_once "../Models/Update.php";
header('Content-Type: application/json; charset=utf-8');
$opc = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents('php://input', true));
switch ($opc) {
    case 'GET':
        Select::selectStudent();
        break;
    case 'POST':
        Insert::insertStudent($datos->cedula, $datos->nombre, $datos->apellido, $datos->telefono, $datos->direccion);
        break;
    case 'DELETE':
        Delete::deleteStudent($datos->cedula);
        break;
    case 'PUT':
        Update::updateStudent($datos->cedula, $datos->nombre, $datos->apellido, $datos->telefono, $datos->direccion);
        break;
    default:
        echo json_encode(array('error' => 'Error en la petición'));
        break;
}
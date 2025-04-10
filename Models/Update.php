<?php
include_once "Conexion.php";
class Update
{
    public static function updateStudent($cedula, $nombre, $apellido, $telefono, $direccion)
    {
        $object = new Conexion();
        // $cedula = $_POST['cedula'];
        // $nombre = $_POST['nombre'];
        // $apellido = $_POST['apellido'];
        // $telefono = $_POST['telefono'];
        // $direccion = $_POST['direccion'];
        $connection = $object->conectar();
        $sql = "UPDATE estudiantes SET nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', direccion = '$direccion' WHERE cedula = '$cedula'";
        $result = $connection->query($sql);
        print_r(json_encode($result));
        $connection->commit();
    }
}
<?php
include_once "Conexion.php";
class Insert
{
    public static function insertStudent($cedula, $nombre, $apellido, $telefono, $direccion)
    {
        $object = new Conexion();
        // $cedula = $_POST['cedula'];
        // $nombre = $_POST['nombre'];
        // $apellido = $_POST['apellido'];
        // $telefono = $_POST['telefono'];
        // $direccion = $_POST['direccion'];
        $connection = $object->conectar();
        $sqlInsert = "INSERT INTO estudiantes (cedula, nombre, apellido, telefono, direccion) VALUES ('$cedula', '$nombre', '$apellido', '$telefono', '$direccion')";
        $connection->query($sqlInsert);
        print_r(json_encode("se insertó el registro con cédula: " . $cedula));
        $connection->commit();
    }
}


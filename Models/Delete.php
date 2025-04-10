<?php

include_once "Conexion.php";
class Delete
{
    public static function deleteStudent($cedula)
    {
        $object = new Conexion();
        $connection = $object->conectar();
        $sqlDelete = "DELETE FROM estudiantes WHERE cedula = '$cedula'";
        $connection->query($sqlDelete);
        print_r(json_encode("Se eliminó el registro con cédula: " . $cedula));
        $connection->commit();
    }
}
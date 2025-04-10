<?php
require_once 'Conexion.php';

class Select
{

    public static function selectStudent()
    {
        $object = new Conexion();
        $connection = $object->conectar();
        $sql = "SELECT * FROM estudiantes";
        $result = $connection->query($sql);
        if ($result) {
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
            print_r(json_encode($data));
        }
    }
}

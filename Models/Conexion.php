<?php
class Conexion
{
    public function conectar()
    {
        // Define.- Permite definir constantes
        define('SERVER', 'localhost');
        define('DB', 'soa');
        define('USER', 'root');
        define('PASS', '');
        // PDO.- Permite conectar a la base de datos
        // :: acceder a un método estático de una clase
        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND > 'SET NAMES utf8');
        try {
            return new PDO("mysql:host=" . SERVER . ";dbname=" . DB, USER, PASS, $opc);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}

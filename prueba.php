<?php
// array asociativo
// json encode; convierte un php a String JSON
// json decode; convierte un String JSON a php
$arrayasociativo = array("nombre" => "Juan", "apellido" => "Perez", "edad" => 25);
print_r($arrayasociativo);
print_r(gettype($arrayasociativo));
$myJSONArray = json_encode($arrayasociativo);
echo "<br>";
echo $myJSONArray;
echo gettype($myJSONArray);
echo "<br>";
$myJSONPHP = json_decode($myJSONArray);
print_r($myJSONPHP);
echo gettype($myJSONPHP);


$array = array("lunes", "martes", "miércoles");
print_r($array);
print_r(gettype($array));
echo "<br>";
$objeto = new stdClass();
$objeto->Nombre = "Carlos";
$objeto->Apellido = "Nuñez";
print_r($objeto);
print_r(gettype($objeto));
echo "<br>";
$myJSONObjeto = json_encode($objeto);
echo $myJSONObjeto;
echo gettype($myJSONObjeto);

echo "<br>";

$estudiante = '[
    {
        "nombre": "Carlos",
        "apellido": "Nuñez",
        "edad": 43,
        "educación": [
            {
                "primaria": "La Salle",
                "secundaria": "Bolivar",
                "superior": "UTA"
            }
        ]
    },
    {
        "nombre": "Juan",
        "apellido": "Perez",
        "edad": 23,
        "educación": [
            {
                "primaria": "Gonzales Suarez",
                "secundaria": "Guayaquil",
                "superior": "UTA"
            }
        ]
    },
    {
        "nombre": "Maria",
        "apellido": "Gomez",
        "edad": 33,
        "educación": [
            {
                "primaria": "La Salle",
                "secundaria": "Bolivar",
                "superior": "UTA"
            }
        ]
    }
]';

echo $estudiante;
echo gettype($estudiante);
echo "<br>";
$myJSONEstudiante = json_decode($estudiante);
print_r($myJSONEstudiante);
echo gettype($myJSONEstudiante);
echo "<br>";
for ($i = 0; $i < sizeof($myJSONEstudiante); $i++) {
    print_r($myJSONEstudiante[$i]->nombre);
    echo "<br>";
}

print_r($myJSONEstudiante[0]->nombre);
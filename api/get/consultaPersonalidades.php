<?php

header("Access-Control-Allow-Origin: *");

$host = "sql10.freemysqlhosting.net";
$username = "sql10582224";
$password = "CM6ncEedqz";
$dbname = "sql10582224";

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $connection_string = mysqli_connect($host, $username, $password, $dbname)
    or die 
    ("Problema ao conecter-se ao servidor.");
    $connection_string->set_charset('utf8mb4');

    $response = [];
    $dadosPersonalidades = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "Select * from vw_consultaPersonalidades";
        $result = mysqli_query($connection_string, $cmd); 
        $busca_por_personalidades = mysqli_num_rows($result);

        if($busca_por_personalidades != 0) {
            $stmt = $connection_string->prepare($cmd);
            $stmt->execute();
            $stmt->bind_result($cd_personalidade, $nm_personalidade, 
            $sigla_personalidade, $cd_categoria, $nm_categoria_personalidade);

            while($stmt->fetch())
            {
                $temp = [
                    'cd_personalidade' => $cd_personalidade,
                    'nm_personalidade' => $nm_personalidade,
                    'sigla_personalidade' => $sigla_personalidade,
                    'cd_categoria' => $cd_categoria,
                    'nm_categoria_personalidade' => $nm_categoria_personalidade,
                ];

                array_push($dadosPersonalidades, $temp);
            }
            
            $response = [
                'response' => 'True',
                'data' => $dadosPersonalidades
            ];
        } else {
            $response = [
                'response' => 'False',
            ];
        } 
    }

    echo json_encode($response, JSON_PRETTY_PRINT);
    mysqli_close($connection_string);
}

?>
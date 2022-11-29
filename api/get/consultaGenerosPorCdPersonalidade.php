<?php

header("Access-Control-Allow-Origin: *");

$host = "sql10.freemysqlhosting.net";
$username = "sql10580979";
$password = "nGL9h6etHc";
$dbname = "sql10580979";

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $connection_string = mysqli_connect($host, $username, $password, $dbname)
    or die 
    ("Problema ao conecter-se ao servidor.");
    $connection_string->set_charset('utf8mb4');

    $cd_personalidade = $_GET['cd_personalidade'];
    $tipo_entreterimento = $_GET['tipo_entreterimento'];
    $response = [];
    $dadosGenerosPersonalidade = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "select * from vw_consultaCategoriasPersonalidades";
        $result = mysqli_query($connection_string, $cmd);
        $busca_por_categoria = mysqli_num_rows($result);

        if($busca_por_categoria != 0) {
            $cmd = "call sp_consultaGenerosPorPersonalidadeENmEntreterimento($cd_personalidade, '$tipo_entreterimento')";
            $stmt = $connection_string->prepare($cmd);
            $stmt->execute();
            $stmt->bind_result($nm_entreterimento, $nm_genero, $nm_categoria_personalidade, 
            $cd_categoria, $cd_genero, $cd_entreterimento);

            while($stmt->fetch())
            {
                $temp = [
                    'nm_entreterimento' => $nm_entreterimento, 
                    'nm_genero' => $nm_genero, 
                    'nm_categoria_personalidade' => $nm_categoria_personalidade, 
                    'cd_categoria' => $cd_categoria, 
                    'cd_genero' =>$cd_genero, 
                    'cd_entreterimento' => $cd_entreterimento
                ];
                array_push($dadosGenerosPersonalidade, $temp);
            }
            
            $response = [
                'response' => 'True',
                'data' => $dadosGenerosPersonalidade
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
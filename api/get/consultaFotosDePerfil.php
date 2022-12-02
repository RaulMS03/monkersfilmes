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

    $response = [];
    $dadosFotoPerfil = [];

    if (!$connection_string) {
        $response = [
            'databaseConnection' => 'False',
        ];
    } else {
        $cmd = "Select * from tbl_Foto_Perfil limit 5";

        $result = mysqli_query($connection_string, $cmd); 
        $busca_por_foto_perfil = mysqli_num_rows($result);

        if($busca_por_foto_perfil != 0) {

            $stmt = $connection_string->prepare($cmd);
            $stmt->execute();
            $stmt->bind_result($cd_foto_perfil, $url_foto_perfil);

            while($stmt->fetch())
            {
                $temp = [
                    'cd_foto_perfil' => $cd_foto_perfil,
                    'url_foto_perfil' => $url_foto_perfil,
                ];
                array_push($dadosFotoPerfil, $temp);
            }

            $response = [
                'response' => 'True',
                'data' => $dadosFotoPerfil
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
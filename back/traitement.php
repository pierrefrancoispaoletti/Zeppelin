<?php

$datas = json_decode(file_get_contents("php://input"), true);

//ici traitement des données sur le serveur indexation et generation du document déposé

$data = ["status" => "OK", "response" => json_encode($datas)];
header('Access-Control-Allow-Origin: http://localhost:3000/*');
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);

<?php
// require_once '../../Ihm/_Config/Config.php';
// require_once Chemin_Site . '/_Fonctions/Includes.php';
// require_once Chemin_Site . '/_Communs/Verifier_Authentification.php';

["Res_Id" => $Res_Id, "Coll_Id" => $Coll_Id, "edit" => $edit] = $_REQUEST;

if (strlen($edit)) {
    $Document = Get_Documents_Data(N_Client, $Coll_Id, $Res_Id);
    $Tableau_Index = Identifier_Index_Collection(N_Client, $Coll_Id);
}

["User_Id" => $User_Id, "FirstName" => $FirstName, "LastName" => $LastName] = $_SESSION["User"];

$user = (object) [
    "User_Id" => $User_Id ?? "test dev spé",
    "FirstName" => $FirstName ?? "test dev spé",
    "LastName" => $LastName ?? "test dev spé",
];


$encodedUser = json_encode($user);
$encodedDocument = json_encode($Document ?? []);
$encodedTableauIndex = json_encode($Tableau_Index ?? []);
echo "<script type='text/javascript'> user = {$encodedUser}; documentData={$encodedDocument}; tableauIndex={$encodedTableauIndex} </script>";
require __DIR__ . '/react/index.html';

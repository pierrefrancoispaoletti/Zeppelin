<?php
$Nom_Doc = $Valeurs['Nom_Fichier'];
$N_Client = $Valeurs['N_CLIENT'];

$DB_dbName_GED = Nom_Base_Client($N_Client);

preg_match("/([0-9]+)[-.]*[a-z]*/", $Nom_Doc, $Matche_Sub);
$id = $Matche_Sub[1];

$req = Get_Db_Client($N_Client)->SQLQuery("SELECT * FROM $DB_dbName_GED.z_form_demande_conge WHERE
id_sub = #sub#",$Tab)->fetchAll(); 


if (count($req)>0) {


    $Valeurs["custom_t1"]   = $req[0]['nom'].' '.$req[0]['prenom']; //Salarié | Nom Prénom
    $Valeurs["custom_d4"]   = $req[0]["Date"]; //Date de la demande


    $Valeurs["custom_d3"]   = $req[0]["date_debut"];//Date de Début
    $Valeurs["custom_d5"]   = $req[0]["Date_fin"];//Date de fin
    $Valeurs["custom_f1"]   = $req[0]["total_jour"];//Total de jours
    $Valeurs["custom_t5"]   = $req[0]["motif"];

    $Valeurs["custom_t3"]   = $req[0]["valideur"];//Valideur


    $Valeurs["custom_n2"]   = $req[0]["type_conge"];
    $Valeurs["custom_n4"]   = $req[0]["duree"];




    if($req[0]["duree"] == 'Une ½ journée'){
        $Valeurs["custom_n6"]= "1";
    }else{
        $Valeurs["custom_n6"]= "2";
    }

    switch ($req[0]["type_conge"]) {
        case 'Autre':
            $Valeurs["custom_t4"]   = $req[0]["autre"];
            $Valeurs["custom_n2"]= "3";
            break;
        case "Congés payés":
            $Valeurs["custom_n2"]= "1";
            break;
        case 'RTT':
            $Valeurs["custom_n2"]= "2";
            break;
        case 'Congés sans soldes':
            $Valeurs["custom_n2"]= "4";
            break;
    }
    switch ($req[0]["etat_validation"]) {
        case 'Accorde':
            $Valeurs["custom_n1"]=array(2);
            break;
        case "N'accorde pas":
            $Valeurs["custom_n1"]=array(5);
            break;
        case 'Accorde seulement':
            $Valeurs["custom_n1"]=array(3);
            $Valeurs["custom_d1"]   = $req[0]["validation_date_debut"];//Validation | Date de début
            $Valeurs["custom_d2"]   = $req[0]["validation_date_fin"];//Validation | Date de fin
            break;
    }
}

$Valeurs["custom_n3"] = $Valeurs['Uploader_Entity'];

if (empty($Valeurs["custom_n1"]))
    {
     $Valeurs["custom_n1"]= "1";
    }
?>
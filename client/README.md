$(document).ready(function(){

var approbateur = $(".custom_t3 a");
var utilisateur = "<? echo $Utilisateur ?>";
var bouton_visible = false;

if(approbateur.eq(0).text() != "") {

for(var i = 0; i < approbateur.length; i++){ if(approbateur.eq(i).text().indexOf(utilisateur)> -1) {

    bouton_visible = true;
    }
    }

    }

    if(bouton_visible) {

    setTimeout(function() {

    Doc_Id = Res_Id;

    if (Coll_Id == "coll_11") {


    $("#div_actions").prepend(
    "<a href=\"/zeppelin_france/_ClientSpecific/Form_Demande_Conge_Coll_4.php?"+ Coll_Id +"&Res_Id="+ Res_Id +" &edit="+ Res_Id +" \" onclick=\"popup('/zeppelin_france/_ClientSpecific/Form_Demande_Conge_Coll_4.php?"+ Coll_Id +"&Res_Id="+ Res_Id +" &edit=1', 'POP_Edition_"+ Res_Id +"' );\" target=\"POP_Edition_"+ Res_Id +"\>
        <div class=\"Bouton_Action_Viewer\" id=\"Bouton_Webinar\" style=\"width: 200px;background-color:#0080c0;color:white;height:45px;\">
            <div class=\"Logo_Bouton_Action_Viewer\">
                <div class=\"icon-pencil icone-bouton\" style=\"font-size:30px;display:inline-block;\"></div>
            </div>
            <div class=\"Label_Bouton_Action_Viewer\">Editer</div>
        </div>
    </a>"
    );

    }
    }, 100);
    }
    });
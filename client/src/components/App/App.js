import { useMemo } from "react";
import { documentData, user, tableauIndex } from "../datas";
import Form from "../Form/Form";
let edit = false;
function App() {
  // let user = window.user;
  let documentData = window.documentData;
  // let tableauIndex = window.tableauIndex;
  let userInfos = window.userinfos;
  let Res_Id = window.Res_Id;

  let InitialState = useMemo(
    () => ({
      FirstName: "",
      LastName: "",
      userIdDeposeur: "",
      Date: "",
      Demande: "",
      Date_Debut: "",
      Date_Fin: "",
      Duree: {
        demi: false,
        full: false,
        multi: false,
      },
      Demi: {
        AM: false,
        PM: false,
      },
      Valable: {
        CP: false,
        RTT: false,
        CSS: false,
        Others: false,
      },
      raisonAutre: "",
      TotalJour: "",
      Valideur: {
        FirstName: "",
        LastName: "",
        valideurId: "",
        statutValidation: {
          accord: false,
          noAccord: false,
          partialAccord: false,
        },
        dateDebut: "",
        dateFin: "",
        dateTraitement: "",
      },
    }),
    []
  );

  if (documentData) {
    const {
      custom_d3, //date debut demande
      custom_d4, //date jour demande
      custom_d5, // date fin demande
      custom_f1, // total de jours
      custom_n2, // Type de conges => tableau index
      custom_n4, // duree conges => tableau index
      custom_n6, // une demi journee
      custom_t1, // nom prenom utilisateur demandeur => chercher demandeur avec id dans tableau index
      custom_t3, // nom valideur chercher dans talbeau index avec id valideur
      custom_t4, // autre raison
      custom_t5, // motif demande
    } = documentData;
    const setStateFromDocumentData = (edit) => {
      if (edit && documentData) {
        let initialState = { ...InitialState };
        let dateDebut = custom_d3[0];
        let dateFin = custom_d5[0];
        let dateDemande = custom_d4[0];
        let totalJour = custom_f1[0];
        let typeConges = custom_n2[0];
        let demiJournee = custom_n6[0];
        let dureeConges = custom_n4[0];
        let autre = custom_t4[0];
        let motif = custom_t5[0];
        initialState.userIdDeposeur = custom_t1[0];
        initialState.FirstName = userInfos?.Deposeur_Id[0].firstname;
        initialState.LastName = userInfos?.Deposeur_Id[0].lastname;
        initialState.Valideur.FirstName = userInfos?.Valideur_Id[0].firstname;
        initialState.Valideur.LastName = userInfos?.Valideur_Id[0].lastname;
        initialState.Date_Debut = dateDebut;
        initialState.Date_Fin = dateFin;
        initialState.Date = dateDemande;
        initialState.TotalJour = totalJour;

        switch (typeConges) {
          case "2":
            initialState.Valable.RTT = true;
            break;
          case "3":
            initialState.Valable.Others = true;
            break;
          case "4":
            initialState.Valable.CSS = true;
            break;
          case "1":
            initialState.Valable.CP = true;
            break;
          default:
            break;
        }
        switch (demiJournee) {
          case "1":
            initialState.Demi.AM = true;
            break;
          case "2":
            initialState.Demi.PM = true;
            break;
          default:
            break;
        }
        switch (dureeConges) {
          case "1":
            initialState.Duree.demi = true;
            break;
          case "2":
            initialState.Duree.full = true;
            break;
          case "3":
            initialState.Duree.multi = true;
            break;

          default:
            break;
        }
        initialState.Demande = motif;
        initialState.raisonAutre = autre;

        return initialState;
      }
    };
    edit = true;
    let updatedState = setStateFromDocumentData(edit);
    InitialState = { ...InitialState, ...updatedState };
  }

  return (
    <div className="App">
      <Form
        user={user}
        documentData={documentData}
        tableauIndex={tableauIndex}
        edit={edit}
        InitialState={InitialState}
        Res_Id={Res_Id}
      />
    </div>
  );
}

export default App;

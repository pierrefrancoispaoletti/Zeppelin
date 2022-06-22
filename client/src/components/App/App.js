import { useCallback, useMemo } from "react";
import { documentData as documentData, user as userData } from "../datas";
import Form from "../Form/Form";

function App() {
  let user = window.user;
  let documentData = window.documentData;
  let tableauIndex = window.tableauIndex;
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
        statutValidation: "",
        dateDebut: "",
        dateFin: "",
        dateTraitement: "",
      },
    }),
    []
  );
  const findDatasInTableauIndex = useCallback(
    (field, column) => {
      let findDeposeurName = tableauIndex.find((el) => {
        if (el.COLUMN === column) {
          return el;
        }
      });
      return findDeposeurName.VALEURS[field];
    },
    [tableauIndex]
  );

  let edit = false;

  if (documentData) {
    const {
      custom_d3, //date debut demande
      custom_d4, //date jour demande
      custom_d5, // date fin demande
      custom_f1, // total de jours
      custom_n1, //statut de validation => tableau index
      custom_n2, // Type de conges => tableau index
      custom_n3, // Service du demandeur => tableau index
      custom_n4, // duree conges => tableau index
      custom_n6, // une demi journee
      custom_t1, // nom prenom utilisateur demandeur => chercher demandeur avec id dans tableau index
      custom_t2, // Date traitement demande
      custom_t3, // nom valideur chercher dans talbeau index avec id valideur
      custom_t4, // autre raison
      custom_t5, // motif demande
    } = documentData;
    const setStateFromDocumentData = (edit) => {
      if (edit && documentData) {
        let initialState = { ...InitialState };
        let nameDeposeur = findDatasInTableauIndex(custom_t1[0], "custom_t1");
        let nameValideur = findDatasInTableauIndex(custom_t3[0], "custom_t3");
        let dateDebut = custom_d3[0];
        let dateFin = custom_d5[0];
        let dateDemande = custom_d4[0];
        let totalJour = custom_f1[0];
        let typeConges = findDatasInTableauIndex(custom_n2[0], "custom_n2");
        let demiJournee = findDatasInTableauIndex(custom_n6[0], "custom_n6");
        let dureeConges =
          findDatasInTableauIndex(custom_n4[0], "custom_n4") ?? demiJournee
            ? "Une demie journée"
            : "";

        let autre = custom_t4[0];
        let motif = custom_t5[0];
        initialState.FirstName = nameDeposeur;
        initialState.Valideur.FirstName = nameValideur;
        initialState.Date_Debut = dateDebut;
        initialState.Date_Fin = dateFin;
        initialState.Date = dateDemande;
        initialState.TotalJour = totalJour;

        switch (typeConges) {
          case "RTT":
            initialState.Valable.RTT = true;
            break;
          case "AUTRES":
            initialState.Valable.Others = true;
            break;
          case "CONGES SANS SOLDE":
            initialState.Valable.CSS = true;
            break;
          case "CONGES PAYES":
            initialState.Valable.CP = true;
            break;
          default:
            break;
        }
        switch (demiJournee) {
          case "AM":
            initialState.Demi.AM = true;
            break;
          case "PM":
            initialState.Valable.PM = true;
            break;
          default:
            break;
        }
        switch (dureeConges) {
          case "Plusieurs journées":
            initialState.Duree.multi = true;
            break;
          case "Une demie journée":
            initialState.Duree.demi = true;
            break;
          case "Une journée":
            initialState.Duree.full = true;
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
      />
    </div>
  );
}

export default App;

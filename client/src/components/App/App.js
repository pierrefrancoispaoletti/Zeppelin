import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { documentData, user, tableauIndex } from "../datas";
import Form from "../Form/Form";
let edit = false;
function App() {
  let user = window.user;
  let documentData = window.documentData;
  let tableauIndex = window.tableauIndex;
  let userInfos = window.userinfos;
  let Res_Id = window.Res_Id;
  const [holidays, setHolidays] = useState({});

  const isHoliday = async () => {
    const currentYear = new Date().getFullYear();
    const response = await axios({
      method: "GET",
      url: `https://calendrier.api.gouv.fr/jours-feries/metropole/${currentYear}.json`,
    });

    setHolidays(response.data);
  };

  useEffect(() => {
    if (Object.keys(holidays).length === 0) {
      console.log("launched");
      isHoliday();
    }
  }, []);

  const isWorkingDay = (d) => {
    console.log(d);
    let dateSplitted = d?.split("/");
    let day = dateSplitted[0];
    let month = dateSplitted[1] - 1;
    let year = dateSplitted[2];

    const feriesKeys = Object.keys(holidays);

    console.log(`${year}-0${month + 1}-${day}`);

    if (feriesKeys.find((el) => el === `${year}-0${month + 1}-${day}`)) {
      return false;
      // non ce n'est pas un jour travaillé
    }
    return true;
    // oui c'est un jour travaillé
  };

  const getBusinessDatesCount = (startDate, endDate) => {
    let count = 0;
    let curDate = +startDate;
    while (curDate <= +endDate) {
      const dayOfWeek = new Date(curDate).getDay();
      const localeDate = new Date(curDate).toLocaleDateString();
      const isWeekend =
        dayOfWeek === 6 || dayOfWeek === 0 || !isWorkingDay(localeDate);
      if (!isWeekend) {
        count++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000;
      console.log(count, localeDate, !isWorkingDay(localeDate), dayOfWeek);
    }

    return count;
  };

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
      custom_n2, // Type de conges => tableau index
      custom_n4, // duree conges => tableau index
      custom_n6, // une demi journee
      custom_t1, // nom prenom utilisateur demandeur => chercher demandeur avec id dans tableau index
      custom_t4, // autre raison
      custom_t5, // motif demande
    } = documentData;
    const setStateFromDocumentData = (edit) => {
      if (edit && documentData) {
        let initialState = { ...InitialState };
        let dateDebut = custom_d3[0];
        let dateFin = custom_d5[0];
        let dateDemande = custom_d4[0];
        let totalJour = getBusinessDatesCount(dateDebut, dateFin);
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
        getBusinessDatesCount={getBusinessDatesCount}
      />
    </div>
  );
}

export default App;

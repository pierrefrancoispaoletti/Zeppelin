import axios from "axios";
import { useEffect, useState } from "react";
import { LoaderStyled } from "../Loader/loader.style";
import {
  ButtonStyled,
  FirstPartFromFormStyled,
  FormStyled,
  SecondPartFromFormStyled,
  Separator,
} from "./form.styled";

const Form = ({ user, edit, InitialState }) => {
  const [userInfos, setUserInfos] = useState({ ...InitialState });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { User_Id, FirstName, LastName } = user;

  let dateDuJour = new Date().toISOString().split("T")[0];

  if (!userInfos.Date && !edit) {
    setUserInfos({
      ...userInfos,
      Date: dateDuJour,
      FirstName: FirstName,
      LastName: LastName,
      userIdDeposeur: User_Id,
    });
  }

  if (!userInfos.Valideur.valideurId && edit) {
    setUserInfos({
      ...userInfos,
      Valideur: {
        ...userInfos.Valideur,
        dateTraitement: dateDuJour,
        FirstName: FirstName,
        LastName: LastName,
        valideurId: User_Id,
      },
    });
  }

  useEffect(() => {
    if (userInfos.Duree.demi && userInfos.Date_debut && !userInfos.Date_Fin) {
      setUserInfos({ ...userInfos, Date_Fin: userInfos.Date_debut });
    }
  }, [userInfos]);

  useEffect(() => {
    let TotalJour = userInfos.Duree.demi
      ? 0.5
      : userInfos.Duree.full
      ? 1
      : userInfos.Duree.multi
      ? dateDiff(new Date(userInfos.Date_Debut), new Date(userInfos.Date_Fin))
      : 0;

    setUserInfos({ ...userInfos, TotalJour });
  }, [
    userInfos.Date_Debut,
    userInfos.Date_Fin,
    userInfos.Duree.demi,
    userInfos.Duree.full,
    userInfos.Duree.multi,
  ]);

  useEffect(() => {
    let accord = userInfos.Valideur.statutValidation.accord;
    let noAccord = userInfos.Valideur.statutValidation.noAccord;
    let accordPartial = userInfos.Valideur.statutValidation.partialAccord;
    if (accord && !userInfos.Valideur.dateDebut) {
      setUserInfos({
        ...userInfos,
        Valideur: {
          ...userInfos.Valideur,
          dateDebut: userInfos.Date_Debut,
          dateFin: userInfos.Date_Fin,
        },
      });
    }

    if (noAccord && !userInfos.Valideur.dateDebut) {
      setUserInfos({
        ...userInfos,
        Valideur: {
          ...userInfos.Valideur,
          dateDebut: "",
          dateFin: "",
        },
      });
    }

    if (accordPartial && !userInfos.Valideur.dateDebut) {
      setUserInfos({
        ...userInfos,
        Valideur: {
          ...userInfos.Valideur,
          dateDebut: userInfos.Date_Debut,
          dateFin: userInfos.Date_Fin,
        },
      });
    }
  }, [userInfos]);

  const axiosCall = async () => {
    setLoading(true);
    const response = await axios({
      method: "POST",
      url: "traitement.php",
      data: JSON.stringify(userInfos),
    });
    if (response.data.status === "OK") {
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosCall();
  };

  const handleChangeTextInput = (e) => {
    let { name, value } = e.target;
    setUserInfos({ ...userInfos, [name]: value });
  };

  const dateDiff = (dateDebut, dateFin) => {
    const calc = Math.ceil(
      Math.abs(dateFin - dateDebut) / (1000 * 60 * 60 * 24)
    );
    if (dateDebut && dateFin && !isNaN(calc)) {
      return calc;
    }
    return 0;
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <FirstPartFromFormStyled>
        <div className="name">
          <label className="label_first" htmlFor="FirstName">
            Nom{" "}
          </label>
          <div className="name_first_block">
            <div className="name_input">
              <input
                disabled={edit}
                type="text"
                name="FirstName"
                id="FirstName"
                value={userInfos.FirstName}
                onChange={handleChangeTextInput}
              />
              <label className="small_label" htmlFor="FirstName">
                Prénom{" "}
              </label>
            </div>
            <div className="name_input">
              <input
                disabled={edit}
                type="text"
                name="LastName"
                id="LastName"
                value={userInfos.LastName}
                onChange={handleChangeTextInput}
              />
              <label className="small_label" htmlFor="LastName">
                Nom de famille{" "}
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="label_first" htmlFor="Date">
            Demande du{" "}
          </label>
          <input
            disabled
            className="date_demande"
            type="date"
            name="Date"
            id="Date"
            value={userInfos.Date}
            onChange={handleChangeTextInput}
          />
        </div>
      </FirstPartFromFormStyled>
      <Separator />
      <SecondPartFromFormStyled>
        <h2>À Remplir par le salarié </h2>
        <div className="partie_salarie">
          <div className="demande">
            <label className="label_first" htmlFor="Demande">
              Je demande un congé pour le motif suivant
            </label>
            <input
              disabled={edit}
              type="text"
              name="Demande"
              id="Demande"
              value={userInfos.Demande}
              onChange={handleChangeTextInput}
            />
          </div>
          <div className="demande">
            <label className="label_first" htmlFor="Duree">
              Durée{" "}
            </label>
            <div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande"
                  id="Demande_demi"
                  checked={userInfos.Duree.demi}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Duree: {
                        ...userInfos.Duree,
                        demi: true,
                        full: false,
                        multi: false,
                      },
                      Date_Fin: "",
                    });
                  }}
                />
                <label htmlFor="Demande_demi">Une 1/2 Journée </label>
              </div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande"
                  id="Demande_one_day"
                  checked={userInfos.Duree.full}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Duree: {
                        ...userInfos.Duree,
                        demi: false,
                        full: true,
                        multi: false,
                      },
                      Demi: {
                        ...userInfos.Demi,
                        AM: false,
                        PM: false,
                      },
                      Date_Fin: "",
                    });
                  }}
                />
                <label htmlFor="Demande_one_day">Une journée complète </label>
              </div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande"
                  id="Demande_Mutliple"
                  checked={userInfos.Duree.multi}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Duree: {
                        ...userInfos.Duree,
                        demi: false,
                        full: false,
                        multi: true,
                      },
                      Demi: {
                        ...userInfos.Demi,
                        AM: false,
                        PM: false,
                      },
                    });
                  }}
                />
                <label htmlFor="Demande_Mutliple">Plusieurs jours </label>
              </div>
            </div>
          </div>
          <div className="demande_dates">
            <div className="demande_date">
              <label className="label_first" htmlFor="Date_Debut">
                {`${userInfos.Duree.multi ? "Du : " : "Le : "} `}
              </label>
              <input
                disabled={edit}
                type="date"
                name="Date_Debut"
                id="Date_Debut"
                value={userInfos.Date_Debut}
                onChange={handleChangeTextInput}
              />
            </div>
            {userInfos.Duree.demi && (
              <>
                <div className="demande_radio">
                  <input
                    disabled={edit}
                    type="radio"
                    name="Demande_Demi"
                    id="Demande_demi_AM"
                    checked={userInfos.Demi.AM}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Demi: {
                          ...userInfos.Demi,
                          AM: true,
                          PM: false,
                        },
                      });
                    }}
                  />
                  <label className="label_first" htmlFor="Demande_demi_AM">
                    AM{" "}
                  </label>
                </div>
                <div className="demande_radio">
                  <input
                    disabled={edit}
                    type="radio"
                    name="Demande_Demi"
                    id="Demande_demi_PM"
                    checked={userInfos.Demi.PM}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Demi: {
                          ...userInfos.Demi,
                          AM: false,
                          PM: true,
                        },
                      });
                    }}
                  />
                  <label className="label_first" htmlFor="Demande_demi_PM">
                    PM
                  </label>
                </div>
              </>
            )}
            {userInfos.Duree.multi && (
              <div className="demande_date">
                <label htmlFor="Date_Fin">Au : </label>
                <input
                  disabled={edit}
                  type="date"
                  name="Date_Fin"
                  id="Date_Fin"
                  value={userInfos.Date_Fin}
                  onChange={handleChangeTextInput}
                />
              </div>
            )}
          </div>
          <div className="demande">
            <label htmlFor="Total_Jour">Nombre de jour de congés : </label>
            <input
              disabled
              type="text"
              name="TotalJour"
              id="Total_Jour"
              value={userInfos.TotalJour}
            />
          </div>
          <div className="demande">
            <label className="label_first" htmlFor="Valable">
              Valable pour :{" "}
            </label>
            <div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande_Valable"
                  id="Demande_Valable_CP"
                  checked={userInfos.Valable.CP}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Valable: {
                        ...userInfos.Valable,
                        CP: true,
                        RTT: false,
                        CSS: false,
                        Others: false,
                      },
                    });
                  }}
                />
                <label htmlFor="Demande_Valable_CP">Congés payés </label>
              </div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande_Valable"
                  id="Demande_Valable_RTT"
                  checked={userInfos.Valable.RTT}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Valable: {
                        ...userInfos.Valable,
                        CP: false,
                        RTT: true,
                        CSS: false,
                        Others: false,
                      },
                    });
                  }}
                />
                <label htmlFor="Demande_Valable_RTT">RTT</label>
              </div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande_Valable"
                  id="Demande_Valable_CSS"
                  checked={userInfos.Valable.CSS}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Valable: {
                        ...userInfos.Valable,
                        CP: false,
                        RTT: false,
                        CSS: true,
                        Others: false,
                      },
                    });
                  }}
                />
                <label htmlFor="Demande_Valable_CSS">Congés sans soldes </label>
              </div>
              <div className="demande_radio">
                <input
                  disabled={edit}
                  type="radio"
                  name="Demande_Valable"
                  id="Demande_demi_Others"
                  checked={userInfos.Valable.Others}
                  onChange={(e) => {
                    setUserInfos({
                      ...userInfos,
                      Valable: {
                        ...userInfos.Valable,
                        CP: false,
                        RTT: false,
                        CSS: false,
                        Others: true,
                      },
                    });
                  }}
                />
                <label htmlFor="Demande_demi_Others">Autres </label>
              </div>
            </div>
          </div>
          {userInfos.Valable.Others && (
            <div className="demande">
              <label className="label_first" htmlFor="Motif_Autre">
                Motif :{" "}
              </label>
              <input
                disabled={edit}
                type="text"
                name="raisonAutre"
                id="Motif_Autre"
                value={userInfos.raisonAutre}
                onChange={handleChangeTextInput}
              />
            </div>
          )}
        </div>
      </SecondPartFromFormStyled>
      <Separator />
      {edit && (
        <>
          <FirstPartFromFormStyled>
            <h2>À Remplir par le Responsable </h2>
            <div className="name">
              <label className="label_first" htmlFor="FirstName_Valideur">
                Nom{" "}
              </label>
              <div className="name_first_block">
                <div className="name_input">
                  <input
                    type="text"
                    name="FirstName_Valideur"
                    id="FirstName_Valideur"
                    value={userInfos.Valideur.FirstName}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Valideur: {
                          ...userInfos.Valideur,
                          FirstName: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="small_label" htmlFor="FirstName_Valideur">
                    Prénom Valideur{" "}
                  </label>
                </div>
                <div className="name_input">
                  <input
                    type="text"
                    name="LastName_Valideur"
                    id="LastName_Valideur"
                    value={userInfos.Valideur.LastName}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Valideur: {
                          ...userInfos.Valideur,
                          LastName: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="small_label" htmlFor="LastName_Valideur">
                    Nom de famille Valideur{" "}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="label_first" htmlFor="Date_Traitement">
                Date Traitement{" "}
              </label>
              <input
                disabled
                className="date_demande"
                type="date"
                name="Date_Traitement"
                id="Date_Traitement"
                value={userInfos.Valideur.dateTraitement}
                onChange={(e) => {
                  setUserInfos({
                    ...userInfos,
                    Valideur: {
                      ...userInfos.Valideur,
                      dateTraitement: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </FirstPartFromFormStyled>
          <SecondPartFromFormStyled>
            <div className="demande">
              <div>
                <div className="demande_radio">
                  <input
                    type="radio"
                    name="Demande_Valideur"
                    id="Demande_valideur_accord"
                    checked={userInfos.Valideur.accord}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Valideur: {
                          ...userInfos.Valideur,
                          statutValidation: {
                            ...userInfos.Valideur.statutValidation,
                            accord: true,
                            noAccord: false,
                            partialAccord: false,
                          },
                        },
                      });
                    }}
                  />
                  <label htmlFor="Demande_valideur_accord">Accorde</label>
                </div>
                <div className="demande_radio">
                  <input
                    type="radio"
                    name="Demande_Valideur"
                    id="Demande_Valideur_NoAccord"
                    checked={userInfos.Valideur.noAccord}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Valideur: {
                          ...userInfos.Valideur,
                          statutValidation: {
                            ...userInfos.Valideur.statutValidation,
                            accord: false,
                            noAccord: true,
                            partialAccord: false,
                          },
                          DateDebut: "",
                          DateFin: "",
                        },
                      });
                    }}
                  />
                  <label htmlFor="Demande_Valideur_NoAccord">
                    N'accorde pas
                  </label>
                </div>
                <div className="demande_radio">
                  <input
                    type="radio"
                    name="Demande_Valideur"
                    id="Demande_Valideur_Partial"
                    checked={userInfos.Valideur.partialAccord}
                    onChange={(e) => {
                      setUserInfos({
                        ...userInfos,
                        Valideur: {
                          ...userInfos.Valideur,
                          statutValidation: {
                            ...userInfos.Valideur.statutValidation,
                            accord: false,
                            noAccord: false,
                            partialAccord: true,
                          },
                        },
                      });
                    }}
                  />
                  <label htmlFor="Demande_Valideur_Partial">
                    Accord partiel
                  </label>
                  {userInfos.Valideur.statutValidation.partialAccord && (
                    <div style={{ display: "flex", marginTop: "12px" }}>
                      <div className="demande_date">
                        <label htmlFor="Date_Debut_Valideur">Du : </label>
                        <input
                          type="date"
                          name="Date_Debut_Valideur"
                          id="Date_Debut_Valideur"
                          value={userInfos.Valideur.dateDebut}
                          onChange={(e) => {
                            setUserInfos({
                              ...userInfos,
                              Valideur: {
                                ...userInfos.Valideur,
                                dateDebut: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                      <div className="demande_date">
                        <label htmlFor="Date_Fin_Valideur">Au :</label>
                        <input
                          type="date"
                          name="Date_Fin_Valideur"
                          id="Date_Fin_Valideur"
                          value={userInfos.Valideur.dateFin}
                          onChange={(e) => {
                            setUserInfos({
                              ...userInfos,
                              Valideur: {
                                ...userInfos.Valideur,
                                dateFin: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SecondPartFromFormStyled>
          <Separator />
        </>
      )}
      <ButtonStyled type="submit" disabled={loading || error} error={error}>
        {loading
          ? "Soumission..."
          : error
          ? "Erreur lors de la soumission"
          : "Soumettre"}
      </ButtonStyled>
    </FormStyled>
  );
};

export default Form;

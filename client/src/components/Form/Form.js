import axios from "axios";
import { useEffect, useState } from "react";
import {
  ButtonStyled,
  FirstPartFromFormStyled,
  FormStyled,
  SecondPartFromFormStyled,
  Separator,
} from "./form.styled";

const InitialState = {
  FirstName: "",
  LastName: "",
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
};
const Form = () => {
  const [userInfos, setUserInfos] = useState(InitialState);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    setUserInfos({
      ...userInfos,
      Date: new Date().toISOString().split("T")[0],
    });
  }, []);

  const axiosCall = async () => {
    const response = await axios({
      method: "POST",
      url: "traitement.php",
      data: JSON.stringify(userInfos),
    });
    if (response.data.status === "OK") {
      const res = await JSON.parse(response.data.response);
      setDatas(res);
    }
  };

  const handleChangeTextInput = (e) => {
    let { name, value } = e.target;
    setUserInfos({ ...userInfos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosCall();
  };

  if (Object.keys(datas).length > 0) {
    console.log(datas);
  }

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
                    });
                  }}
                />
                <label htmlFor="Demande_demi">Une 1/2 Journée </label>
              </div>
              <div className="demande_radio">
                <input
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
                    });
                  }}
                />
                <label htmlFor="Demande_one_day">Une journée complète </label>
              </div>
              <div className="demande_radio">
                <input
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
            <label className="label_first" htmlFor="Valable">
              Valable pour :{" "}
            </label>
            <div>
              <div className="demande_radio">
                <input
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
                <label htmlFor="Demande_Valable_CP">Conges payés </label>
              </div>
              <div className="demande_radio">
                <input
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
                <label htmlFor="Demande_Valable_CSS">Congé sans soldes </label>
              </div>
              <div className="demande_radio">
                <input
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
        </div>
      </SecondPartFromFormStyled>
      <Separator />
      <ButtonStyled type="submit">Valider</ButtonStyled>
    </FormStyled>
  );
};

export default Form;

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import uuidv4 lib for the unique key of list item
import { v4 as uuidv4 } from 'uuid';
// import fetchCircuit from circuits reducer to get the circuit
import { fetchCircuit } from '../../store/reducers/circuits';
// import patchCircuit from admin reducer to patch a circuit
import { patchCircuit } from '../../store/reducers/admin';
// import componants
import Loader from '../../components/Loader/Loader';
import AdminInput from '../../components/AdminInput/AdminInput';
import AdminTextArea from '../../components/AdminTextArea/AdminTextArea';
// import scss file
import './PatchCircuit.scss';

function PatchCircuit() {
  const user = useSelector((state) => state.settings.user);
  // get the id from the URL
  const { id } = useParams();

  // init dispatch
  const dispatch = useDispatch();
  // state to know if the call API is pending
  const loading = useSelector((state) => state.circuits.loading);
  // state to know the circuit selected to patch
  const circuit = useSelector((state) => state.circuits.oneCircuit);

  // set state for every inputs of every item of the form
  const [namecircuit, setNamecircuit] = useState('');
  const [maintenance, setMaintenance] = useState(false);
  const [parkingAdress, setParkingAdress] = useState('');
  const [description, setDescritpion] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [distance, setDistance] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [urlImage, setUrlImage] = useState(null);
  const [urlReward, setUrlReward] = useState(null);
  const [theme, setTheme] = useState('Préhistoire');
  const [terrain, setTerrain] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [city, setCity] = useState('');
  const [citypostcode, setCitypostcode] = useState(0);
  const [state, setState] = useState('');
  const [statecode, setStatecode] = useState(0);
  const [region, setRegion] = useState('');
  const [duration, setDuration] = useState("moins d'1h");
  const [selectedMobilities, setSelectedMobilities] = useState([]);
  const mobilityOptions = [
    'À pied',
    'À vélo',
    'Poussette',
    'Fauteuil roulant',
    'En voiture',
    'À trottinette',
    'À cheval',
  ];
  const [steps, setSteps] = useState([
    {
      id: uuidv4(),
      order: '',
      question: '',
      answer: '',
      latitude: '',
      longitude: '',
      hint: null,
      paragraph: '',
      transition: null,
    },
  ]);

  // useEffect hook to get the circuit
  useEffect(() => {
    dispatch(fetchCircuit(id));
  }, [dispatch, id]);

  // useEffect hook to set all the input with the value of the circuit information
  useEffect(() => {
    if (circuit) {
      setNamecircuit(circuit.name);
      setMaintenance(circuit.maintenance);
      setParkingAdress(circuit.parking_address);
      setDescritpion(circuit.description);
      setIntroduction(circuit.introduction);
      setDistance(circuit.distance);
      setLatitude(circuit.latitude);
      setLongitude(circuit.longitude);
      setTheme(circuit.theme);
      setTerrain(circuit.terrain);
      setDifficulty(circuit.difficulty);
      setCity(circuit.city);
      setCitypostcode(circuit.postcode);
      setState(circuit.state);
      setStatecode(circuit.number);
      setRegion(circuit.region);
      setDuration(circuit.duration);
      setSelectedMobilities(circuit.mobility);
      setSteps(circuit.step);

      fetch(circuit.url_image)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const file = new File([blob], 'image.jpg', { type: 'image/*' });
          setUrlImage(file);
        });

      fetch(circuit.url_reward)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const file = new File([blob], 'image.jpg', { type: 'image/*' });
          setUrlReward(file);
        });
    }
  }, [circuit]);

  // function to listening change on theme selector
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // function to listening change on difficulty selector
  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value, 10));
  };

  // function to listening change on terrain selector
  const handleTerrainChange = (event) => {
    setTerrain(parseInt(event.target.value, 10));
  };

  // function to listening change on duration selector
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  // function to listening change on mobilities checkboxes
  const handleCheckboxChange = (option) => {
    if (selectedMobilities.includes(option)) {
      setSelectedMobilities(
        selectedMobilities.filter((item) => item !== option)
      );
    } else {
      setSelectedMobilities([...selectedMobilities, option]);
    }
  };

  // function to add a step to the form
  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: uuidv4(),
        order: '',
        question: '',
        answer: '',
        latitude: '',
        longitude: '',
        hint: null,
        paragraph: '',
        transition: null,
      },
    ]);
  };

  // function to remove a step from the form
  const removeStep = (idStep) => {
    const newSteps = steps.filter((step) => step.id !== idStep);
    setSteps(newSteps);
  };

  // function to listening the change on every input of a step form
  const handleInputChange = (event, idStep) => {
    const { name, value } = event.target;
    const newSteps = steps.map((step) => {
      if (step.id === idStep) {
        return { ...step, [name]: value };
      }
      return step;
    });
    setSteps(newSteps);
  };

  // function to listening change on image input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUrlImage(file);
    }
  };

  // function to listening change on reward's image input
  const handleRewardChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUrlReward(file);
    }
  };

  // function to get all the information of all input and create an object to send to the back servor
  const handleSubmit = async (event) => {
    event.preventDefault();

    const stepsData = steps.map((step) => ({
      order: parseInt(step.order, 10),
      question: step.question,
      answer: step.answer,
      latitude: parseFloat(step.latitude),
      longitude: parseFloat(step.longitude),
      hint: step.hint,
      paragraph: step.paragraph,
      transition: step.transition,
    }));

    const updatedData = {
      name: namecircuit,
      parking_address: parkingAdress,
      description,
      maintenance,
      introduction,
      distance: parseInt(distance, 10),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      image: urlImage,
      reward: urlReward,
      theme,
      difficulty: parseInt(difficulty, 10),
      terrain: parseInt(terrain, 10),
      city,
      city_postcode: parseInt(citypostcode, 10),
      state,
      state_code: parseInt(statecode, 10),
      region,
      duration,
      mobility: selectedMobilities,
      steps: stepsData,
    };

    dispatch(patchCircuit({ id, updatedData }));
  };

  // if API call is pending, display Loader componant
  if (loading) {
    return <Loader />;
  }

  // if there's no circuit, return an error message
  if (!circuit) {
    return <h1>Pas de circuit trouvé</h1>;
  }

  return (
    <>
      <div className="patchcircuit">
        <h1 className="patchcircuit-title">Modifier un circuit :</h1>
        <form onSubmit={handleSubmit}>
          <section className="patchcircuit-infos">
            <section className="patchcircuit-infos_part">
              <AdminInput
                name="name"
                type="text"
                label="Nom du circuit"
                placeholder="Entrer le nom du circuit"
                onChange={(e) => setNamecircuit(e.target.value)}
                value={namecircuit}
                required
              />
              <AdminInput
                name="maintenance"
                type="checkbox"
                label="Maintenance"
                onChange={() => setMaintenance(!maintenance)}
                checked={maintenance}
              />
              <AdminTextArea
                name="parking_address"
                label="L'adresse du parking"
                placeholder="Entrer l'adresse du parking"
                onChange={(e) => setParkingAdress(e.target.value)}
                value={parkingAdress}
                required
              />
              <AdminTextArea
                name="description"
                label="Description du circuit"
                placeholder="Entrer une description du circuit"
                onChange={(e) => setDescritpion(e.target.value)}
                value={description}
                required
              />
              <AdminTextArea
                name="introduction"
                label="Introduction du circuit"
                placeholder="Entrer une introduction sur le circuit"
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
                required
              />
              <AdminInput
                name="distance"
                type="number"
                label="Distance"
                placeholder="Entrer la distance du circuit"
                onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                value={distance}
                required
              />
              <AdminInput
                name="latitude"
                type="number"
                label="Latitude de départ"
                placeholder="Entrer la latitude du circuit"
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
                required
              />
              <AdminInput
                name="longitude"
                type="number"
                label="Longitude de départ"
                placeholder="Entrer la longitude du circuit"
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
                required
              />
              <label htmlFor="theme">Thème</label>
              <select
                name="theme"
                id="theme"
                value={theme}
                onChange={handleThemeChange}
                required
              >
                <option value="Préhistoire">Préhistoire</option>
                <option value="Patrimoine Religieux">
                  Patrimoine Religieux
                </option>
                <option value="Curiosités">Curiosités</option>
                <option value="Architecture">Architecture</option>
                <option value="Faune">Faune</option>
                <option value="Flore">Flore</option>
                <option value="Gallo-Romain">Gallo-Romain</option>
                <option value="Histoire Locale">Histoire Locale</option>
                <option value="Insolite">Insolite</option>
                <option value="Médiéval">Médiéval</option>
                <option value="Musée">Musée</option>
                <option value="Street Art">Street Art</option>
              </select>
              <label htmlFor="difficulty">Difficulté</label>
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
                onChange={handleDifficultyChange}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label htmlFor="terrain">Type de terrain</label>
              <select
                name="terrain"
                id="terrain"
                value={terrain}
                onChange={handleTerrainChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </section>
            <section className="patchcircuit-infos_part">
              <AdminInput
                name="city"
                type="text"
                label="Ville"
                placeholder="Entrer la ville"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <AdminInput
                name="city_postcode"
                type="number"
                label="Code postal"
                placeholder="Entrer le code postale"
                onChange={(e) => setCitypostcode(parseInt(e.target.value, 10))}
                value={citypostcode}
              />
              <AdminInput
                name="state"
                type="text"
                label="Département"
                placeholder="Entrer le département"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
              <AdminInput
                name="state_code"
                type="number"
                label="Numéro de département"
                placeholder="Entrer le numéro de département"
                onChange={(e) => setStatecode(parseInt(e.target.value, 10))}
                value={statecode}
              />
              <AdminInput
                name="region"
                type="text"
                label="Region"
                placeholder="Entrer la région"
                onChange={(e) => setRegion(e.target.value)}
                value={region}
              />
              <label htmlFor="duration">Durée</label>
              <select
                name="duration"
                id="duration"
                value={duration}
                onChange={handleDurationChange}
              >
                <option value="moins d'1h">moins d&apos;1h</option>
                <option value="1h-2h">1h-2h</option>
                <option value="2h-3h">2h-3h</option>
                <option value="3h-4h">3h-4h</option>
                <option value="4h-5h">4h-5h</option>
                <option value="5h-6h">5h-6h</option>
              </select>
              <h4>Options de Mobilité</h4>
              {mobilityOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMobilities.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}
              <section className="patchcircuit-picture">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRewardChange}
                />
              </section>
            </section>
          </section>
          <section className="patchcircuit-step-container">
            {steps.map((step) => (
              <div className="patchcircuit-step" key={step.id}>
                <AdminInput
                  name="order"
                  label="Ordre de l'étape"
                  type="number"
                  onChange={(e) => handleInputChange(e, step.id)}
                  value={step.order}
                />
                <AdminTextArea
                  name="question"
                  label="Question"
                  placeholder="Entrer la question"
                  value={step.question}
                  onChange={(e) => handleInputChange(e, step.id)}
                  required
                />
                <AdminInput
                  name="answer"
                  type="number"
                  label="Réponse"
                  placeholder="Entrer la réponse"
                  value={step.answer}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <AdminInput
                  name="latitude"
                  type="number"
                  label="Latitude"
                  placeholder="Entrer la latitude"
                  value={step.latitude}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <AdminInput
                  name="longitude"
                  type="number"
                  label="Longitude"
                  placeholder="Entrer la longitude"
                  value={step.longitude}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <AdminTextArea
                  name="hint"
                  label="Indice"
                  placeholder="Entrer l'indice"
                  value={step.hint || ''}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <AdminTextArea
                  name="paragraph"
                  label="Paragraphe"
                  placeholder="Entrer le paragraphe de l'étape"
                  value={step.paragraph}
                  onChange={(e) => handleInputChange(e, step.id)}
                  required
                />
                <AdminTextArea
                  name="transition"
                  label="Transition"
                  placeholder="Entrer la transition"
                  value={step.transition || ''}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <button type="button" onClick={() => removeStep(step.id)}>
                  Supprimer l&apos;étape
                </button>
              </div>
            ))}
          </section>
          <section className="patchcircuit-button">
            <button
              className="patchcircuit-button_addstep"
              type="button"
              onClick={addStep}
            >
              Ajouter une étape
            </button>
            <button className="patchcircuit-button_patchcircuit" type="submit">
              Modifier le circuit
            </button>
          </section>
        </form>
      </div>
      {user?.role !== 'admin' && <Navigate to="/" />}
    </>
  );
}

export default PatchCircuit;

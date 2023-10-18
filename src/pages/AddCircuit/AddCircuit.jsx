import { useState } from 'react';
// import uuidv4 for unique key of list
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// import some component for the page building
import AdminInput from '../../components/AdminInput/AdminInput';
import AdminTextArea from '../../components/AdminTextArea/AdminTextArea';

// import createCircuit from admin reducer for create a circuit
import { createCircuit } from '../../store/reducers/admin';

// import scss file for this componant
import './AddCircuit.scss';

function AddCircuit() {
  const user = useSelector((state) => state.settings.user);

  // setting dispatch
  const dispatch = useDispatch();

  /* Create a state for every input here that will be update onChange and send to the createCircuit dispatch when the admin user will submit */
  const [namecircuit, setNamecircuit] = useState('');
  const [parkingAdress, setParkingAdress] = useState('');
  const [description, setDescritpion] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [distance, setDistance] = useState(0);
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

  // function to add a new step form to the list
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

  // function to delete a step form to the list
  const removeStep = (id) => {
    const newSteps = steps.filter((step) => step.id !== id);
    setSteps(newSteps);
  };

  // function to listening change on every input of step form
  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    const newSteps = [...steps];
    const index = newSteps.findIndex((step) => step.id === id);
    if (index !== -1) {
      newSteps[index][name] = value;
      setSteps(newSteps);
    }
  };

  // function to listening change on checkbox' mobilites
  const handleCheckboxChange = (option) => {
    if (selectedMobilities.includes(option)) {
      setSelectedMobilities(
        selectedMobilities.filter((item) => item !== option)
      );
    } else {
      setSelectedMobilities([...selectedMobilities, option]);
    }
  };

  // function to listening change on difficulty's selector
  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value, 10));
  };

  // function to listening change on terrain's selector
  const handleTerrainChange = (event) => {
    setTerrain(parseInt(event.target.value, 10));
  };

  // function to listening change on theme's selector
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // function to listening change on duration's selector
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  // function to handle change on first picture input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUrlImage(file);
    }
  };

  // function to handle change on reward picture input
  const handleRewardChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUrlReward(file);
    }
  };

  // function to get every information on every inputs and create a new object data to send to the API with the dispatch function
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

    const formData = {
      name: namecircuit,
      parking_address: parkingAdress,
      description,
      maintenance: false,
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

    dispatch(createCircuit(formData));
  };

  return (
    <>
      <div className="addcircuit">
        <h1 className="addcircuit-title">Ajout d&apos;un circuit</h1>
        <form onSubmit={handleSubmit}>
          <section className="addcircuit-infos">
            <section className="addcircuit-infos_part">
              <AdminInput
                name="name"
                type="text"
                label="Nom du circuit"
                placeholder="Entrer le nom du circuit"
                onChange={(e) => setNamecircuit(e.target.value)}
                value={namecircuit}
                required
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
                onChange={(e) => setDistance(e.target.value, 10)}
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
            <section className="addcircuit-infos_part">
              <AdminInput
                name="city"
                type="text"
                label="Ville"
                placeholder="Entrer la ville"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
              <AdminInput
                name="city_postcode"
                type="number"
                label="Code postal"
                placeholder="Entrer le code postam"
                onChange={(e) => setCitypostcode(parseInt(e.target.value, 10))}
                value={citypostcode}
                required
              />
              <AdminInput
                name="state"
                type="text"
                label="Département"
                placeholder="Entrer le département"
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
              />
              <AdminInput
                name="state_code"
                type="number"
                label="Numéro de département"
                placeholder="Entrer le numéro de département"
                onChange={(e) => setStatecode(parseInt(e.target.value, 10))}
                value={statecode}
                required
              />
              <AdminInput
                name="region"
                type="text"
                label="Region"
                placeholder="Entrer la région"
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                required
              />
              <label htmlFor="duration">Durée</label>
              <select
                name="duration"
                id="duration"
                value={duration}
                onChange={handleDurationChange}
                required
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
                    className="m-2"
                    type="checkbox"
                    value={option}
                    checked={selectedMobilities.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}
              <section className="addcircuit-picture">
                <h3 className="addcircuit-picture_subtitle">
                  Image d&apos;introduction
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <h3 className="addcircuit-picture_subtitle">
                  Image de la récompense
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRewardChange}
                  required
                />
              </section>
            </section>
          </section>
          <h4>Etapes :</h4>
          <section className="addcircuit-step-container">
            {steps.map((step) => (
              <div className="addcircuit-step" key={step.id}>
                <AdminInput
                  key={step.id}
                  name="order"
                  label="Ordre de l'étape"
                  type="number"
                  onChange={(e) => handleInputChange(e, step.id)}
                  value={step.order}
                  required
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
                  required
                />
                <AdminInput
                  name="latitude"
                  type="number"
                  label="Latitude"
                  placeholder="Entrer la latitude"
                  value={step.latitude}
                  onChange={(e) => handleInputChange(e, step.id)}
                  required
                />
                <AdminInput
                  name="longitude"
                  type="number"
                  label="Longitude"
                  placeholder="Entrer la longitude"
                  value={step.longitude}
                  onChange={(e) => handleInputChange(e, step.id)}
                  required
                />
                <AdminTextArea
                  name="hint"
                  label="Indice"
                  placeholder="Entrer l'indice"
                  value={step.hint}
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
                  value={step.transition}
                  onChange={(e) => handleInputChange(e, step.id)}
                />
                <button
                  className="addcircuit-step_delete"
                  type="button"
                  onClick={() => removeStep(step.id)}
                >
                  Supprimer l&apos;étape
                </button>
              </div>
            ))}
          </section>
          <section className="addcircuit-button">
            <button
              className="addcircuit-button_addstep bg-white"
              type="button"
              onClick={addStep}
            >
              Ajouter une étape
            </button>
            <button
              className="addcircuit-button_addcircuit bg-primary text-white"
              type="submit"
            >
              Ajouter le circuit
            </button>
          </section>
        </form>
      </div>
      {user?.role !== 'admin' && <Navigate to="/" />}
    </>
  );
}

export default AddCircuit;

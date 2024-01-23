import React, { useState, useContext} from 'react';
import "leaflet/dist/leaflet.css";

import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = props => {
  const auth = useContext (AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => {
    console.log('Close button clicked');
    setShowMap(false); 
  };
  const showDeleteWarningHandler = (event)=> {
      event.preventDefault();
      setShowConfirmModal(true);
  }

  const cancelDeleteHandler = (event) => {
    event.preventDefault();
        setShowConfirmModal(false);
  }

  const confirmDeleteHandler = (event) => {
    setShowConfirmModal(false);
    event.preventDefault();
        console.log("Deleting...")
  }


  return (
    <React.Fragment>
      <Modal show = {showMap} onCancel = {closeMapHandler} header = {props.address}
       content Class = "place-item__model-content" 
       footerClass = "place-item__modal-actions"
       footer = {<Button on Click = {closeMapHandler}>Close</Button>} >
       <Map/>
       </Modal>
       <Modal 
       show = {showConfirmModal}
       onCancel = {cancelDeleteHandler}
       header = "Deleting!" footerClass = "place-item__modal-actions" 
       footer = {
        <React.Fragment>
          <Button inverse onClick = {cancelDeleteHandler}>CANCEL</Button>
          <Button danger onClick = {confirmDeleteHandler}>DELETE</Button>
        </React.Fragment>

       }>
        <p> Are you sure you want to Delete? Please note that it can't be undone thereafter.</p>
       </Modal>
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse onClick = {openMapHandler}>VIEW ON MAP</Button>
          {auth.isLoggedIn && ( <Button to ={`/places/${props.id}`}>EDIT</Button> )}
          {auth.isLoggedIn && (<Button danger onClick = {showDeleteWarningHandler}>DELETE</Button> )}
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default PlaceItem;

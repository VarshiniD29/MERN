import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Eiffel Tower',
    description: 'The most popular place of Europe',
    imageUrl: 'https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/16:9/w_2560%2Cc_limit/GettyImages-468366251.jpg',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    location: {
      lat: 48.85884862007615,
      lng: 2.2941376234832527
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {
    const userId = useParams().userId 
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator ===userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
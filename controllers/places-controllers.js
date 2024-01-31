const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
        id: 'p1', 
        title: 'Eiffel Tower',
        description: 'Beautiful Place of Europe',
        location: {
            lat : 48.85855715635401,  
            lng : 2.2945885884500594
        }, 
        address : ' hsdgk',
        creator: 'u1'
    }
];

const getPlaceByID = (req,res,next)=> {
    const placeId = req.params.pid;  // {pid : 'p1}
    const place = DUMMY_PLACES.find(p=> {
        return p.id === placeId;
    });

    if(!place) {
      throw new HttpError('Could not find a place for the provided id', 404);
    }

    res.json({place}); // {place} automatically taken as {place: place}

};

//alternatives for above
// 1. function getPlaceById() {........}
// const getPlaceById = function() {.....}

const getPlacesbyUserId = (req,res,next)=> {
    const userId = req.params.uid;  // {pid : 'p1}
    const places = DUMMY_PLACES.filter(p=> {
        return p.creator === userId;
    });

    if(!places || places.length ===0) {
        return next(
       new HttpError('Could not find a places for the provided user id',404)
        );
    }

    res.json({places}); // {place} automatically taken as {place: place}

};

const createPlace = (req, res,next) => {
    const { title, description, coordinates, address, creator} = req.body; //const title = req.body.title;
    const createdPlace = {
        id : uuidv4(),
        title, 
        description,
        location : coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

    res.status(201).json({place: createdPlace})

};

const updatePlace = (req,res,next) => {
    const { title, description} = req.body; //const title = req.body.title;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p=> p.id ===placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p=> p.id ===placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatePlace});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted a place.'});
};

exports.getPlaceByID = getPlaceByID;
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
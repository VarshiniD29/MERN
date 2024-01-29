const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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

const getPlacebyUserId = (req,res,next)=> {
    const userId = req.params.uid;  // {pid : 'p1}
    const place = DUMMY_PLACES.find(p=> {
        return p.creator === userId;
    });

    if(!place) {
        return next(
       new HttpError('Could not find a place for the provided user id',404)
        );
    }

    res.json({place}); // {place} automatically taken as {place: place}

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

exports.getPlaceByID = getPlaceByID;
exports.getPlacebyUserId = getPlacebyUserId;
exports.createPlace = createPlace;
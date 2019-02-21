import * as express from 'express';
import UserProfile from "../models/schemas/user-profile";
import Location from "../models/schemas/location";
import { ILocation } from "../models/schemas/location";
import Line from "../models/schemas/line";
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Verify token
router.use('/', async (req, res, next) => {
    try {
        await jwt.verify(req.query.token, keys.token.secret);
    } catch (e) {
        return res.status(401).json({
            title: 'Not Authenticated',
            message: 'Token couldn\'t be identified'
        });
    }
    next();
});

router.post('/new/', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let userProfile;
    let locationList = [];
    try {
        userProfile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    try {
       locationList = await req.body.locations.forEach(async (loc: ILocation, index: number) => {
            let tempLoc = new Location({
                latitude: loc.latitude,
                longitude: loc.longitude,
                elevation: loc.elevation,
                lineIndex: index,
                distanceFromStart: loc.distanceFromStart,
                distanceFromLast: loc.distanceFromLast
            });
           tempLoc = await tempLoc.save();
           locationList.push(tempLoc);
       });
    } catch (e) {

    }
    let line = new Line({
        locations: locationList,
        name: req.body.name,
        username: userProfile.username,
        sport: req.body.sport,
        discipline: req.body.discipline,
        timestamp: new Date()
    });
    try {
        line = await line.save();
        userProfile.lines.push(line);
        await userProfile.save();
    } catch (e) {

    }
    return res.status(201).json({
        message: 'Line saved',
        obj: line
    });
});

// router.post('/newline/', (req, res, next) => {
//     const decoded = jwt.decode(req.query.token);
//     Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
//         if (profile_err) {
//             return res.status(500).json({
//                 title: 'Error finding user profile',
//                 error: profile_err
//             });
//         }
//         if (!user_profile) {
//             return res.status(500).json({
//                 title: 'Error finding user profile',
//                 error: {message: 'An error occurred regarding profile'}
//             });
//         }
//         const markerlist = [];
//         for (let i = 0; i<req.body.markers.length; i++) {
//             const location = new Location({
//                 lat: req.body.markers[i].location.lat,
//                 lng: req.body.markers[i].location.lng,
//                 elevation: req.body.markers[i].location.elevation,
//                 resolution: req.body.markers[i].location.resolution
//             });
//             const marker = new Marker({
//                 name: req.body.markers[i].name,
//                 index: req.body.markers[i].index,
//                 location: location,
//                 distance_from_start: req.body.markers[i].distance_from_start
//             });
//             markerlist.push(marker);
//         }
//
//         const line = new Line({
//             user_id: body.user_id,
//             name: req.body.name,
//             line_type: req.body.line_type,
//             markers: markerlist,
//             timestamp: new Date(),
//             danger_level: req.body.danger_level,
//             tree_level: req.body.tree_level,
//             rock_level: req.body.rock_level,
//             cliff_level: req.body.cliff_level
//         });
//
//         line.save((err, result) => {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'Couldn\'t save line',
//                     error: err
//                 });
//             }
//             user_profile.lines.push(result);
//             saveMarkerList(markerlist, (save_success) => {
//                 if (!save_success) {
//                     return res.status(500).json({
//                         title: 'An error occurred',
//                         error: {message: 'An error occurred saving the map markers'}
//                     });
//                 }
//                 user_profile.save((err, profile_result) => {
//                     if (err) {
//                         return res.status(500).json({
//                             title: 'An error occurred',
//                             error: err
//                         });
//                     }
//                     return res.status(201).json({
//                         message: 'Line saved',
//                         obj: result
//                     });
//                 });
//             });
//         });
//     });
// });

module.exports = router;
const Room = require('../models/room');
const Tenant = require('../models/tenant');
const jwt = require('jsonwebtoken');

module.exports.index = async (req, res) => {
    jwt.verify(req.token, 'mysecretkey', async (err, authData) => {
        if(err){
            res.send("error while verifying token");
        }
        else{
            const rooms = await Room.find({});
            res.json({
                rooms: rooms
            });
        }
    });

}

module.exports.createRoom = async (req, res) => {
    
    //res.send(room);

    jwt.verify(req.token, 'mysecretkey', async (err, authData) => {
        if(err){
            res.send("error while verifying token");
        }
        else{
            const {name, address, description, bhk, bathroom, propertyType, smoking, alcohol, pets, vegetarian, noOfTenants, amenities, preferences, rentPrice, tenantDetails} = req.body;
            console.log("Tenant details: " + tenantDetails);
            
            const room = new Room({
                name, 
                address, 
                description, 
                bhk, 
                bathroom, 
                propertyType, 
                smoking, 
                alcohol, 
                pets, 
                vegetarian, 
                noOfTenants, 
                amenities, 
                preferences, 
                rentPrice, 
                tenantDetails
            });
            room.user = authData.user;

           
            await room.save();
            console.log(room);
            res.json({
                createdRoom: room
            });
        }
    });

}

module.exports.showRoom = async (req, res) => {
    jwt.verify(req.token, 'mysecretkey', async (err, authData) => {
        if(err){
            res.send("error while verifying token");
        }
        else{
                const room = await Room.findById(req.params.id);
                if (!room) {
                    res.send("Room not listed");
                }
                else{
                    res.json({
                        foundRoom: room
                    });
                }
        }
    });
    
}



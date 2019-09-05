// var async =  require('async');

//

function imagine(req, res) {
    let roomID = req.params.id;
    // let roomName = roomID.replace(/--/g, ' ');
    let roomName = 124;
    async.waterfall([
        function checkIfRoomExists(cb){
        cb('error', roomName);
        },
        function checkIfMember(x, cb) {
        console.log(x);
        cb('error', 'Value 22');
        },
        function setCurrentRoom(y, cb) {
        console.log(y);
        cb('error', 'Value 333');
        },
        function pickMessages(z, cb) {
        console.log(z);
        cb('error');
        },
    ], function (error) {
        if (error) { console.log('Something was wrong!'); }
        else console.log('Done!');
    });
};
// async.waterfall([
//         function(callback){
//             // code a
//             callback(null, 'a', 'b')
//         },
//         function(arg1, arg2, callback){
//             // arg1 is equals 'a' and arg2 is 'b'
//             // Code c
//             callback(null, 'c')
//         },
//         function(arg1, callback){
//             // arg1 is 'c'
//             // code d
//             callback(null, 'd');
//         }], function (err, result) {
//         // result is 'd'
//     }
// )
// Now going back to your example, using the async waterfall method you could restructure your code to
//
// async.waterfall([
//     function(callback) {
//         // code a
//         var test = db.get('test');
//         test.find({}, function(err, docs) {
//             if(err) callback(err);
//
//             console.log(docs);  // OUTPUT OK
//             callback(null, docs);
//         });
//     }], function(err, result) {
//     if(err) callback(err);
//     console.log(result);  // OUTPUT OK
// }
// ])
// function _function1 (cb) {
//         Room.findOne({name: roomName}, (error, chosenRoom) => {
//             let error = function() {if(!chosenRoom) {res.render('error', {error: 'no such page!'})} }       callback (null, something);
//     })
//     cb()
// }
//
// function _function2 (something, callback) {
//     return function (callback) {
//         var somethingelse = function () { // do something here };
//             callback (err, somethingelse);
//         }
//     }
//
//     function _function3 (something, callback) {
//         return function (callback) {
//             var somethingmore = function () { // do something here };
//                 callback (err, somethingmore);
//             }
//         }

let currentUser;
        function getRoom(req, res) {
            let roomID = req.params.id;
            let roomName = roomID.replace(/--/g, ' ');
            Room.findOne({name: roomName}, checkIfRoom)
        }
function checkIfRoom(error, chosenRoom) {
    if(!chosenRoom) {res.render('error', {error: 'no such page!'})}
    else {
        Room.findOne({name: roomName, members: {"$in": currentUser }}, openRoom)
    }
}

function openRoom(error, roomUser) {
    if (!roomUser) {
        User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}});
        res.render('joinRoom');}
    else {
        User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}}, findMessagesInRoom);
    }
}

function findMessagesInRoom(e, newcomer) {
    currentRoom = newcomer.currentRoom;
    console.log('newcomer name and room:', newcomer.username, newcomer.currentRoom);
    Message.find({room: currentRoom}, retrieveMessages).limit(20).sort({$natural: -1});
}

function retrieveMessages(err, messages) {
            logger.verbose(`SESSION: ${currentRoom}`);
            messagesForPug = messages.map(data => ({
                'message': data.text,
                'user': `${data.from}: `,
                'time': data.timestamp.toLocaleTimeString(),
            }));
            // logger.verbose(`message list created`);
            res.render('room', {title: 'Room', messages: messagesForPug, roomName: currentRoom, members: `MEMBERS: ${chosenRoom.members.length}`, user: currentUser})

        }
function imagine(req, res) {
    let roomID = 'aaaaaaaaaaaaa';
    let roomName = roomID.replace(/--/g, ' ');
    let error;
    async.waterfall([


        function checkIfRoomExists(cb){
            Room.findOne({name: roomName}, (error, chosenRoom) => {
                if (!chosenRoom) {
                    error = res.render('error', {error: 'no such page!'})}
            })
            cb(error, roomName)},

        function checkIfMember(x, cb) {
            console.log(x);
            Room.findOne({name: x, members: {"$in": currentUser }}, (error, roomUser) => {
                    if(!roomUser) {
                        User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}});
                        error = res.render('joinRoom');}
                    cb(error, 'Value 22');
                },
                function setCurrentRoom(y, cb) {
                    console.log(y);
                    cb(null, 'Value 333');
                },
                function pickMessages(z, cb) {
                    console.log(z);
                    cb(null);
                },
        ], function (error) {
                if (error) { console.log('Something was wrong!'); }
                else console.log('Done!');
            });
        };


// function getRoom(req) {
//     let roomID = req.params.id;
//     let roomName = roomID.replace(/--/g, ' ');
//     Room.findOne({name: roomName}, checkIfRoom())
// }
// function checkIfRoom(error, chosenRoom, next) {
//     if(!chosenRoom) {res.render('error', {error: 'no such page!'})}
//     else {
//         Room.findOne({name: roomName, members: {"$in": currentUser }}, openRoom())
//     }
//     next();
// }
//
// function openRoom(error, roomUser, next) {
//     if (!roomUser) {
//         User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}});
//         res.render('joinRoom');}
//     else {
//         User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}}, findMessagesInRoom());
//     }
//     next();
// }
//
// function findMessagesInRoom(e, newcomer, next) {
//     currentRoom = newcomer.currentRoom;
//     console.log('newcomer name and room:', newcomer.username, newcomer.currentRoom);
//     Message.find({room: currentRoom}, retrieveMessages()).limit(20).sort({$natural: -1});
//     next();
// }
//
// function retrieveMessages(err, messages, next) {
//     logger.verbose(`SESSION: ${currentRoom}`);
//     messagesForPug = messages.map(data => ({
//         'message': data.text,
//         'user': `${data.from}: `,
//         'time': data.timestamp.toLocaleTimeString(),
//     }));
//     // logger.verbose(`message list created`);
//     console.log('came till the end');
//     res.render('room', {title: 'Room', messages: messagesForPug, roomName: currentRoom, members: `MEMBERS: ${chosenRoom.members.length}`, user: currentUser})
//
// }

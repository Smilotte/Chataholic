const db = require('../database');

class Profile {

    static retrieveAll (parms, callback) {
        db.query('SELECT Nickn,Sex,DATE_FORMAT(Dob,"%Y-%m-%d") AS Dob,Personality,Hobby,Sport,Fav FROM c10_friends.Profile WHERE UserId =?', [parms], (err, res) => {
            if (err) {return callback(err)};
            return callback(res);

        });
    }

    static amend (parms, callback) {
        db.query('UPDATE c10_friends.Profile SET Nickn=?, Sex=?, Dob=?, Hobby=?, Sport=?, Fav=? WHERE UserId =?',
            [parms[1], parms[2], parms[3], parms[4], parms[5], parms[6], parms[0]],
            (err, res) => {
                if (err) {return callback(err)};
                return callback(res);

            });
    }

    static addTest(parms, callback) {
        db.query('UPDATE c10_friends.Profile SET Personality=? WHERE UserId =?', [parms[1], parms[0]],
            (err, res) => {
                if (err) { return callback(err) };
                return callback(res);
            });
    }


    // static addOrUpdatePer(parms, callback) {

    //   db.query('SELECT * FROM c10_friends.Profile WHERE UserId =?', [parms[0]], (err, res) => {
    //       if (err) {
    //           return callback(err)
    //       };

    //       if (res.length) {
    //           db.query('UPDATE c10_friends.Profile SET Personality=? WHERE UserId =?', [parms[1], parms[0]],
    //               (err, res) => {
    //                   if (err) { return callback(err) };
    //                   return callback('200');

    //               });
    //       } else {
    //           return callback('user not exist')

    //           // db.query('INSERT INTO c10_friends.Profile (UserId, Nickn, Sex, Age, Dob, Personality, Hobby, Sport, Fav) VALUES (?,"","",NULL,NULL,?,"","","")',
    //           //     [parms], (err, res) => {
    //           //         if (err) {
    //           //             return callback(err)
    //           //         };

    //           //         return callback('200')

    //           //     })
    //       }
    //   });
    // }

}

module.exports = Profile;

import db from '../db';

export default {
    index: function () {
        db.select().from('users').then(users => {
            console.log("users: " + users);
            return users;  
        })
        .catch(err => {
            console.log(err);
        });
    },

    get: function (id) {
        db('users').where('id', id);
    },

    create: function (username, password) {
        db
            .insert({'username': username, password: password})
            .into('users')
            .then(users => {
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    },


    delete: function (username) {
        db('users').where('id', id).delete();
    }
};
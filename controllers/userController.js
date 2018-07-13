

module.exports = {
    getInfo: function(req,res){
        console.log("We connected");
        if(req.user){
            //assumsing sessions works
            res.json(req.user);
        }else {
            /* res.json('User is not logged in..');

                Im assuming this it how it should got is sessionStore is working correctly
                but commenting to put dummy data
                */
            var user = {
                id : 123456789,
                firstname: "Michael",
                lastname: "Tran",
                username: "MyUserName",
                email: "myEmail@gmail.com",
                password: "MyPassword123",
                balance: 123456465321,
                emailVerified: true, 
                mongo_id: 1445563,
                account_length : 20

            };
            var pet = {
                pet_type: "Lion",
                pet_name: "Leo"
            };

            var data = {
                user: user,
                pet: pet
            };
            res.json(data);
        }
    },
    checkPassword: function(req,res){
        console.log(req.body);
        console.log('checking password');
        console.log('look for user in database given info...');
        var fakeData = {
            current_email: 'email@gmail.com',
            password_input: 'somepassword'
        };
        console.log(data);
        console.log('if password match return data');
        var data = {
            message : 'Match'
        };
        console.log(data);
        console.log('If not match');
        var data = {
            message : 'Not Matching'
        };
        console.log(data);
        res.json(data);
    },
    updateEmail: function(req,res){
        console.log(req.body);
        console.log('This how it may look ');
        var fakeData = {
            current_email: 'email@gmail.com',
            new_email: 'email@gmail.com'
        };
        console.log(fakeData);
        console.log("Update User Email");
        res.json("Update Email Route");
    },
    updatePassword: function(req,res){
        console.log(req.body);
        console.log('This how it may look ');
        var fakeData = {
            current_email: 'email@gmail.com',
            current_password: 'password in database',
            new_password: 'new password'
        };
        console.log(fakeData);
        console.log('double check password again');
        console.log("Update user password");
        res.json("update password route");
    },
    updateUsername: function(req,res){
        console.log(req.body);
        console.log('This how it may look ');
        var fakeData = {
            current_email: 'email@gmail.com',
            current_password: 'password in database',
            new_username: 'new username'
        };
        console.log(fakeData);
        console.log('double check password again');
        console.log("Update user username");
        res.json("update username route");
    },
    toggleTips: function(req,res){
        console.log(req.body);
        console.log('toggle tips');
        res.json('toggle tips route');
    }
}
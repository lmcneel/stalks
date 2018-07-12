

module.exports = {
    getInfo: function(req,res){
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
    }
}
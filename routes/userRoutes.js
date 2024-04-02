
const router = require("express").Router();
const User = require('../models/UserPage')
const Team = require('../models/Team')


// Get All Users

router.get('/users', async(req, res) => {
  
    try{
       
        // Filter

        if(req.query.gender || req.query.domain || req.query.available || req.query.search ){

            let available = null
        if(req.query.available === 'true'){
            available = true
        }
    
            const filters = {
                gender: req.query.gender || '',
                domain: req.query.domain || '',
                available: available || null,
            
            };

            

            // Build filter object for MongoDB query
            const filterQuery = {};
            for (const key in filters) {
                if (filters[key]) { 
                    filterQuery[key] = filters[key];
                }
            }

            // Search

            let searchName = req.query.search.charAt(0).toUpperCase() + req.query.search.slice(1)

            let userSearch = {};
                if (searchName) {
                    userSearch.last_name = { $regex: new RegExp('^' + searchName, 'i') };
                }
    

    

            // Retrieve filtered users from the database

            let merged = {...filterQuery , ...userSearch}

            const users = await User.find(merged);
    
            res.json(users);

        }
        else {

            // Normal Pagination

            
            const pageSize = 20; // Number of users to retrieve per page
            const pageNumber = parseInt(req.query.page || 1); // Get page number from query parameter, default to 1 if not provided
            
            
            // Find users based on pagination parameters
            const users = await User.find().limit(pageSize * pageNumber);
          
            res.json(users);
            
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Create New User


router.post('/users/add', async(req, res) => {

    const newTeam = new User(req.body)

    
    try{

        const savedTeam = await newTeam.save()
        res.status(200).json('Team Added!')

    }catch(err){
     console.log(err)
    }

})


// Update A User

router.put("/users/:id", async (req, res) => {


    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err)
    }


})


// Getting A Single User

router.get("/find/:id", async (req, res) => {
    try {
        const user = await  User.findById(req.params.id);

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err)
    }
})

// Team

router.post('/team/add', async(req,res) => {

    const newTeam = new Team(req.body)

    try{

        const savedTeam = await newTeam.save()
        res.status(200).json('Team Added!')

    }catch(err){
     console.log(err)
    }
})

router.get('/teams', async(req,res) => {

    
    try{

        const teams = await Team.find()
                res.status(200).json(teams)

    }catch(err){
     console.log(err)
    }
})

module.exports = router;



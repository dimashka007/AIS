const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/marks/', async (req, res) => {

    
    const edu = await loadMarksCollection();
    const current = edu.db('department').collection((req.query.user + req.query.type).split('.').join('').split(' ').join(''));
    res.send(await current.find({}).toArray());
    edu.close();
});


router.post('/api/marks', async (req, res) => {
    const edu = await loadMarksCollection();
    const current = edu.db('department').collection((req.body.collection).split('.').join('').split(' ').join(''));
    await current.insertOne({
        name: req.body.name,
        hours: req.body.hours
    });
    res.status(201).send();
    edu.close();

});

router.post('/api/marks/date', async (req, res) => {
    const edu = await loadMarksCollection();
    const current = edu.db('department').collection((req.body.name + req.body.way).split('.').join('').split(' ').join(''));
    await current.insertOne({
        type: req.body.type,
        task: req.body.task,
        theme: req.body.theme,
        date: req.body.date
    });
    res.status(201).send();
    edu.close();

});
router.put('/api/marks', async (req, res) => {
    const edu = await loadMarksCollection();
    const current = edu.db('department').collection((req.body.name + req.body.way).split('.').join('').split(' ').join(''));
    await current.updateOne(
        { _id: new mongodb.ObjectID(req.body.id)}, // Filter
        {$set: {"marks": req.body.marks}}, // Update
        {upsert: false} // add document with req.body._id if not exists 

   );
    res.status(201).send();
    edu.close();

});

router.post('/api/marks/student', async (req, res) => {
    const edu = await loadMarksCollection();
    const current = edu.db('department').collection((req.body.name + req.body.way).split('.').join('').split(' ').join(''));
    await current.insertOne({
        type: req.body.type,
        student: req.body.student,
        marks: req.body.marks
    });
    res.status(201).send();
    edu.close();

});


async function loadMarksCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client;
}
 
module.exports = router;


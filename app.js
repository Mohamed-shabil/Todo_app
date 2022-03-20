const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/date.js');

app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

const items = []; 
const workItems = [];
app.get('/', (req, res) => {
    const day = date.getDate();
    console.log(day)    
    res.render('list', {listTittle: day, newListItem: items})
})
app.get('/work',(req, res)=>{
    res.render('list',{
        listTittle:'Work List',
        newListItem: workItems
    })
})

app.post('/',(req, res) => {
    console.log(req.body);
    const item = req.body.newItem;

    if(req.body.list === 'Work'){
        workItems.push(item)
        res.redirect('/work')
    }else{
        items.push(item)
        res.redirect('/')
    }
})

app.post('/work',(req, res) => {
    console.log(req.body);
    const  item = req.body.newItem;
    workItems.push(item)
    res.redirect('/work')
})
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port')
});
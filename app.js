var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var index = require('./routes/index');
var skills = require('./routes/skills');
var talents = require('./routes/talents');
var talentSkills = require('./routes/talentSkills');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/skills', skills);
app.use('/talents', talents);
app.use('/join', talentSkills);
app.use('/', index);

var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||
'postgres://localhost:5432/talent_db';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE IF NOT EXISTS ' +
'skills(skills_id SERIAL PRIMARY KEY, name TEXT not null);  ' +
'CREATE TABLE IF NOT EXISTS talent(talent_id SERIAL PRIMARY KEY, ' +
'first_name TEXT not null, last_name TEXT not null, ' +
'phone TEXT not null,' +
'low_range integer not null,' +
'high_range integer not null);' +
'CREATE TABLE IF NOT EXISTS ' +
'talent_skills(talent_id integer REFERENCES talent,' +
'skills_id integer REFERENCES skills,' +
'PRIMARY KEY (talent_id, skills_id));');
query.on('end', function() { client.end(); });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

The API has two routes: /api/agents and /api/agents/:location

/api/agents
Gets an array contaning all documents from a mongodb database. 
'location' property contains the name of the regional area occupied by agents.
The 'agents' property is an array containig the name and detailed locations of the Agents

/api/agents/:location
Gets a single document form mongo db contaning the specified location from the request parameter '/:location'

Am using cors from NPM to facilitate cross origin resource sharing.

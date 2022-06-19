# PERSONAL DASHBOARD

## TOOLS

### IN USE

- React.js
- Nodemon
- Concurrently
- Express.js
- Mongoose
- MongoDB
- Node.js
- Octonode/Octokit
- Recharts
- Redux
- bCrypt for Hashing

### TO CONSIDER

- UUID
- Reactstrap.js
	- w/ Bootstrap
- Three.js => For 3D Theming and Possible 3D Dash Render
- Animation Libraries:
	- Remotion
	- React-Spring
	- Framer Motion
	- React Motion
	- React Move
- Pupeteer (web scraping)
	- Nightmare: Pup. alt.
- Redux Form => Form State and Validation
- React DnD (Drag & Drop)
- React Intl (Consider for intl clock display(?))


### DEPRECATED

- N/A


## TO DO

- Inc. Octonode
- Find a way to implement Pupeteer as a method of gathering github data
	- Conisder looking for github personal api first?
- Get any necessary TEST express routes made and performed successfully
- Edit Mongo script and server port connection script
	- How to hide MongoDB information(?)
* Add Checklist Section/ To Do list Section
* Add Calendar section w/ events, reminders, etc.
* Logic for D/I ratio gauge (green < 0.5 < red)
** Consider connecting w/ github calendar library
	** Maybe contribute to library (?)
- Create credits list for libraries used
- Update pie charts for proper data display and calc
- Update area chart label
- Change Expenses panel into carousel panel:
	- Current Expenses
	- Income Summary & Savings (inc. What If)

## NOTES
- Current dev design works down to max-width: 1220px

### RECHARTS

- For <AreaChart>:
	- props:
		- width (int)
		- height (int)
		- data (obj)
- For <linearGradient>:
	- props:
		- id (string)
		- x1 (int string)
		- y1 (int string)
		- x2 (~)
		- y2 (~)
	- must be between <defs></defs>
- For <stop>:
	- props:
		- offest (int percent string)
		- stopColor (hex)
		- stopOpacity (int)
	- must be between <linearGradient></linearGradient>
- <XAxis /> uses a datakey string from data obj
- <YAxis /> does not
- For <CartesianGrid>:
	- props:
		- strokeDasharray (array of int as a str no commas)
- Dont forget <Tooltip />
- For <Area />:
	-props:
		- type (str)
		- dataKey (str key from data obj)
		- stroke (hex)
		- fillOpacity (int)
		- fill (string url(id of lingrad))


	### Redux
	- Reducer(statevalue, action){}
	- (state,action) => newState
	- Redux state only stores JS not JSX
	- Stores
		- Need a store to hold app state
		- {subscribe, dispatch, getState}

	###GitHub API
	- Register app w/ OAuth
	- Auth Callback URL is crucial
	


## COMPLETED
- Income Information form validation logic implemented
	- State management logic implemented
	- MongoDB collection store connected
- Budget Text connected to MongoDB
	- Properly calculates D/I ratio


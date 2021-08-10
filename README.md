# A Productivity Application

  Allows management of tasks/events, notes 


## Requirements

 - React
 - Node
 - Express
 - PostgreSQL
 - Weatherapi API key
 
  For a list of packages used, please refer to package.json file and scroll down to the 'depenedecties'

## Installing

### Downloading
	Clone the repo or download the zip file

### Configuration
	This project expects certain environment variables to be provided

	| Name           | Required   |  Description                |
	|----------------|------------|-----------------------------|
	|   `PORT`       |   yes      |  Express server port        |
	|   `NODE_ENV `  |   yes      |  Environment - Prod/dev     |
	|   `SECRET`     |   yes      |  String to use as JWT Secret|

   --- more to be added

### Running

 To run in development mode, set NODE_ENV to dev
 To run in production mode, set NODE_ENV to production

 Then, in the terminal, run `npm start`


## Features

	- See day's events
	- add/delete events 
	- manage events for the month/week
## User Stories

- **login page**
  - I should be able to sign up
  - I should be able to login

- **home page**
  - I should be able to see curent day and date
	- I should be able to see the weather if user permits location access
	- I should be able to view the day's events
	- I should be able to add new events for that day
	- I should be able to add tasks to any event for the day

- **Calendar view**  
  - I should be able to view the current month's calendar 
  - i should be able to see the events for the current day 
	- I should be able to add events for the day
  - I should be able to click on a day and see that day's events
 
- **Settings View**  
  I should be able to modify my preferences
  - I should be able to add my profile picture
  - I should be able to add other information (TBD later)


# Tests

	- Tests are written using supertest and jest
	Ensure that you have both installed before running the tests

	Run the tests using `jest` to run all tests
	or `jest <filepath&name>` to run a specific test



# Stretch Goals:

- on the home page:
  - Get a welcome message/motivational quote
  - See the day and date
  - See the weather for my location
  - Add a recipe page
    - user can see/add bkfst/lnch/dinner items for a particular day
    - user can have favorite recipes to choose from
- On Calendar Page:
  - add functionality for multiple day events
- Add a category view
  - I should be able to see Current Categories
  - I should be able to add a category
  - I should be able to click on a category and see its related events
- Ability to add a view
  I should be able to get a form to add whatever the  page is referring to.
  for example:
  - if calendar - add events
  - if categories - add category
  - if todolist - add todo item

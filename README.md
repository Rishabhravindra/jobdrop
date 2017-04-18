# Massdrop Coding challenge

Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.

## Getting Started

Online Demo: [massdrop.herokuapp.com](https://massdrop.herokuapp.com) 
Localhost: 'node app.js' These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

It is assumed that Node.js (with npm) is installed on the local machine and a command line has been set up to work with Node. Also, if testing on local machine, it is important that no other program is running on server localhost:5000.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

### Installing

Before running the program, write 'npm install' in your local machine, to install required dependencies mentioned later in the document

```
npm install
```

## Sample run

Go to [localhost:5000/add](http://localhost:5000/add) or [massdrop.herokuapp.com/add](https://massdrop.herokuapp.com/add) to send job to a worker

![Add job to queue](http://)

You will get a results page with job id for the url entered earlier. This will be used later to lookup job details.
![Job details](http://)

Fire up the search page by going to [localhost:5000/search](http://localhost:5000/search) or [massdrop.herokuapp.com/search](https://massdrop.herokuapp.com/search). Add the id we got earlier (Eg- ) to the search input bar.

![Search page](http://)

Get status and results (if job is completed) of the job in JSON format. I recommend using [JSON view for chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) or pass the JSON in a site like [jsonprettyprint](http://jsonprettyprint.com/) to view results in a more readable format.
![Search results](http://) 

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [body-parser](https://www.npmjs.com/package/body-parser) - Convert incoming data to JSON
* [Express](http://expressjs.com/) - routing 
* [mongoDB](https://www.npmjs.com/package/mongodb) - mongoDB driver for Node.js
* [mongoose](http://mongoosejs.com/) - connect to mongoDB
* [monq](https://github.com/scttnlsn/monq) - create workers to do jobs
* [request](https://www.npmjs.com/package/request) - make HTTP calls and get html code


## Author

* **Rishabh Ravindra** - [website](http://rishravi.me)

## Acknowledgments

* Stack Overflow
* Documentation for various packages used


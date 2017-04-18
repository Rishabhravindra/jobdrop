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

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc


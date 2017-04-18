# Jobdrop - Massdrop Coding challenge

Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.

## Getting Started

Online Demo: [massdrop.herokuapp.com](https://massdrop.herokuapp.com) (no installation required))
Localhost: 'node app' 

### Prerequisites

It is assumed that Node.js (with npm) is installed on the local machine and a command line has been set up to work with Node. Also, if testing on local machine, it is important that no other program is running on server localhost:5000.

Before running the program, write 'npm install' in your local machine, to install required dependencies mentioned later in the document

```
npm install
```

### Installing

Make sure you have installed the necessary packages. The Node.js server can be started by the command node app

```
node app
```

If everything was fine, you should see the success messages here.

```
Express app started at port 5000
db connection success
```

If the succeessful connection messages appear, then you are good to go! Go to [localhost](http://localhost:5000/add) server on your browser.

## Sample run
Below is a sample run for creating a job for the link [http://rishravi.me/sample/sample](http://rishravi.me/sample/sample)


Go to [localhost:5000/add](http://localhost:5000/add) or [massdrop.herokuapp.com/add](https://massdrop.herokuapp.com/add) to send job to a worker

![Add job to queue](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/addJob.PNG)


You will get a results page with job id for the url entered earlier. This will be used later to lookup job details.
![Job details](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/jobId.PNG)


Fire up the search page by going to [localhost:5000/search](http://localhost:5000/search) or [massdrop.herokuapp.com/search](https://massdrop.herokuapp.com/search). Add the id we got earlier (Eg- 58f63c08123ba039189ebf8b) to the search input bar.

![Search page](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/searchjob.PNG)


Get status and results (if job is completed) of the job in JSON format. I recommend using [JSON view for chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) or pass the JSON in a site like [jsonprettyprint](http://jsonprettyprint.com/) to view results in a more readable format.
![Search results](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/jobresult.PNG) 

### Process breakdown

Once the user provides the url input in the /add page, the function 'createJob()' is invoked in the Job Controller. The function initializes the worker a job 'getHTML'. The job is added to the queue 'getCode'. Currently, there is only one type of job that fetches the html code of the provided url. The job goes through various events like enqueued, dequeued, completed, and failed/error in specific cases where the html code could not be fetched. As the events occur, the collection 'jobs' is updated with the job id and the status of the job. In the event 'complete', the result which is the HTML code is added to the collection. After the job is completed, the used is redirected to the results page where the unique job id for that job is provided for the user to lookup.  

To search a job status and result(if completed), the /search page provides an input area to enter the object id that was provided in the results page when the job was added. Once the job id is entered, the function 'searchJob()' is invoked which takes in the job id and looks up the collection. Once a match is found, it returns the json which is then displayed in the POST page of /search. 

The whole process including the job statuses and results are logged in to the console. 
Eg- (logs from one sample run)
```
$ node app
Express app started at port 5000
db connection success
JobData {
  name: 'getHTML',
  params: { url: 'http://www.rishravi.me/sample/sample' },
  queue: 'getCode',
  attempts: undefined,
  timeout: undefined,
  delay: 2017-04-18T16:17:12.782Z,
  priority: 0,
  status: 'queued',
  enqueued: 2017-04-18T16:17:12.782Z,
  _id: 58f63c08123ba039189ebf8b }
JobData {
  name: 'getHTML',
  params: { url: 'http://www.rishravi.me/sample/sample' },
  queue: 'getCode',
  attempts: undefined,
  timeout: undefined,
  delay: 2017-04-18T16:17:57.177Z,
  priority: 0,
  status: 'queued',
  enqueued: 2017-04-18T16:17:57.177Z,
  _id: 58f63c35123ba039189ebf8c }
JobData {
  name: 'getHTML',
  params: { url: 'http://www.rishravi.me/sample/sample' },
  queue: 'getCode',
  attempts: undefined,
  timeout: undefined,
  delay: 2017-04-18T16:23:00.281Z,
  priority: 0,
  status: 'queued',
  enqueued: 2017-04-18T16:23:00.281Z,
  _id: 58f63d64123ba039189ebf8d }
```

## Built With

* [body-parser](https://www.npmjs.com/package/body-parser) - Convert incoming data to JSON
* [Express](http://expressjs.com/) - routing 
* [mongoDB](https://www.npmjs.com/package/mongodb) - mongoDB driver for Node.js
* [mLab](https://mlab.com/) - store jobs collection online
* [mongoose](http://mongoosejs.com/) - connect to mongoDB
* [monq](https://github.com/scttnlsn/monq) - create workers to do jobs
* [pug](https://pugjs.org/api/getting-started.html) - templating engine
* [request](https://www.npmjs.com/package/request) - make HTTP calls and get html code


## Author

* **Rishabh Ravindra** - [website](http://rishravi.me)

## Acknowledgments

* Stack Overflow
* Documentation for various packages used


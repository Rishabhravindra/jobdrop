# Jobdrop - Massdrop Coding challenge

>Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status / results.

## Getting Started

Online Demo: [jobdrop.herokuapp.com](https://jobdrop.herokuapp.com) (no installation required))
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


Go to [localhost:5000/add](http://localhost:5000/add) or [massdrop.herokuapp.com/add](https://jobdrop.herokuapp.com/add) to send job to a worker

![Add job to queue](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/addJob.PNG)


You will get a results page with job id for the url entered earlier. This will be used later to lookup job details.
![Job details](https://github.com/Rishabhravindra/jobdrop/blob/master/public/img/jobId.PNG)


Fire up the search page by going to [localhost:5000/search](http://localhost:5000/search) or [massdrop.herokuapp.com/search](https://jobdrop.herokuapp.com/search). Add the id we got earlier (Eg- 58f63c08123ba039189ebf8b) to the search input bar.

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
### Thoughts
While designing the program, I wanted to use [curl](https://curl.haxx.se/) for testing GET and POST requests. However, during the program design process, I wanted to create a real-world implementation and build small html forms to use GET and POST routes. And thus instead of using req.params.link (or something similar), I used req.body.link to get the url to be used by a worker. Changing the whole program to test with [curl](https://curl.haxx.se/) and use link params/queries is not a big task as it would only entail small changes to the response object among other changes.  

The whole process is logged on the console. That is one way to look up the history of the job.

## Built With

* [body-parser](https://www.npmjs.com/package/body-parser) - Convert incoming data to JSON
* [Express](http://expressjs.com/) - routing 
* [mongoDB](https://www.npmjs.com/package/mongodb) - mongoDB driver for Node.js
* [mLab](https://mlab.com/) - store jobs collection online
* [mongoose](http://mongoosejs.com/) - connect to mongoDB
* [monq](https://github.com/scttnlsn/monq) - create workers to do jobs
* [pug](https://pugjs.org/api/getting-started.html) - templating engine
* [request](https://www.npmjs.com/package/request) - make HTTP calls and get html code

dsd
## Author

* **Rishabh Ravindra** - [website](http://rishravi.me)

## Acknowledgments

* Stack Overflow
* Documentation for various packages used

## [Follow-up questions](#follow-up-questions)

**1) Right now the server that received job requests and the queue that executes requests run in the same process. If I sent a lot of requests for urls with long downloads this could crash both the REST server and job queue processing at once. How would you solve for this?**

I would implement a Node.js cluster module to run different processes. A master process would be created to assign tasks to its child processes. One process could involve assigning the worker to request data from the user provided URLs, while another process could involve searching up job statuses/results from the mongo collection. This way, the processes would be running separately while sharing resources like the port and database. Added benefits of using clusters involve faster application, and more sclable server for future releases.

**2) How would you test your system?**

I would unit test the system since it involves so many functions that do different tasks. Looking up results in a MongoDB collection would be a very different function than assigning a worker the task of fetching data from a url. Hence, the need for unit testing the functions. To accomplish this, I would use the Mocha testing library to automate and run tests, and Chai to verify the test results obtained from Mocha. 

For Eg- I can write a test on Mocha to check that the searchJob() function is returning a JSON object and assert with Chai.

**3) If I submitted a url that was an endpoint for a 10TB file your code would attempt to download it and die. How do you avoid trying to request large files?**

I would have a two-step check to make sure file sizes being downloaded through the http request do not cross beyond the size limit.
First, I would make a HEAD request to the url submitted at the endpoint and get the file size from the header, ‘content-length’. However, the server may or may not include ‘content-length’, and that is why I would include a second check while downloading the data.

For the second check, I would include a request.on(‘data’... listener and keep a record of the file size being downloaded. With every instance of a data packet being downloaded, a simple if statement can be included to check the file size limit. The request will only continue if the check passes, else the program will call request’s abort() function to stop downloading file from the url.

**4) Why did you check in node_modules?**

When I have to decide whether to check in node_modules or not, I look at the type of project I am working on and what are some of the important features I want to implement. For this project, I wanted to have a clean and lightweight app that handled a job queue and workers. I committed only the files I was working on and let npm handle dependencies. Currently, the binary dependencies of the app weighs in about ~ 28 mb on disk. The project was deployed on Heroku which automates building the project on every commit to the master branch.The development 

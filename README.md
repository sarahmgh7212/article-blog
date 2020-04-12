# Article Blog
This is a web application in which users can see some articles, upvote them and add comments for each of them. This website is uploaded on AwS EC2 and can be accessed via the following link:
- [Article Blog](http://ec2-54-157-223-159.compute-1.amazonaws.com/)

## Screenshots
- To see how the application looks like:
- [screenshots](/screenshots/)

## Getting Started
```
 $npm start
 ```
### Prerequisites
1.To create node modules:
```
$ npm init -y
$ npm install --save express 
$ npm install --save-dev @babel/core @babel/node @babel/preset-env

```
2. Then create a folder named 'src' including  file named 'server.js'
3. Then create this file inside src folder: ".babelrc"
4. Inside ".bablerc" file write this and save:
```
{
    "presets": ["@babel/preset-env"]
}
```
5. To run our express application:
```
$ npx babel-node src/server.js

```
6. For being able to use json data in our code:
```
$npm install --save body-parser
$npm install --save-dev nodemon

```


After installing nodemon we should use this command for starting the server:
```
$ npx nodemon --exec npx babel-node src/server.js

```
Then add this line to package.json of my-blog-backend in the script section:

```
"start":"npx nodemon --exec npx babel-node src/server.js"

```
we can now just type
```
$npm start

```
to start the server!

Our server is now listening on port 8000
### To add mongodb to our project:
```
$npm install --save mongodb
```

### To use fetch api for internet explorer users:
In the front-end folder(my-blog2):
```
$npm install --save whatwg-fetch

```
Then we need to import 'whatwg-fetch' so do this in the index.js file which is created by default:
 ```
 import 'whatwg-fetch';
 
 ```
## To prepare our application for release in AWS services:
1. Navigate to my-blog2(front-end) folder, then
```
 $npm run build 
 
``` 
  - The above command helps us to run both front-end and backend in localhost:8000 along with the DB.
2. Then copy the "build" folder and paste it in my-blog-backend folder.

3. In the my-blog-backend folder, go to server.js and add these lines:
```
const path=require ('path');
app.use(express.static(path.join(__dirname, '/build')));
```
Add this line at the end of last path:

```
app.get('*', (req,res) =>{

    res.sendFile(path.join(__dirname + '/build/index.html'));
})

```
Then to test if our website is still working, type : http://localhost:8000 in URL

After uploading our project in GitHub, next step is launching the EC2 on [AWS Console](https://aws.amazon.com/console/).
### On AWS do:
1. Now go to AWS EC2, Launch a new instance with default settings
2. Download and Save the shared key
3. create a folder in this directory on your local machine: users/username/.ssh 
4. cut and pase the .pem(key) file into this folder
5. In a linux shell, navigate to .ssh folder and run:
```
$ chmod 400 ~/.ssh/article-blog.pem
```
6. Go to your EC2 created instance, copy the public dns address and paste it after the @ in your linux shell:
```
$ ssh -i ~/.ssh/nnnn.pem ec2-user@ec2-nnnnnnn.compute-1.amazonaws.com

```
7. It then asks if we want to continue connecting to the server, type "yes".
 ### On our EC2 instance we need to install a few stuff:
1. Install git:
```
$sudo yum install git

```
  - To see AWS tutorial about [how to set up node.js on  EC2 instance](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html).
  
2. To set up node.js on our EC2 instance:
  - Install node version manager(nvm) by typing the following command:
  ```
  $curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  ```
  - We will use nvm to install Node.js because nvm can install multiple versions of Node.js and allow you to switch between them.
  - Activate nvm by typing the following at the command line.
  
  ```
  $ . ~/.nvm/nvm.sh
  
  ```
  
  - check the node version we were working with for our project in terminal on your local machine before installing node on EC2:
  ```
  $ node -v
  
  ```
  - Then in the Linux shell type:
  
  ```
  $nvm install 10.15.0
  $npm install -g npm@latest

  ```
3. Then we have to install Mongodb on our EC2 instance, check the followin link for more information:
[Install MongoDB Community Edition on Amazon Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)

  - Create a /etc/yum.repos.d/mongodb-org-4.2.repo file so that you can install MongoDB directly using yum:
  ```
  $sudo nano  /etc/yum.repos.d/mongodb-org-4.2.repo
  
  ```
  - Paste this in the nano environment:
  ```
  [mongodb-org-4.2]
  name=MongoDB Repository
  baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
  gpgcheck=1
  enabled=1
  gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
  
  ```
  ctrl + o to save
  ctrl +x to exit
  
  - Again in the ssh terminal:
  ```
  $sudo yum install -y mongodb-org
  
  ```

  - To check if Mongodb is working on the server:

  ```
   $sudo service mongod start
   
  ```
  - Then create some data in mongodb database
  - Then we have to clone our project, go to github and click on clone/download:
  - In the ssh terminal:
  ```
  $git clone https://github.com/sarahmgh7212/article-blog.git
 
  ```
4. Then we have to install node modules, so navigate to article-blog on the server:
```
$npm install
$npm install -g forever
$ forever start -c "npm start" 

```
  - To check if its running:
  
  ```
  $forever list
  
  ```
  - we should see this as a result for a successful installation :
info:    Forever processes running
data:        uid  command   script                      forever pid  id logfile                          uptime

 oEKp npm start /home/ec2-user/article-blog 4537    4544    /home/ec2-user/.forever/oEKp.log 0:0:0:18.005

6. To be able to view the website with a public address and without login, we need to do some routing:

```
$ sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

```
## Built With
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* Rest APIs
* [MongoDB](https://www.mongodb.com/)
* [AWS EC2](https://aws.amazon.com/console/)

## Contribution
Sara Moghaddasian



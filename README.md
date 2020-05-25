# Toddler

## Link:
https://toddler-app.now.sh/

## Client Repo: 
https://github.com/lfranckx/ratemybaby-client

## In Action:
### Main Page
<img width="600"
    alt="Screen Shot 2020-05-18 at 8 49 52 PM" 
    src="https://user-images.githubusercontent.com/52330544/82283636-cbdbd480-994b-11ea-9878-3458db101866.png">

### Baby's Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 38 48 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786976-68a1e480-9e1a-11ea-920e-770eea67c01e.png">

### Edit Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 34 49 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786973-6770b780-9e1a-11ea-81de-2cd2053be439.png">

### User's Babies Menu
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 39 23 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786977-693a7b00-9e1a-11ea-95e3-f14a97221dd0.png">

### Create Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 27 49 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786970-66d82100-9e1a-11ea-9f02-868dcccd0d8f.png">

## API ENDPOINT SERVICES:

auth: Creates the JSON Web Token to store in the browser, which allows the app to access that user's information and keep them logged in.

babies: Endpoint for storing and accessing all of the data for the profiles in the app. It services the app with all of the baby profiles to display for users to rate. It accesses baby profiles associated with the current user logged in to allow that user to create, update, and remove their own profiles.

upload: This uses the multer-s3 package for handling all uploads to the AWS S3 bucket. The S3 bucket stores all of the images that users upload.
The endpoint checks the file type ensuring that it is a JPEG, JPG, PNG, or GIF of no more than 2MB. It then supplies an image url and file name for the API. The API currently only uses the single file upload service.

users: Endpoint for storing and accessing all of the data for each user.  It checks the database for current usernames existing in the database ensuring no duplicate usernames are made. It validates that passwords meet certain parameters such as length and special characters and hashes them using bcryptjs.    

## ENDPOINT DOCUMENTATION:

### AUTH ENDPOINT:
<br>
https://warm-anchorage-60574.herokuapp.com/api/auth/login
<br>
Method: 'POST'
<br>
Request Body:
<br>
{
<br>	"username": "user1",
<br>	"user_password": "User1234!"
}
<br>
Response Body:
<br>
{
<br>    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}<br><br>

### BABIES ENDPOINT - GET by parent id
<br>
https://warm-anchorage-60574.herokuapp.com/api/babies/parent/id
<br>
Method: "GET"
<br>
Headers: {
<br>    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}<br><br>

### Response Body:
<br>
[
    {
<br>        "id": 12,
<br>        "baby_name": "Dudley",
<br>        "age": "74 months",
    <br>    "country": "United States",
    <br>    "about": "Old soul, romantic, and down to earth.",
    <br>    "image_url": "https://ratemybaby-images.s3.us-west-1.amazonaws.com/376FAB66-8D23-4270-BF8D-8A22FE3C43E0-1586495661110",
    <br>    "total_score": 5,
    <br>    "total_votes": 9,
    <br>    "parent_id": 1<br>
    },<br>
    {
    <br>    "id": 1,
    <br>    "baby_name": "Noah",
    <br>    "age": "1 year",
    <br>    "country": "Indonesia",
    <br>    "about": "I, myself, am strange and unusual.",
    <br>    "image_url": "https://ratemybaby-images.s3-us-west-1.amazonaws.com/Noah.jpg",
    <br>    "total_score": 81,
    <br>    "total_votes": 104,
    <br>    "parent_id": 1<br>
    }
]<br><br>

### UPLOAD ENDPOINT:
<br>
https://warm-anchorage-60574.herokuapp.com/api/upload
<br>
Method: "POST"
<br>
Headers: {
<br>    "Content-Type": "application/json"
<br>    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
<br>
Request Body: <br>
{
    <br>"image": "superlike.png"<br>
}<br>
Response Body:<br>
{
<br>    "image_name": "superlike-1586637059649",
<br>    "image_url": "https://ratemybaby-images.s3.us-west-1.amazonaws.com/superlike-1586637059649"
}<br><br>

### USERS ENDPOINT: 
<br>
https://warm-anchorage-60574.herokuapp.com/api/users
<br>
Method: "POST"
<br>
Headers: <br>
{
<br>    "Content-Type": "application/json"<br>
}
<br>
Body: <br>
{
<br>    "username": "TestUser",
<br>    "user_password": "Test1234!",
<br>    "email": "testemail@gmail.com"<br>
}
<br>
Response Body: <br>
{
<br>    "id": 14,
<br>    "username": "TestUser",
<br>    "user_password": "$2a$12$vmLS3PwtA2nNRGPQoDWzUeGuHZkiPLDcf1JRKoIhD2ObIDHiIQO5e",
<br>    "email": "testemail@gmail.com",
<br>    "date_created": "2020-04-12T04:01:32.911Z"<br>
}

## SUMMARY:
This API allows users to login and create new profiles to sign into.  It uses JWT validation to log users in and access their information from the database using the token.  It communicates with Amazon Web Services S3 Buckets for uploading files and receiving their image url.

## TECHNOLOGIES USED:
* AWS-SDK
* Bcryptjs
* CORS
* Express
* JWT
* Knex
* Multer-S3
* Treeize
* Winston

## In Action:
### Main Page
<img width="600"
    alt="Screen Shot 2020-05-18 at 8 49 52 PM" 
    src="https://user-images.githubusercontent.com/52330544/82283636-cbdbd480-994b-11ea-9878-3458db101866.png">

### Baby's Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 38 48 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786976-68a1e480-9e1a-11ea-920e-770eea67c01e.png">

### Edit Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 34 49 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786973-6770b780-9e1a-11ea-81de-2cd2053be439.png">

### User's Babies Menu
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 39 23 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786977-693a7b00-9e1a-11ea-95e3-f14a97221dd0.png">

### Create Profile Page
<img width="600" 
    alt="Screen Shot 2020-05-24 at 11 27 49 PM" 
    src="https://user-images.githubusercontent.com/52330544/82786970-66d82100-9e1a-11ea-9f02-868dcccd0d8f.png">
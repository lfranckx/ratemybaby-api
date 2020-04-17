NAME OF APP: Toddler

LINK TO LIVE APP: https://toddler-app.now.sh/

DEMO USER: 
    Username: Demo 
    Password: Demo1234!

============================================================
API ENDPOINT SERVICES:

auth: Creates the JSON Web Token to store in the browser, which allows the app to access that user's information and keep them logged in.

babies: Endpoint for storing and accessing all of the data for the profiles in the app. It services the app with all of the baby profiles to display for users to rate. It accesses baby profiles associated with the current user logged in to allow that user to create, update, and remove their own profiles.

upload: This uses the multer-s3 package for handling all uploads to the AWS S3 bucket. The S3 bucket stores all of the images that users upload.
The endpoint checks the file type ensuring that it is a JPEG, JPG, PNG, or GIF of no more than 2MB. It then supplies an image url and file name for the API. The API currently only uses the single file upload service.

users: Endpoint for storing and accessing all of the data for each user.  It checks the database for current usernames existing in the database ensuring no duplicate usernames are made. It validates that passwords meet certain parameters such as length and special characters and hashes them using bcryptjs.    

============================================================
ENDPOINT DOCUMENTATION:

AUTH ENDPOINT:
https://warm-anchorage-60574.herokuapp.com/api/auth/login
Method: 'POST'
Request Body:
{
	"username": "user1",
	"user_password": "User1234!"
}
Response Body:
{
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}

BABIES ENDPOINT - GET by parent id
https://warm-anchorage-60574.herokuapp.com/api/babies/parent/id
Method: "GET"
Headers: {
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
Response Body:
[
    {
        "id": 12,
        "baby_name": "Dudley",
        "age": "74 months",
        "country": "United States",
        "about": "Old soul, romantic, and down to earth.",
        "image_url": "https://ratemybaby-images.s3.us-west-1.amazonaws.com/376FAB66-8D23-4270-BF8D-8A22FE3C43E0-1586495661110",
        "total_score": 5,
        "total_votes": 9,
        "parent_id": 1
    },
    {
        "id": 1,
        "baby_name": "Noah",
        "age": "1 year",
        "country": "Indonesia",
        "about": "I, myself, am strange and unusual.",
        "image_url": "https://ratemybaby-images.s3-us-west-1.amazonaws.com/Noah.jpg",
        "total_score": 81,
        "total_votes": 104,
        "parent_id": 1
    }
]

UPLOAD ENDPOINT:
https://warm-anchorage-60574.herokuapp.com/api/upload
Method: "POST"
Headers: {
    "Content-Type": "application/json"
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODY2MzQ0MDUsImV4cCI6MTU4NjY0NTIwNSwic3ViIjoidXNlcjEifQ.7T7SGUcCSthyKBARYSJU2w4u_usYWMuzdhjEYDcpPXM"
}
Request Body: {
    "image": "superlike.png"
}
Response Body:
{
    "image_name": "superlike-1586637059649",
    "image_url": "https://ratemybaby-images.s3.us-west-1.amazonaws.com/superlike-1586637059649"
}

USERS ENDPOINT:
https://warm-anchorage-60574.herokuapp.com/api/users
Method: "POST"
Headers: {
    "Content-Type": "application/json"
}
Body: {
    "username": "TestUser",
    "user_password": "Test1234!",
    "email": "testemail@gmail.com"
}
Response Body: {
    "id": 14,
    "username": "TestUser",
    "user_password": "$2a$12$vmLS3PwtA2nNRGPQoDWzUeGuHZkiPLDcf1JRKoIhD2ObIDHiIQO5e",
    "email": "testemail@gmail.com",
    "date_created": "2020-04-12T04:01:32.911Z"
}

============================================================
SUMMARY:
This API allows users to login and create new profiles to sign into.  It uses JWT validation to log users in and access their information from the database using the token.  It communicates with Amazon Web Services S3 Buckets for uploading files and receiving their image url.

TECHNOLOGIES USED:
AWS-SDK
Bcryptjs
CORS
Express
JWT
Knex
Multer-S3
Treeize
Winston

<img width="785" alt="Screen Shot 2020-04-10 at 12 47 40 PM" src="https://user-images.githubusercontent.com/52330544/79020062-ad084800-7b2c-11ea-81b1-f44318351a6c.png">
<img width="822" alt="Screen Shot 2020-04-10 at 12 49 05 PM" src="https://user-images.githubusercontent.com/52330544/79020076-b5608300-7b2c-11ea-9be6-eee723b14223.png">
<img width="809" alt="Screen Shot 2020-04-10 at 12 49 29 PM" src="https://user-images.githubusercontent.com/52330544/79020087-bd202780-7b2c-11ea-85f5-f9f574735bbd.png">
<img width="821" alt="Screen Shot 2020-04-10 at 12 49 57 PM" src="https://user-images.githubusercontent.com/52330544/79020096-c3ae9f00-7b2c-11ea-866f-bc1c9a8fd16a.png">

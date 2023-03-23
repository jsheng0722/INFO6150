Create a user who takes 3 parameters full name, email, and password. Enforce a strong password rule and add validation for email and full name.
API Endpoint:
POST: /user/create – User creation with a meaningful message if the user email or password is invalid)
There is user.js include models of userName, email and password.
POST in routes.js can create user and stroe in database.
There is validation and bcrypt use in user create.

Update the user details (full name and password only). Email should not get updated at any point. A proper error message should be thrown if a user is not in the database.
API Endpoint:
PUT: /user/edit – Add validations for full name and password
EDIT can use id which is unique to edit the info inside the id. and it does not change email.

Delete the user by taking the user's email as input
Api Endpoint:
DELETE: /user/delete
DELETE can delete the user by email.

Get all the user's full name, email addresses, and passwords stored in the database
API Endpoint:
GET: /user/getAll
Get can get all the user from databases.
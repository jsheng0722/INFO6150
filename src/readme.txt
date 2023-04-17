home-page:
    header
    main
    footer

about-page:
    header
    footer

task-page:
    header
    task-list:
        add-task
        edit-task
        delete-task
    footer


npm install:
    uuid                        : id on table
    npm init -y
    express
    body-parser
    cors
    mongoose                    : database
    bcryptjs 
    jsonwebtoken
    config
    express-validator
    @ng-bootstrap/ng-bootstrap
    jwt-decode                  : token
    ng-lazyload-image           : Too much img，lazyload for speeding
    ngx-infinite-scroll
    mongoose-paginate-v2

ng add @angular/material

Set the router:
    Solved the problem of not returning to the original page after landing, but returning to the home page
    Make page conversion easier
    Fixed the problem that the create task button cannot jump directly from login page to task page after being clicked


Use LocalStorage function in auth.service:
    Solved the user refresh page will automatically log out of the problem
    Solved the problem of user name assignment failure after login
    Solved the problem of being able to access the task path even after logging out

Other:
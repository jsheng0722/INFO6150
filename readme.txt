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

ng add @angular/material

解决了登陆过后不返回原页面而是返回首页的问题
解决了create task按钮点击过后不能直接跳转的问题
解决了用户刷新页面后会自动登出的问题
解决了在登出后仍然能进入task路径的问题

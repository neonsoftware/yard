# Yard

[![](https://img.shields.io/badge/made%20by-Neoncnsoftware%20-blue.svg?style=flat-square)](http://ipn.io)

> An web application for creating templated documents and export as PDF

[Live demo](http://www.rusty.blue)

## Built with

Built using [AngularJS](www.angular.com), Django, and Libreoffice.<br>
Deployed with Docker and Alpine Linux.

## Screenshots

#### Mobile
![ciao](https://github.com/neonsoftware/yard/blob/master/img/mobile.png)

#### Tablet & Desktop
![ciao](https://github.com/neonsoftware/yard/blob/master/img/desktop.png)

### Deploy

Deploymenent expects Docker, Docker-compose, and git.

```
> git clone https://github.com/neonsoftware/yard.git
> cd yard/back-end/deploy
> docker-compose up -d             (start server)
> # it's on ...
> curl -X GET 127.0.0.1:8000       (check connection)
```

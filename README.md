# Yard

An web application for creating templated documents and export as PDF

* **Back-end** : AWS EC2 (Ubuntu 14.4 LTS) + Nginx + Python + Django + Gunicorn
* **DB** : MySQL on AWS RDS
* **Front-end** : Polymer + AngularJS

[Live demo](http://www.rusty.blue)

## Screenshots

#### Mobile
![ciao](https://github.com/neonsoftware/yard/blob/master/img/mobile.png)

#### Tablet & Desktop
![ciao](https://github.com/neonsoftware/yard/blob/master/img/desktop.png)


## To install on a new aws instance

### Set ubuntu packages

```> sudo apt-get install git mysql-server libmysqlclient-dev libpq-dev python-dev nginx npm sudo libxml2-dev libxslt1-dev libreoffice-writer```

### Set python packages and virtualenv

```> easy_install pip```

```> sudo pip install virtualenv```

```> virtualenv ~/venv```

```> . ~/venv/bin/activate```

```> npm install -g bower```


### Setup repo
```> git clone git@github.com:neonsoftware/yard.git```

```> . ~/venv/bin/activate```

```> pip install -r ~/yard/requirements.txt```

### Link config files

```> echo -e "\nsource ~/yard/apply/config/bashrc" >> ~/.bashrc```


### Deploy

```
> git clone -b foundation https://github.com/neonsoftware/yard.git
> cd yard/back-end/deploy
> docker-compose up -d             (start server)
> # it's on ...
> curl -X GET 127.0.0.1:8000       (check connection)


```




# Yard

An web application for creating templated documents and export as PDF

Back-end : AWS EC2 (Ubuntu 14.4 LTS) + Nginx + Django + Gunicorn
DB : MySQL on AWS RDS
Front-end : Polymer + AngularJS

## Screenshots


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

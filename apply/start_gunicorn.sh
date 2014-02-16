#!/bin/bash

set -e

LOGFILE=../../runtime_files/guni/hello.log

ERRORFILE=../../runtime_files/guni/error.log

LOGDIR=$(dirname $LOGFILE)

NUM_WORKERS=3

#The below address:port info will be used later to configure Nginx with Gunicorn

ADDRESS=127.0.0.1:8000

# user/group to run as

#USER=your_unix_user

#GROUP=your_unix_group

cd ../..

source ./venv/bin/activate

#test -d $LOGDIR || mkdir -p $LOGDIR
cd yard/apply

echo "here"

python manage.py run_gunicorn -w $NUM_WORKERS --bind=$ADDRESS \
--log-level=debug \
--log-file=$LOGFILE 2>>$LOGFILE  1>>$ERRORFILE  &

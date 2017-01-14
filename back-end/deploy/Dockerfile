FROM nginx

RUN apt update -y && apt install -y libreoffice python-pip python-lxml git
RUN git clone https://github.com/neonsoftware/yard.git
RUN cd yard/back-end && pip install -r requirements.txt
RUN cd yard/back-end/doctailor && python manage.py migrate
RUN cd yard/back-end/doctailor && echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com
', 'pass')" | python manage.py shell

WORKDIR yard/back-end/doctailor
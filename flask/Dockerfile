FROM python:3.8

WORKDIR /app

RUN apt-get update 

# RUN apt-get install -y libopencv-dev 

# RUN apt-get install -y python3-opencv

RUN /usr/local/bin/python -m pip install --upgrade pip

#COPY requirements.txt /app

COPY ./app /app

RUN pip --no-cache-dir install -r requirements.txt

#COPY gunicorn_config.py /app

#CMD gunicorn --bind 0.0.0.0:5000 server:app

#CMD gunicorn -c /app/gunicorn_config.py server:app

#EXPOSE 5000

#ADD entrypoint.sh /app

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]
#ENTRYPOINT ["python", "server.py"]
#CMD python ./server.py

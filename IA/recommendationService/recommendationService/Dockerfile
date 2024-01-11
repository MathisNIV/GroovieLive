FROM python:3.9-slim-buster
WORKDIR /app
ADD . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5001
CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]
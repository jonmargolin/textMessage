# textMessageApp
##  components
-- messaging service in charge of the websocket connection nest application  running on port 3000
-- client application served from a apache2 proxy server on prot 80 
--- rabbitmq  server for broker messaging

## Run the application
  for starting the application run the following command
  docker-compose build  
  docker-comose up 
  the application will be served  in http://localhost:80 


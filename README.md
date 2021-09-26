# Squadro Project

### Installation
  
    Assume that you have docker installed.

    In order to run the application in local environment follow instructions below:

  ```bash
  # clone
  git clone https://github.com/r-aliev/squadro-project.git
  cd squadro-project
  
  sudo docker build . 
  
  sudo docker-compose up  

  ```

    Check 127.0.0.1 for frontend.
    Check 127.0.0.1:8000/api/ for api.
  
    (Do a research why we need to use docker with sudo (i think related to nginx))
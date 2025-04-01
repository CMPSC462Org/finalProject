# Job Search Tracker Final Project (CMPSC 462) 📂


This is a full-stack job search tracker built with **React (Vite)** for the frontend, **Flask** for the backend, and **Docker** for containerizing.

## Getting Started 


### 1. Clone the Repository

  ```bash
  git clone https://github.com/CMPSC462Org/finalProject.git
```
```bash
cd finalProject
```

### Start the Docker Containers 

In the root folder terminal, run:

```
cd ..
```

```bash
docker-compose up --build
```

* This should create the environment for the Frontend and backend

## Run the Backend

**1.** Move to the "Backend" folder

```
cd backend
```

**2.** Set up the python Environment and Interpretor

2a. Activate the Virtual Environment (If Docker didn't do it already)

**Windows**
```
env\Scripts\activate
```

**MacOS***
```
source venv/bin/activate
```
2b. Select Interpretor

* CRTL+shift+p (Opens Intepretor)

* Select **python selcet interpretor**

* Choose 
```
./backend/venv/Scripts/python.exe
```

* If its not listed, click **Enter Interpretor Path**, then browsw manually to the correct location:

```
C:\Users\<<USERNAME>>\path\to\finalProject\backend\venv\Scripts\python.exe
```


**3.** Run the Flask Server
```
python run.py
```


## Run the Frontend

**1.** Move to the frontend Folder

```
cd frontend
```

***2.*** Run the React app

```
npm run dev
```

Or

```
yarn dev
```

---

## More to come soon! 🥳

* [ ] AWS
* [ ] Finsh the Backend
* [ ] Working on Login/ Register pages

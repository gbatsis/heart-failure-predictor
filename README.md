# Heart failure prediction using Machine Learning

Welcome to the Heart Failure Prediction project! This project leverages machine learning to predict heart failure based on various health metrics.

## Overview

This repository contains the code and resources for training and deploying a machine learning model to predict heart failure. The project includes both a frontend application built with React and a backend API built with Python (Flask).

Web app is responsive and tested using various devices.

## Features

- **Machine Learning Model**: SVM with RBF kernel, optimized using grid search cross-validation.
- **Frontend**: React application for user interaction and visualization.
- **Backend**: Flask API for serving the machine learning predictions.
- **Dockerized Deployment**: Easily deploy the application using Docker.

## Machine Learning framework

### Model selection

After conducting the EDA and an exhaustive grid search cross-validation among three models, we selected an SVM model with C=1, gamma=0.1, and an RBF kernel for deployment. This model uses One-Hot Encoding for categorical features and excludes the RestingBP feature (more info at EDA).

### Model Evaluation Results

- **Accuracy:** 0.875
- **F1 Score:** 0.8889
- **Precision:** 0.8762
- **Recall:** 0.9020
- **ROC-AUC:** 0.9255

| Class           | Precision | Recall | F1-Score |
|-----------------|-----------|--------|----------|
| No HeartDisease | 0.87      | 0.84   | 0.86     |
| HeartDisease    | 0.88      | 0.90   | 0.89     |
| **Accuracy**    |           |        | 0.88     |
| **Macro Avg**   | 0.87      | 0.87   | 0.87     |
| **Weighted Avg**| 0.87      | 0.88   | 0.87     |

![Precision-Recall Curve](./data/results/curve1.png)

![ROC-AUC Curve](./data/results/curve2.png)

## Installation Instructions

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

### Step 1: Clone the Repository

Clone the repository to your local machine:
```sh
git clone https://github.com/gbatsis/heart-failure-predictor.git
cd heart-failure-predictor
```

### Step 2: Ensure the directory structure looks like this:

heart-failure-predictor/

├── backend/

│   ├── Dockerfile

│   ├── requirements.txt

│   └── ... (other backend files)

├── frontend/

│   ├── Dockerfile

│   ├── package.json

│   ├── package-lock.json

│   └── ... (other frontend files)

├── docker-compose.yml

└── ... (other project files)

### Step 3: Docker Compose Configuration
Verify the docker-compose.yml file in the root of the project:

```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - CHOKIDAR_USEPOLLING=true
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5050:5050"
    volumes:
      - ./backend:/app

volumes:
  backend_db:
```

Adjust the ports based on your needs. 

### Step 4: Build and Run the Docker Containers
Run the following command to build and start the Docker containers:

```ssh
docker-compose up --build
```

#### Issues

1.  Message: "docker.errors.DockerException: Error while fetching server API version: ('Connection aborted.', PermissionError(13, 'Permission denied'))"
  Solution:
  ```ssh
  sudo docker-compose up --build
  ```

2. Sometimes, Docker can use a cached layer that didn't install the packages properly. You can force Docker to rebuild the images without using cache:
  ```ssh 
    docker-compose build --no-cache
    docker-compose up
  ```

### Run the project without using Docker:

#### Step 1: Prepare backend

Create virtual enviroment and install project requirements:

```ssh
  cd backend
  python3.8 -m venv .venv
  pip install requirements.txt
```

Run application:

```ssh
  python app.py 
```

#### Step 2: Prepare frontend

Ensure that Node.js is installed on your computer

Start node:

```ssh
  cd frontend
  npm start
```

### Step 5: Access the Application
Once the containers are running, you can access the application:

Frontend: Open your browser and navigate to http://localhost:3000

Backend: The backend server will be running at http://localhost:5050

# COMPSCI 561 Project

This is an example REST API that is vulnerable to SQL injections.
It simulates a database of a nonprofit organization that contains all its donations.
The goal is to find a vulnerable endpoint that allows SQL injections.

## How to use the API

### Donors

Only GET requests are allowed.
You can query all donors with the following endpoint:

    GET /donor/

Additionally, you can query a specific donor and all its donations with this endpoint:

    GET /donor/<donor id>

Finally, you can filter donors by first name and last name:

    GET /donor/?first_name=<first name>
    GET /donor/?last_name=<last name>
    GET /donor/?first_name=<first name>&last_name=<last name>

### Donations

Again, only GET requests are allowed.
You can query all donors with the following endpoint:

    GET /donation/

To query a specific donation, including the donor's first and last name, use this endpoint:

    GET /donation/<donation id>

## Installing and running the app

### Step 1:

First, create a .env file with the following content in the root directory of the app:

    # web application variables
    PORT_NUMBER=8080

    # postgresql database variables
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_USER=<postgres username>
    POSTGRES_HOST=db
    POSTGRES_PORT=5432

You can modify the values of the variables if you wish. However, you must also update the docker-compose.yml file accordingly.

### Step 2:

Assuming that docker is installed, type:

    docker compose up --build -d

This will install all dependencies and run the app on port 8080.
The port can be changed in the docker-compose.yml file.
This command also ensures that the application automatically starts when the server is rebooted.

To stop the app, type:

    docker compose down
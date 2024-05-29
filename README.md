# Script Generator Batch

Welcome to the **Script Generator Batch** project !

## Prerequisites

To use this application, you need the following:

1. One or several JAR file(s) of the application.
2. A ZIP file containing `population`.

## Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/Script-Generator/FILA1_Script_Generator.git
   cd FILA1_Script_Generator
   ```

## usage

1. Start web application

   ```sh
   npm install
   npm run dev
   ```

2. Fill Out the Form

3. Verify and export the script

The folder structure should look like this on the server:

   ```sh
   .
   ├── log
   ├── population
   ├── jar
   └── script.sh
   ```

## Using Docker

1. Build the Docker Image:
   ```sh
   docker-compose build
   ```

2. Run the Docker Container:

   ```sh
   docker-compose up
   ```

## Contributors

- Adam Guillet
- Tom Freret
- Titouan Cocheril
- Leo Joly-Jehenne
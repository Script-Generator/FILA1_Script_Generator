# Batch Script Generator

Welcome to the **Batch Script Generator** project!

## Prerequisites

Before using this application, ensure you have the following:

1. One or many JAR file of the application to test.
2. A ZIP file containing 'population' files.

## Installation

1. **Clone the Repositories:**

   ```sh
   git clone https://github.com/Script-Generator/FILA1_Script_Generator_back.git
   git clone https://github.com/Script-Generator/FILA1_Script_Generator.git
   ```

## Configuration

Create a `.env` file inside `FILA1_Script_Generator_back` with the following format:

```sh
SSH_HOST=
SSH_PORT=
SSH_USER=
SSH_PASS=
```

## Usage

1. Start the web application:

   ```sh
   npm install
   npm run dev  # This will also start a Python server for automatic deployment
   ```

2. Fill out the form.
3. Make necessary changes in the code editor space.
4. Verify and export the script (you can download locally or export to the server you have configured).

The folder structure should look like this on the server:

```sh
.
├── LOGS
├── INSTANCES
├──  JAR
├── commandLines.txt
└── script.sh
```

## Contributors

- Adam Guillet
- Tom Freret
- Titouan Cocheril
- Leo Joly-Jehenne

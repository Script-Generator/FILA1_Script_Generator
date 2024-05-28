import fs from "fs";
import path from "path";

// Function to get random files from a directory
function getRandomFilesNamesByExtension(directory, extension, n) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const filteredFiles = files.filter(
          (file) => path.extname(file) === extension,
        );
        const totalFiles = filteredFiles.length;

        // Ensure n is not greater than the total number of files
        n = Math.min(n, totalFiles);

        if (n <= 0) {
          reject(
            new Error(
              `No files with extension '${extension}' found in ${directory}`,
            ),
          );
        } else {
          const randomFiles = [];
          const selectedIndices = new Set();

          // Generate n random indices
          while (selectedIndices.size < n) {
            const randomIndex = Math.floor(Math.random() * totalFiles);
            selectedIndices.add(randomIndex);
          }

          // Get the file paths corresponding to the random indices
          selectedIndices.forEach((index) => {
            randomFiles.push(path.join(directory, filteredFiles[index]));
          });

          resolve(randomFiles);
        }
      }
    });
  });
}

function getRandomFilesByExtension(directory, extension, n) {
  return getRandomFilesNamesByExtension(directory, extension, n)
    .then((randomFiles) => {
      console.log(`Random ${extension} files retrieved from ${directory}`);
      if (randomFiles.length > 0) {
        if (randomFiles.length < n) {
          console.log(
            `Only ${randomFiles.length} files found with extension '${extension}' in ${directory}`,
          );
        }
        randomFiles.forEach((file) => console.log(file));
      } else {
        throw new Error(
          `No files with extension '${extension}' found in ${directory}`,
        );
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

// Example usage
const directory = "C:\\Users\\adamg\\Documents\\IMT\\1A\\Projet agile\\Test";
const extension = ".txt";
const n = 3000; // Number of random files to retrieve
runGetRandomFilesByExtension(directory, extension, n);

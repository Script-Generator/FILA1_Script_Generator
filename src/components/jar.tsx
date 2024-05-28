import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";
import {Label} from "@/components/ui/label.tsx";

const Jar = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jvmArgs, setJvmArgs] = useState<string>("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleJvmArgsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJvmArgs(event.target.value);
  };

  return (
      <>
        <div className="flex flex-col text-start gap-6">
          <div>
            <h2 className="text-xl font-bold">JAR Options</h2>
            <p>.jar file upload or selection and arguments selection</p>
          </div>

          <div className="flex-col">
            <div className="flex gap-6">
              <input id="fileUpload" type="file" accept=".jar" onChange={handleFileChange} style={{ display: "none" }}/>
              <button onClick={() => document.getElementById("fileUpload")?.click()}
                  className={`px-4 py-2 rounded ${selectedFile ? "bg-secondaryGray cursor-not-allowed" : "bg-blackBleu text-white"}`}
                  disabled={!!selectedFile}>
                {selectedFile ? "Uploaded JAR" : "Upload JAR"}
              </button>
              {selectedFile && (
                  <div className="flex items-center">
                    <span className="icon-file mr-2">📄</span>
                    <span>{selectedFile.name}</span>
                  </div>
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="jvmArgs">JVM Args</Label>
              <Input
                  type="text"
                  placeholder="-XX:+UseSerialGC -server -Xmx8G -Xss128M"
                  value={jvmArgs}
                  onChange={handleJvmArgsChange}
              />
            </div>
          </div>
        </div>
      </>
  );
};

export default Jar;

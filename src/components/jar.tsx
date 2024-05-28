import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

const Jar = () => {
  return (
    <>
      <div className="text-start">
        <h2 className="text-xl font-bold">JAR Options</h2>
        <p>.jar file upload or selection and arguments selection</p>
        <Label htmlFor="customConfig">Custom config</Label>
        <Input type="text" placeholder="lvl RESANA -limit (20m) -f -lc 1 -restarts [LUBY,500,5000] -valh MIN" />
        <Label htmlFor="customConfig">AnotherInputConfig</Label>
        <Input type="text" placeholder="-valh MIN" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Others Params</SelectLabel>
              <SelectItem value="apple">Titi</SelectItem>
              <SelectItem value="banana">Toto</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

  const handleJvmArgsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJvmArgs(event.target.value);
  };
  const handleAbsolutePathChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAbsolutePath(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col text-start gap-6">
        <div>
          <h2 className="text-xl font-bold">JAR Options</h2>
          <p>.jar file upload or selection and arguments selection</p>
        </div>

        <div className="flex-col">
          <Label htmlFor="jvmArgs">Absolute Path</Label>
          <Input
            type="text"
            placeholder="/home/cprudhom/jars/"
            value={jvmArgs}
            onChange={handleAbsolutePathChange}
          />
          <div className="flex gap-6 mt-4">
            <input
              id="fileUpload"
              type="file"
              accept=".jar"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              onClick={() => document.getElementById("fileUpload")?.click()}
              className={`px-4 py-2 rounded ${selectedFile ? "bg-secondaryGray cursor-not-allowed" : "bg-blackBleu text-white"}`}
              disabled={!!selectedFile}
            >
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

import Jar from '@/components/jar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import ServerPath from '@/components/serverPath.tsx';
import Configuration from "@/components/configuration.tsx";
import Args from "@/components/args.tsx";
import Sbatch from "@/components/sbatch.tsx";
import Population from "@/components/population/population.tsx";

const components = [
  Configuration,
  ServerPath,
  Population,
  Jar,
  Args,
  Sbatch
];


const FormParams = () => {
  return (
      <div className="p-8">
        <div className="flex flex-col space-y-8">
          {components.map((Component, index) => (
              <div key={index} className="space-y-8">
                <Component />
                {index < components.length - 1 && <Separator />}
              </div>
          ))}
        </div>
      </div>
  );
};

export default FormParams;

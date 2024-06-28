import Jar from '@/components/jar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import ServerPath from '@/components/serverPath.tsx';
import Configuration from '@/components/configuration.tsx';
import Sbatch from '@/components/sbatch.tsx';
import Population from '@/components/population/population.tsx';
import JvmArgs from '@/components/jvmArgs.tsx';
import LogOption from '@/components/log';

const components = [Configuration, ServerPath, Sbatch, Population, JvmArgs, Jar, LogOption];

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

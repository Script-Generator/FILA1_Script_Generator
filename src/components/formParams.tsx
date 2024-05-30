import Jar from '@/components/jar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import ServerPath from '@/components/serverPath.tsx';
import Configuration from '@/components/configuration.tsx';
import Sbatch from '@/components/sbatch.tsx';
import Population from '@/components/population/population.tsx';
import JvmArgs from './jvmArgs';

const FormParams = () => {
  return (
    <div className="p-8">
      <div className="flex-col p-2 space-y-8">
        <Configuration />
        <Separator />
        <ServerPath />
        <Separator />
        <Sbatch />
        <Separator />
        <Population />
        <Separator />
        <JvmArgs />
        <Separator />
        <Jar />
      </div>
    </div>
  );
};

export default FormParams;

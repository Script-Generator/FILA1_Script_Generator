import Jar from '@/components/jar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormProvider } from '@/context/formContext.tsx';
import ServerPath from '@/components/serverPath.tsx';
import Configuration from "@/components/configuration.tsx";
import Args from "@/components/args.tsx";
import Sbatch from "@/components/sbatch.tsx";
import Population from "@/components/population/population.tsx";

const FormParams = () => {
  return (
    <FormProvider>
      <div className="p-8">
        <div className="flex-col p-2 space-y-8">
          <Configuration/>
          <Separator/>
          <ServerPath />
          <Separator />
          <Population />
          <Separator />
          <Jar />
          <Separator/>
          <Args/>
          <Separator/>
          <Sbatch/>
        </div>
      </div>
    </FormProvider>
  );
};

export default FormParams;

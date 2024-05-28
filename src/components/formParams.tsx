import Jar from '@/components/jar.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormProvider } from '@/context/formContext.tsx';
import ServerPath from '@/components/serverPath.tsx';
import PopulationChoice from '@/components/population/choiceButton.tsx';

const FormParams = () => {
  return (
    <FormProvider>
      <div className="p-8">
        <div className="flex-col p-2 space-y-8">
          <ServerPath />
          <Separator />
          <PopulationChoice />
          <Separator />
          <Jar />
        </div>
      </div>
    </FormProvider>
  );
};

export default FormParams;

import JobPopulation from "@/components/population.tsx";
import Jar from "@/components/jar.tsx";
import { Separator } from "@/components/ui/separator.tsx";

const FormParams = () => {
  return (
    <div className="p-8">
      <div className="flex-col p-2 space-y-10">
        <JobPopulation />
        <Separator />
        <Jar />
      </div>
    </div>
  );
};

export default FormParams;

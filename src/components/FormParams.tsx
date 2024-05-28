import Jar from "@/components/jar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import ChoiceButton from "@/components/population/choiceButton.tsx";

const FormParams = () => {
    return (
        <div className="p-8 w-full">
            <div className="flex flex-col space-y-10 flex-grow flex-shrink w-4/5 max-w-full min-w-1/5">
                <ChoiceButton />
                <Separator />
                <Jar />
            </div>
        </div>
    );
};

export default FormParams;

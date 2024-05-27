import JobPopulation from "@/components/population.tsx";
import Jar from "@/components/jar.tsx";

const FormParams = () => {
    return (
        <>
            <div className="flex-col p-2 space-y-10">
                <JobPopulation/>
                <Jar/>
            </div>
        </>
    )
}

export default FormParams;

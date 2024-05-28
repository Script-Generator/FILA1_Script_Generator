import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

const JobPopulation = () => {
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
    )
}

export default JobPopulation;

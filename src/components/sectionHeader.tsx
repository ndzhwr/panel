import { type FC } from "react"
import { type SectionHeaderProps } from "../types/types"
import { toSingular } from "../utils/toSingular"

const SectionHeader: FC<SectionHeaderProps> = ({ section, action }: SectionHeaderProps) => {
    return (
        <div className="py-2 flex justify-between items-center ">
            <span className="text-white text-2xl font-bold capitalize">{section as string}</span>
            <button className="bg-blue-600 text-white px-4 py-3 bg-opacity-5 rounded-md bg-gradient-to-br from-[#de2828] via-[#0046a2]  to-[#0046a2]" onClick={action}>Add new {toSingular(section)}</button>
        </div>
    )
}

export default SectionHeader
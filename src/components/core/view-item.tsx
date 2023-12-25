import _ from "lodash"

type Props = {
    label: string
    value: string
}

export default function ViewItem({ label, value }: Props) {
    return <div className="flex flex-col">
        <p className="text-[10px] text-neutral-600">{_.toUpper(label)}</p>
        <p >
            {value}
        </p>
    </div>
}
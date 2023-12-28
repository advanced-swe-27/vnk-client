

type Props = {
    count: number
    label: string
    icon: React.ReactNode
}

export default function DashboardCard({ count, icon, label }: Props) {
    return (
        <article className="w-full grid grid-cols-2 border rounded-lg p-4">
            <div className="">
                <p className="text-4xl">
                    {count}
                </p>
                <p className="text-neutral-600">
                    {label}
                </p>

            </div>
            <div className="flex items-center  justify-end stroke-neutral-500 text-neutral-500">
                {icon}
            </div>

        </article>

    )
}
import ReactLoading, { LoadingType } from 'react-loading';

type Props = {
    type?: LoadingType
    color?: string
    height?: number | string
    width?: number | string
}

export default function CustomLoader({ color, height, type, width }: Props) {
    return (
        <ReactLoading type={type || "bars"} color={color || "#bbb"} height={height || 40} width={width || 40} />
    )
}
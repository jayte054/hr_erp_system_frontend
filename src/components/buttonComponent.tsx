export const CustomButton: React.FC<any> = ({onClick, label, ...props}) => {

    return (
        <div>
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    )
}
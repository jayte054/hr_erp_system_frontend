export const CustomButton: React.FC<any> = ({onClick, label,}) => {

    return (
        <div>
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    )
}
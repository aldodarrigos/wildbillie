import Input from "@/components/base/Input";

export default function AppInput( { placeholder, className, ...rest }: { placeholder: string, className: string} ) {
    return (
        <Input
            placeholder={placeholder}
            className={className}
            {...rest}
        />
    )
}
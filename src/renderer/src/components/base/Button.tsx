import {
    Button as ChakraButton,
    ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import BeatLoader from 'react-spinners/BeatLoader'

interface ButtonProps extends ChakraButtonProps {
    label: string | React.ReactNode,
    onClick: () => void,
    isLoading?: boolean,
    icon?: React.ReactNode,
    w?: string,
    h?: string,
    fontSize?: string,
    fontWeight?: string,
    isDisabled?: boolean,
    isOutline?: boolean,
}

export default function Button({
    label,
    onClick,
    isOutline = false,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <ChakraButton
            w={props.w || '100%'}
            h={props.h || '3rem'}
            color={isOutline ? 'var(--green-500)' : 'var(--white)'}
            bgColor={isOutline ? 'var(--white)' : 'var(--green-500)'}
            border="1px solid var(--green-500)"
            borderRadius="0.8125rem"
            isLoading={props.isLoading}
            spinner={<BeatLoader size={8} color={isOutline ? 'var(--green-500)' : 'var(--white)'} />}
            fontSize={props.fontSize || '1rem'}
            fontWeight={props.fontWeight || '700'}
            isDisabled={props.isDisabled}
            _hover={{
                backgroundColor: !props.isLoading && 'var(--green-600)',
                color: !props.isLoading && 'var(--white)',
                border: !props.isLoading && '1px solid var(--green-600)',
            }}
            onClick={onClick}
            {...props}
        >
            {label}
        </ChakraButton>
    )
}
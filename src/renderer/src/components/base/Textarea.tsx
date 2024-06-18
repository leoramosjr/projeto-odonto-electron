import {
    Flex,
    Text,
    Textarea as ChakraTextarea,
    InputGroup,
    TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'
import { useState } from 'react'

interface TextareaProps extends ChakraTextareaProps {
    display?: string,
    name?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    leftChildren?: React.ReactNode,
    rightChildren?: React.ReactNode,
    bold?: boolean,
    isEditing?: boolean,
}

export default function Textarea({
        display = "flex",
        name,
        label,
        type,
        placeholder,
        value,
        onChange,
        leftChildren,
        rightChildren,
        isEditing = true,
        bold,
        ...props
    } : TextareaProps): JSX.Element {

    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <Flex
            w="100%"
            direction="column"
            display={display ? "flex" : "none"}
        >
            <Text
                fontSize="0.75rem"
                color={isFocused ? "#066964" : "#828282"}
                bgColor="white"
                ml="0.5rem"
                transform="translateY(8px)"
                zIndex="2"
                w="fit-content"
                px="0.5rem"
                borderRadius="0.25rem"
                fontWeight={bold ? "700" : "500"}
            >
                {label}
            </Text>
            <InputGroup>
                {leftChildren}
                <ChakraTextarea
                    disabled={!isEditing}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    w="100%"
                    h="2.5rem"
                    borderRadius="0.25rem"
                    _placeholder={{
                        color: isFocused ? "#066964" : "#828282",
                    }}
                    focusBorderColor='#066964'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {rightChildren}
            </InputGroup>
        </Flex>
    )
}
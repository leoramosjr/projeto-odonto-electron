import {
    Flex,
    Text,
    Select as ChakraSelect,
    SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'
import { useState } from 'react'

interface SelectProps extends ChakraSelectProps{
    isEditing?: boolean,
    bold?: boolean,
    display?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    optionsList: string[],
}

export default function Select({
        isEditing = true,
        bold,
        display = "flex",
        name,
        label,
        placeholder,
        value,
        onChange,
        optionsList,
        ...props
    } : SelectProps): JSX.Element {

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
                fontWeight={bold ? "700" : "500"}
                borderRadius="0.25rem"
            >
                {label}
            </Text>
            <ChakraSelect
                disabled={!isEditing}
                name={name}
                placeholder={placeholder}
                value={value}
                w="100%"
                h="2.5rem"
                borderRadius="0.25rem"
                _placeholder={{
                    color: isFocused ? "#066964" : "#828282",
                }}
                focusBorderColor='#066964'
                onFocus={() => {setIsFocused(true)}}
                onBlur={() => {setIsFocused(false)}}
                onChange={onChange}
                {...props}
            >
                {optionsList.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </ChakraSelect>
        </Flex>
    )
}
import {
    Flex,
} from '@chakra-ui/react'

export default function NumberButton(
        {number, isActive, onClick, hidden} :
        {number: number, isActive?: boolean, onClick: () => void, hidden?: boolean}
    ): JSX.Element {

    return (
        <Flex
            display={hidden ? "none" : "flex"}
            w="2.5rem"
            h="2.5rem"
            align="center"
            justify="center"
            borderRadius="0.5rem"
            fontFamily="Montserrat, sans-serif"
            fontSize="1rem"
            fontWeight="700"
            lineHeight="1.5rem"
            border={isActive ? "2px solid var(--green-500)" : "none"}
            color={isActive ? "var(--green-500)" : "#FFF"}
            bgColor={isActive ? "#FFF" : "var(--green-500)"}
            draggable={false}
            cursor="pointer"
            _hover={{
                backgroundColor: "var(--green-600)",
                color: "var(--white)",
                border: "2px solid var(--green-600)",
            }}
            onClick={onClick}
            transition="all 0.1s ease-in-out"
        >
            {number}
        </Flex>
    )
}
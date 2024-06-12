import {
    Flex,
    Skeleton,
} from '@chakra-ui/react'
import Button from '../base/Button';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NumberButton from './NumberButton';


interface IPaginationProps {
    isLoading?: boolean,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    totalPages: number,
}

export default function Pagination({isLoading, currentPage, setCurrentPage, totalPages}: IPaginationProps): JSX.Element {

    function renderNumbers(): JSX.Element[] | JSX.Element{
        if(totalPages <= 5) {
            return Array.from({length: totalPages}, (_, i) => i + 1).map(number => (
                <NumberButton
                    key={number}
                    number={number}
                    isActive={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                />
            ))
        } else {
            return (
                <>
                    <Flex m="0" p="0" direction={currentPage <= 3 ? "row-reverse" : "row"}>
                        <NumberButton
                            hidden={currentPage <= 2}
                            number={1}
                            onClick={() => setCurrentPage(1)}
                        />
                        <Flex
                            hidden={!(currentPage <= 3)}
                            w="2.5rem"
                        />
                        <Flex
                            hidden={currentPage === 3}
                            w="2.5rem"
                            h="2.5rem"
                            align="center"
                            justify="center"
                            fontFamily="Poppins"
                            fontSize="1rem"
                            fontWeight="700"
                            lineHeight="1.5rem"
                            color={"#666D70"}
                        >
                            {currentPage <= 3 ? null : '...'}
                        </Flex>
                    </Flex>
                    <NumberButton
                        number={currentPage === 1 ? 1 : currentPage === totalPages ? totalPages - 2 : currentPage - 1}
                        isActive={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage === totalPages ? totalPages - 2 : currentPage - 1)}
                    />
                    <NumberButton
                        number={currentPage === 1 ? 2 : currentPage === totalPages ? totalPages - 1 : currentPage}
                        isActive={currentPage !== 1 && currentPage !== totalPages}
                        onClick={() => setCurrentPage(currentPage === 1 ? 2 : currentPage === totalPages ? totalPages - 1 : currentPage)}
                    />
                    <NumberButton
                        number={currentPage === 1 ? 3 : currentPage === totalPages ? totalPages : currentPage + 1}
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage === 1 ? 3 : currentPage === totalPages ? totalPages : currentPage + 1)}
                    />
                    <Flex m="0" p="0" direction={currentPage >= totalPages - 2 ? "row-reverse" : "row"}>
                        <Flex
                            hidden={currentPage === totalPages - 2}
                            w="2.5rem"
                            h="2.5rem"
                            align="center"
                            justify="center"
                            fontFamily="Poppins"
                            fontSize="1rem"
                            fontWeight="700"
                            lineHeight="1.5rem"
                            color={"#666D70"}
                        >
                            {currentPage >= totalPages - 2 ? null : '...'}
                        </Flex>
                        <Flex
                            hidden={!(currentPage >= totalPages - 2)}
                            w="2.5rem"
                        />
                        <NumberButton
                            hidden={currentPage >= totalPages - 1}
                            number={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        />
                    </Flex>
                </>
            )
        }
    }

    return (
        <Skeleton
            display="flex"
            isLoaded={!isLoading}
            w={isLoading ? "calc(100% - 3rem)" : "100%"}
            py="1.5rem"
            px="1rem"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.5rem"
            borderRadius="0.625rem"
            ml={isLoading ? "1.5rem" : "0"}
            mb={isLoading ? "1.5rem" : "0"}
        >
                <Button
                    isDisabled={currentPage === 1}
                    label="Anterior"
                    fontFamily="Montserrat, sans-serif"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    w="fit-content"
                    h="2.5rem"
                    fontSize="1rem"
                    fontWeight="700"
                    leftIcon={<FiChevronLeft />}
                />
                {renderNumbers()}
                <Button
                    isDisabled={currentPage === totalPages}
                    label="Próximo"
                    fontFamily="Montserrat, sans-serif"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    w="fit-content"
                    h="2.5rem"
                    fontSize="1rem"
                    fontWeight="700"
                    rightIcon={<FiChevronRight />}
                />
        </Skeleton>
    )
}
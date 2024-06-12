import {
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import EventModal from '../../components/EventModal';
import Sidebar from '../../components/SideBar';

export default function Callendar(): JSX.Element {

    document.title = `Calendários | • NR •`

    const [selectedDate, setSelectedDate] = useState('')
    const { isOpen, onOpen, onClose} = useDisclosure();
    const events = [
        {
          title: 'The Title',
          start: '2024-05-02',
          end: '2024-05-02',
          color: 'var(--chakra-colors-blue-400)'
        },
        {
          title: 'The Title',
          start: '2024-05-02',
          end: '2024-05-02',
          color: 'var(--chakra-colors-red-400)'
        }
      ]

    return (
        <Flex
            minW="100vw"
            minH="100vh"
            maxW="100vw"
            bg="#FCFCFC"
            p="2rem 1.5rem 2rem 6.5rem"
            direction="column"
            overflowX="hidden"
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={"bold"} fontSize={"1.5rem"}>Novo Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EventModal
                            selectable
                            date={selectedDate}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Sidebar />
            <Flex
                display={'block'}
                minW="100%"
                minH="calc(100vh - 4rem)"
                bg="white"
                borderRadius="0.5rem"
                boxShadow="7px 4px 18.4px 0px rgba(0, 107, 215, 0.15)"
                p="2rem 1.5rem 4rem 1.5rem"
            >
                <Flex
                    w="100%"
                    align="center"
                    justify="space-between"
                    mb="2rem"
                >
                    <Text
                        fontSize="1.65rem"
                        fontWeight="600"
                        fontFamily="Dm Sans"
                    >
                        Dra. Natália Rossoni
                    </Text>
                    <Button
                        bg="#43A29D"
                        color="white"
                        fontWeight="bold"
                        fontSize="0.875rem"
                        lineHeight="1.25rem"
                        transition="all 0.1s ease-in-out"
                        px="1.5rem"
                        _hover={{
                            bg: '#52c8c2',
                        }}
                        onClick={() => {
                            setSelectedDate('')
                            onOpen()
                        }}
                    >
                        Adicionar Novo Evento
                    </Button>
                </Flex>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    contentHeight={550}
                    height={900}
                    headerToolbar={{
                        left: 'title',
                        right: 'prev next',
                    }}
                    locale={'pt-br'}
                    events={events}
                    dateClick={(info) => {
                        setSelectedDate(info.dateStr)
                        onOpen()
                    }}
                />
            </Flex>
        </Flex>
    )
}
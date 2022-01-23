import {Box, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {ICountdownModalProps} from "./ICountdownModalProps";
import "./CountdownModal.scss";

export const CountdownModal = (props: ICountdownModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeLeft, setTimeLeft] = useState(3);

    // runs only on initial load of component
    useEffect(() => {
        // show modal
        onOpen()

        // start countdown
        setTimeLeft(3)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            // once time is up, start the round
            if(timeLeft === 0) {
                countdownUp()
            }
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [timeLeft]);

    // callback function
    function countdownUp() {
        onClose()
        props.onCountdownUp()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent borderRadius="lg" mx={2}>
                <ModalHeader px={3} py={0} className="hs-modal-header">
                    <Box>
                        <svg className="hs-card-header">
                            <text className="bottom" x="10" y="40">Ready for Round {props.currentRound}?</text>
                            <text className="top" x="10" y="40">Ready for Round {props.currentRound}?</text>
                        </svg>
                    </Box>
                </ModalHeader>

                <ModalBody px={5} pb={5} display="flex" minHeight="10em">
                    {timeLeft > 0 && <Box width="100%" display="flex" justifyContent="center" alignItems="center" fontSize="6xl" fontWeight="light">{timeLeft}</Box>}
                    {timeLeft === 0 && <Box width="100%" display="flex" justifyContent="center" alignItems="center" fontSize="4xl" fontWeight="light">Get Ready!</Box>}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
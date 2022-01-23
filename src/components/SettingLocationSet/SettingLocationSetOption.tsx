import React from "react";
import {Box, Tooltip, useRadio} from "@chakra-ui/react";
import {IoBusiness, IoFootball, IoInformationCircle} from "react-icons/io5";

export const SettingLocationSetOption = (props: any) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const headingBoxProps = {
        variant: "haystack-heading"
    }

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    const getIcon = (group: string) => {
        switch(group) {
            case 'Football Stadiums':
                return <IoFootball size="3.5em" />
            case 'Cities':
            default:
                return <IoBusiness size="3.5em" />
        }
    }

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="3px"
                borderRadius="lg"
                borderColor="haystack.600"
                bg="white"
                color="gray.600"
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="xs"
                display="flex"
                position="relative"
                h="100%"
                alignItems="center"
                _checked={{
                    bg: "haystack.600",
                    color: "white",
                }}
                _focus={{
                    boxShadow: "outline"
                }}
                px={3}
                py={2}
                flexDir="column"
            >
                <Box
                    color="gray.200"
                    position="absolute"
                    bottom={0}
                    left={0}
                    ml={2}
                    mb={2}
                >
                    {getIcon(props.children.group)}
                </Box>

                <Box
                    display="flex"
                    w="100%"
                    zIndex={999}
                >
                    <Box
                        fontSize="lg"
                        fontWeight="300"
                        textTransform="none"
                        alignSelf="start"
                        mb={2}
                    >
                        {props.children.name}
                    </Box>
                    <Box
                        ml="auto"
                    >
                        <Tooltip label={props.children.info} placement="bottom">
                            <Box color="gray.600"><IoInformationCircle size="2em" /></Box>
                        </Tooltip>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    w="100%"
                    zIndex={999}
                >
                    <Box
                        {...headingBoxProps}
                        alignSelf="end"
                        ml="auto"
                    >{props.children.group}</Box>
                </Box>
            </Box>
        </Box>
    )
}
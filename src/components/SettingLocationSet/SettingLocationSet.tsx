import {SimpleGrid, useRadioGroup} from "@chakra-ui/react";
import React from "react";
import {SettingLocationSetOption} from "./SettingLocationSetOption";
import {ISettingLocationSetProps} from "./ISettingLocationSetProps";

export const SettingLocationSet = (props: ISettingLocationSetProps) => {
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "locationSet",
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onSettingChange,
    })

    const group = getRootProps()

    return (
        <SimpleGrid
            columns={{base: 1, sm: 2, md: 4}}
            spacing={{base: 2, sm: 4}}
            {...group}
        >
            {
                Array
                    .from(props.locationSets, ([name, value]) => (value))
                    .map((val) => {
                        const radio = getRadioProps({ value: val.id })
                        return (
                            <SettingLocationSetOption
                                key={val.id}
                                {...radio}
                                isDisabled={!props.userIsAdmin}
                            >
                                {val}
                            </SettingLocationSetOption>
                        )
                    })
            }
        </SimpleGrid>
    )
}
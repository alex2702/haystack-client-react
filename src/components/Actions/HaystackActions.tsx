import {Box} from "@chakra-ui/react";
import React from "react";
import {IHaystackActionsProps} from "./IHaystackActionsProps";
import "./HaystackActions.scss";

export const HaystackActions = (props: IHaystackActionsProps) => {
    if(props.floating) {
        return (
            <Box
                pb={3}
                position="absolute"
                display="flex"
                justifyContent="center"
                bottom={0}
                zIndex={1100}
                width="100%"
                pointerEvents="none"
                className="hs-actions-floating"
            >
                {props.children.length > 1 && props.children.map((child: any) => {
                    if (!!child.props.admin === props.userIsAdmin) {
                        return child
                    } else {
                        return null
                    }
                })}
            </Box>
        )
    } else {
        return (
            <Box pt={6} display="flex" justifyContent="center">
                {React.Children.map(props.children, (child, index) => {
                    if (!!child.props.admin === props.userIsAdmin) {
                        return child
                    } else {
                        return null
                    }
                })}

            </Box>
        )
    }
}
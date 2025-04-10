import React from 'react'
import { withStyles, Checkbox } from '@material-ui/core'

export default function CustomCheckBox({color, checkedColor, ...props }) {
    const StyledCheckBox = withStyles(theme => ({
        root: {
            color: color,
            '&:hover': {
                backgroundColor: "transparent",
            },
            '&$checked': {
              color: checkedColor,
            },
          },
          checked: {},
    }))(Checkbox)
    return (
        <StyledCheckBox {...props} />
    )
}
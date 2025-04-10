import React from 'react'
import { Controller } from "react-hook-form";
import { withStyles, TextField } from '@material-ui/core'

const StyledTextField = withStyles(theme => ({
    root: {
        '& .MuiInputLabel-root': {
            color: '#000',
            fontSize: 14, 
            textTransform: 'capitalize',
            paddingLeft: '17px',
        },
        '& .MuiInputBase-formControl': {
            backgroundColor: "transparent",
            borderRadius: 4,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d5d5d5'
            }
        },
        "& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after": {
            content: "normal"
        },
        '& .MuiInputBase-input': {
            color: '#333333',
            fontSize: 14,
            padding: '10px 15px',
            backgroundColor: "#fff",
            borderRadius: 4,
            height: 18,
            border: "1px solid #e0e0e0",
            '&:-webkit-autofill': {
                animation: 'none !important'
            },
            '&::placeholder': {
                color: "#656565",
                opacity: 1
            },
            '& .input:-internal-autofill-selected': {
                backgroundColor: '#F0F0F0 !important'
            },
            
        },
        '& .MuiInputBase-root': {
            '& .MuiInputAdornment-positionEnd': {
                paddingRight: theme.spacing(1)+2,
                color: '#666666cc'
            }
        },
        '& .MuiOutlinedInput-root.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
                boxShadow: '0 2px 4px rgb(0 0 0 / 12%)',
                borderColor: '#EA0027'
            }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E4BC8D',
                boxShadow: '0 2px 4px rgb(0 0 0 / 12%)',
                borderWidth: 1
            }
        },
        
    }
}))(TextField)

export default function CustomTextField(props) {
    if(props.control) {
        return <Controller as={StyledTextField} {...props} />
    }else{
        return <StyledTextField {...props} />
    }
}

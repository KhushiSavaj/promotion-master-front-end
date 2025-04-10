import React, { useEffect } from 'react';
import * as authUtil from "../utils/auth.util";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import stepImg1 from '../assets/images/step-img1.png';
import stepImg2 from '../assets/images/step-img2.png';
import stepImg3 from '../assets/images/step-img3.png';
import stepImg4 from '../assets/images/step-img4.png';
import stepImg5 from '../assets/images/step-img5.png';
import stepImg6 from '../assets/images/step-img6.png';

const tutorialSteps = [
  {
    imgPath: stepImg1,
    label: 'Test 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
  {
    imgPath: stepImg2,
    label: 'Test 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
  {
    imgPath: stepImg3,
    label: 'Test 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
  {
    imgPath: stepImg4,
    label: 'Test 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
  {
    imgPath: stepImg5,
    label: 'Test 5',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
  {
    imgPath: stepImg6,
    label: 'Test 6',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra nulla vitae dignissim vehicula. Donec a urna ut turpis sagittis hendrerit at ac odio. In hac habitasse platea dictumst. Nunc in fermentum lectus.',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: [[20, '20%']],
    
    [theme.breakpoints.down("lg")]: {
      padding: [[20, '10%']],      
    },

    [theme.breakpoints.down("sm")]: {
      padding: [[20, 0]],
    },

    '& h4': {
      width: '100%',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: 24,
      color: '#000',
      marginBottom: 20,

      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        marginBottom: 10
      },

    },

    '& p': {
      width: '100%',
      fontSize: 16,
      lineHeight: '1.5',
      textAlign: 'center',

      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },

    }

  },
  imgaeBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    position: 'relative'
  },
  img: {
    height: 'auto',
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function TextMobileStepper({onClose}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  useEffect(() => {
    if(localStorage.getItem('visited') === 'true'){
      onClose()
    }
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.imgaeBox}>
       <img
          className={classes.img}
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        />
      </div>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h4">{tutorialSteps[activeStep].label}</Typography>
        <Typography variant="body1">{tutorialSteps[activeStep].content}</Typography>
      </Paper>
      
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={activeStep === maxSteps - 1 ? 
          <Button size="small" onClick={onClose}>
            Finish
          </Button>
          :
          <Button size="small" onClick={handleNext}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}
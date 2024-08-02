import { Flex, Step, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus } from "@chakra-ui/react";
import React from "react";

function WordStepper({gameInfo, questionList}) {

    let paddingVertical;
    const posePerQuestion = questionList[gameInfo.currentQuestion].totalStep;
    const poseNumber = gameInfo.currentStep;

    switch (posePerQuestion) {
        case 2: paddingVertical = '11rem'; break;
        case 3: paddingVertical = '8rem'; break;
        case 4: paddingVertical = '6rem'; break;
        case 5: paddingVertical = '4rem'; break;
        default: paddingVertical = '0'; break;
    }

    return (
        <Flex justifyContent="center" position="absolute" h="100%" left="-50px" top="0" py={paddingVertical}>
            <Stepper orientation='vertical' index={poseNumber - 1} gap="0" height='100%' justifyContent="center">
                {Array.from({length: posePerQuestion}).map((_, index) => (
                    <Step key={index}>
                        <StepIndicator
                            sx={{
                                borderColor: "amber.300!important",
                                bg: index === poseNumber - 1 ? 'amber.300' : index < poseNumber - 1 ? ' amber.300!important' : 'white',
                                color: index === poseNumber - 1 ? 'white' : index < poseNumber - 1 ? 'white' : 'black'
                            }}
                        >
                            <StepStatus
                                complete={<StepIcon/>}
                                incomplete={<StepNumber/>}
                                active={<StepNumber/>}
                            />
                        </StepIndicator>
                        <StepSeparator
                            bg={index === poseNumber - 1 ? 'blueGray.50' : index < poseNumber - 1 ? ' amber.300!important' : 'blueGray.50'}/>
                    </Step>
                ))}
            </Stepper>
        </Flex>
    );
}

export default WordStepper;
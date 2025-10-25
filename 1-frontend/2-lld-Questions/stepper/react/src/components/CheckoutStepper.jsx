/* eslint-disable react/prop-types */

import {useEffect, useRef, useState} from "react";

const CheckoutStepper = ({stepsConfig = []}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = () => {
        setCurrentStep((prevStep) => {
            if (prevStep === stepsConfig.length) {
                setIsComplete(true);
                return prevStep;
            } else {
                return prevStep + 1;
            }
        });
    };

    const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

    const progressPercentage = ((currentStep - 1) / (stepsConfig.length - 1)) * 100;

    return (
        <>
            <div className="stepper">
                {stepsConfig.map((step, index) => {
                    return (
                        <div
                            key={step.name}
                            className={`step ${
                                currentStep > index + 1 || isComplete ? "complete" : ""
                            } ${currentStep === index + 1 ? "active" : ""} `}
                        >
                            <div className="step-number">
                                {currentStep > index + 1 || isComplete ? (
                                    <span>&#10003;</span>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className="step-name">{step.name}</div>
                        </div>
                    );
                })}

                <div className="progress-bar">
                    <div className="fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <ActiveComponent />

            {!isComplete && (
                <button className="btn" onClick={handleNext}>
                    {currentStep === stepsConfig.length ? "Finish" : "Next"}
                </button>
            )}
        </>
    );
};

export default CheckoutStepper;

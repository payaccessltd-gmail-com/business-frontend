"use client"

import { useStepper } from 'headless-stepper'
import React, { useMemo } from 'react'
import { Typography } from 'components/ui/Typography'



function Stepper() {

  const steps = useMemo(
    () => [
      { label: "Step 1" },
      { label: "Step 2" },
      { label: "Step 3" },
      { label: "Step 4", disabled: true },
      { label: "Step 5" },
      { label: "Step 6" },

    ],
    []
  );

  const { state, stepperProps, stepsProps, progressProps } = useStepper({
    steps
  });

  const barSize = useMemo(
    () => Math.ceil((state.currentStep / (steps?.length - 1)) * 100),
    [state, steps]
  );
  return (
    <div className='pb-5'>

      <>
        <nav className="relative my-4 grid w-full grid-cols-6" {...stepperProps}>
          <ol className="z-10 col-span-full flex flex-row">
            {stepsProps?.map((step, index) => (
              <li className="flex-[1_0_auto] text-center" key={index}>
                <a
                  className="group flex cursor-pointer flex-col items-center focus:outline-0"
                  {...step}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-none bg-white text-black transition-colors ease-in-out group-focus:ring-2 group-focus:ring-offset-2 ${state?.currentStep === index
                      ? "bg-sky-500 text-white ring-2 ring-offset-2"
                      : ""
                      }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`${state?.currentStep === index ? "font-bold" : ""
                      }`}
                  >
                    {steps[index].label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div
            style={{ gridColumn: "2 / 8" }}
            className="pointer-events-none relative right-16 top-4 z-[-1] row-span-full flex h-0.5 w-full flex-row items-center border-none bg-gray-300"
            {...progressProps}
          >
            <span className="flex h-full w-full" />
            <div
              style={{
                width: `${barSize}%`,
                gridColumn: 1 / -1,
                gridRow: 1 / -1
              }}
              className="flex h-full flex-row overflow-hidden border-0 border-solid bg-sky-500"
            />
          </div>
        </nav>
        <p>state: </p>
        <pre style={{ backgroundColor: '#f2f2f2' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </>

    </div>
  )
}

export default Stepper
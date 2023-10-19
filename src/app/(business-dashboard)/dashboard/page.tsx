import { UseStepper } from 'headless-stepper'
import React from 'react'
import { Typography } from 'components/ui/Typography'
import Stepper from './components/stepper'



function page() {
  return (
    <div className='pb-5'>
      <div className='space-y-10'>
        <Typography>
          Business profile
        </Typography>

        <div className='flex flex-col space-y-2'>
          <Typography>
            Welcome to your dashboard
          </Typography>
          <Typography level="LP">
            Your account is currently in test mode, so there are a few more things to do before you can go live and start receiving payments.Follow the steps below to get activated.
          </Typography>
        </div>
      </div>

      <div>

        <Stepper />

      </div>
    </div>
  )
}

export default page
import React from 'react'
const about = () => (
  <div className="about">
    <h3>About this Application</h3>
    <p>
      In the United States, Europe, and many countries around the world, before a new medicine can be sold and made available to the general public, the law requires that the medicine be tested on research participants in controlled settings, usually called clinical trials. In clinical trials, experimental medicine is given to patients, then various assessments are performed to determine the effect of the medicine. Data from those assessments are recorded in what is known as an electronic case report form (eCRF) system. That data is then analyzed and summarized in a report, which is then provided to the governing agency (for example, the FDA in the U.S.) who review the safety and effectiveness profile of the medicine and determine if it should be approved for sale.
    </p>

    <p>
      Clinical2020 is an early eCRF prototype system which allows users to enroll patients to the database, record basic information about patients such as their study ID, date of birth, and date of informed consent. It also allows users to submit basic physical exam data (height, weight, blood pressure, heart rate) for each patient. These forms have built-in validations which will stop the user from submitting the form if the data entered is outside of pre-specified expected ranges.
    </p>

    <p>
      As part of the research process, doctors who participate in studies are compensated for their work, and the payment amount is typically driven by the number of patients enrolled and the amount of clinical data collected. Tracking data entry and mapping it to payable invoice can be a challenging and manual task.
    </p>

    <p>
  Clinical2020 comes with a built-in automated payment management system. When a user tries to create a new invoice, a form is generated and is automatically populated with the total number of clinical data fields that the user has entered, agreed upon payment rates, and a total invoiceable amount.
    </p>

    <p>
      This project was built in roughly 1 week using ReactJS, NodeJS, Express, and MongoDB. Future versions will have additional assessment types besides physical exams and more robust payment tracking and invoice generation capabilities.
    </p>

  </div>
)

export default about

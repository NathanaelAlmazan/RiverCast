'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import AppGridContainer from '@crema/components/AppGridContainer';
import AppInfoView from '@crema/components/AppInfoView';

import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import AppAnimate from '@crema/components/AppAnimate';
import FaqSideBar from './FaqSideBar/index';
import FaqList from './FaqList';
import { generalFaq } from '@crema/fakedb/extraPages';
import { licenseFaq } from '@crema/fakedb/extraPages';
import { supportFaq } from '@crema/fakedb/extraPages';


const projectFaq = [
  {
    id: 1,
    ques: "What is the RiverCast Project?",
    ans: "The RiverCast Project is a machine learning software designed to forecast the Marikina River level up to a week in advance. It leverages meteorological data including precipitation, temperature, humidity, and wind speed to make accurate predictions. By harnessing the power of Internet of Things (IoT) technology and machine learning, the project's goal is to mitigate flood-related casualties by providing timely and precise forecasts, thereby enabling better preparedness and response measures."
  },
  {
    id: 2,
    ques: "Who will benefit from this project?",
    ans: "Citizens living in Barangays along the Marikina River primarily benefits from this project. Currently, evacuation protocols in Marikina City are triggered by monitoring the Marikina River level. Evacuation alerts are issued when the river level reaches a critical point. By implementing this technology, the behavior of the Marikina River can be simulated in advance, offering a proactive approach to disaster preparedness, particularly during typhoons. This enhanced preparedness allows authorities to take preemptive measures and improve response strategies, ultimately reducing the impact of flooding on the community. Marikina River level forecast are now available in Barangay Nangka and Sto. Niño and the proponents are already working on forecasting Marikina River level at Barangay Tumana and Malanday too."
  },
  {
    id: 3,
    ques: "Can I already use this system?",
    ans: "Yes, you can already use the RiverCast Project. However, while the RiverCast Project is publicly accessible, it's important to note that the system is still undergoing development. We are continuously validating and enhancing the accuracy of the model to avoid inaccurate predictions and prevent misleading flood alerts."
  }
];

const modelFaq = [
  {
    id: 1,
    ques: "How can the system predict Marikina River level?",
    ans: "First, the historical precipitation, temperature, humidity, and wind speed are converted into a format that the Transformer model can understand and process effectively using an embedding layer. Then, the temporal information such as time of the year is added into the input. This helps the Transformer model understand the sequence of events. Next, the self-Attention layer gives weight to certain events based on their impact on the river level. This allows the Transformer model to identify how changes in precipitation, temperature, humidity, and wind speed impact Marikina River Level. Finally, the feed forward network maps the extracted precipitation, temperature, humidity, and wind speed behavior into Marikina River levels."
  },
  {
    id: 2,
    ques: "How accurate are the Marikina River level forecast?",
    ans: "The model predicted Marikina River level from 2021 to 2023 with 94% accuracy."
  },
  {
    id: 3,
    ques: "What are the limitations of the model?",
    ans: "Currently, the model predicts Marikina River level using precipitation, temperature, humidity, and wind speed. However, the proponents observed a need for including topological variables as input to produce more accurate forecast. Moreover, despite the impressive performance, the deep learning nature of the model makes it difficult to interpret the underlying mechanisms driving its predictions."
  }
];

const researchersFaq = [
  {
    id: 1,
    ques: "Who are the proponents of this project?",
    ans: "The proponents of this are project are undergraduate students from Polytechnic University of the Philippines with the supervision of professors and engineers from the university."
  },
  {
    id: 2,
    ques: "Can I contribute to this project?",
    ans: "Certainly! We love to hear your thoughts and suggestions in improving the system. You could contact us through email at rivercast.automos@gmail.com."
  }
];

const FAQ = () => {
  const [dataValue, setDataValue] = useState(projectFaq);
  const [selectionId, setSelectionId] = useState(101);

  const onGetFaqData = (value: number) => {
    setSelectionId(value);
    switch (value) {
      case 101:
        setDataValue(projectFaq);
        break;

      case 102:
        setDataValue(modelFaq);
        break;

      case 103:
        setDataValue(researchersFaq);
        break;

      default: {
        break;
      }
    }
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            backgroundColor: blue[500],
            color: 'primary.contrastText',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 224,
            width: '100%',
            p: 1.5,
            mb: 2,
          }}
        >
          <Box
            component='h2'
            sx={{ mb: 5, fontSize: 20, fontWeight: Fonts.MEDIUM }}
          >
            {"Have a question? Find your answer here."}
          </Box>
          <Box component='p' sx={{ fontSize: 16 }}>
            {"Can't find your answer here? Contact us at rivercast.automos@gmail.com"}
          </Box>
        </Box>

        <AppGridContainer>
          <Grid item xs={12} sm={4} lg={3}>
            <FaqSideBar onGetFaqData={onGetFaqData} selectionId={selectionId} />
          </Grid>

          <Grid item xs={12} sm={8} lg={9}>
            <FaqList faqList={dataValue} />
            <AppInfoView />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};

export default FAQ;

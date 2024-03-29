import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import SlideContentWrapper from './SlideContentWrapper';
import ImageCardSlideWrapper from './ImageCardSlideWrapper';
import Image from 'next/image';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CityInfo: React.FC = () => {
  return (
    <AppCard
      sxStyle={{ height: 380 }}
      contentStyle={{ p: 0, pb: '0 !important', height: 380 }}
    >
      <ImageCardSlideWrapper>
        <Slider className='imageCardSlide' {...settings}>
          {cityData.map((city) => {
            return (
              <Box
                key={city.id}
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  fontSize: { xs: 20, xl: 24 },
                  height: 380,
                }}
              >
                <Box
                  sx={{
                    '& .imageSlideFull': {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      zIndex: -1,
                      width: '100% !important',
                      height: '100% !important',
                      objectFit: 'cover !important',
                    },
                  }}
                >
                  <Image
                    className='imageSlideFull'
                    src={city.image}
                    alt='building'
                    quality={100}
                    fill
                    sizes='100vw'
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <SlideContentWrapper>
                  <Box
                    component='h2'
                    sx={{
                      mb: 4,
                      fontWeight: Fonts.BOLD
                    }}
                  >
                    {city.name}
                  </Box>

                  <Box
                    sx={{
                      mt: 'auto',
                      maxWidth: "60%"
                    }}
                  >
                    <Typography component='p' variant="h4" align="center">{city.desc}</Typography>
                  </Box>
                </SlideContentWrapper>
              </Box>
            );
          })}
        </Slider>
      </ImageCardSlideWrapper>
    </AppCard>
  );
};

export default CityInfo;


const cityData = [
  {
    id: 1,
    name: "Embedding Layer",
    desc: "The embedding layer takes the historical precipitation, temperature, humidity, and wind speed and converts it into a format that the Transformer model can understand and process effectively.",
    image: "/assets/images/cards/embedding.jpg",
  },
  {
    id: 2,
    name: "Positional Encoding",
    desc: "Positional encoding adds the temporal information such as time of the year into the input. This helps the Transformer model understand the sequence of events.",
    image: "/assets/images/cards/self-attention.jpg",
  },
  {
    id: 3,
    name: "Self-Attention Layer",
    desc: "Self-Attention layer helps the model focus on the important events in the input by giving more weight to certain events based on their impact on the river level. This allows the Transformer model to identify how changes in precipitation, temperature, humidity, and wind speed impact Marikina River Level.",
    image: "/assets/images/cards/time-series.webp",
  },
  {
    id: 4,
    name: "Feed Forward Network",
    desc: "The feed forward network is a complex function trained to estimate Marikina River level using the extracted precipitation, temperature, humidity, and wind speed behavior. The feed forward network is trained by finding the coefficients that yields to the least estimation error.",
    image: "/assets/images/cards/feed_forward_network.jpg",
  }
];

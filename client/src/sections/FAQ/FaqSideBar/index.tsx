import React, { ReactNode } from 'react';
import AppScrollbar from '@crema/components/AppScrollbar';
import List from '@mui/material/List';
import { GrProjects } from "react-icons/gr";
import { RiCpuLine } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import SideBarItem from './SideBarItem';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';

export type FaqFolderData = {
  id: number;
  name: string | any;
  icon: ReactNode;
};

const faqFolderList: FaqFolderData[] = [
  {
    id: 101,
    name: "RiverCast Project",
    icon: <GrProjects />,
  },
  {
    id: 102,
    name: "RiverCast Model",
    icon: <RiCpuLine />,
  },
  {
    id: 103,
    name: "The Researchers",
    icon: <IoPeopleSharp />,
  }
];

type FaqSideBarProps = {
  onGetFaqData: (num: number) => void;
  selectionId: number;
};

const FaqSideBar: React.FC<FaqSideBarProps> = ({
  onGetFaqData,
  selectionId,
}) => {
  return (
    <AppCard>
      <AppScrollbar>
        <Box
          component="h3"
          sx={{ mb: 4, fontWeight: Fonts.BOLD, fontSize: 16 }}
        >
          <IntlMessages id="faq.queries" />
        </Box>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            '& .listItem': {
              paddingLeft: '0',
              paddingRight: '0',
              paddingTop: 1,
              paddingBottom: 1,
              backgroundColor: 'transparent',

              '& .MuiTypography-body1': {
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              },

              '&:hover,&:focus,&.active': {
                backgroundColor: 'transparent',
                color: 'primary.main',

                '& svg': {
                  fontSize: 18,
                  color: 'primary.main',
                },
              },

              '&.active': {
                color: 'primary.main',
              },

              '& svg': {
                fontSize: 18,
              },
            },
          }}
        >
          {faqFolderList.map((item) => {
            return (
              <SideBarItem
                key={item.id}
                item={item}
                selectionId={selectionId}
                onGetFaqData={onGetFaqData}
              />
            );
          })}
        </List>
      </AppScrollbar>
    </AppCard>
  );
};

export default FaqSideBar;

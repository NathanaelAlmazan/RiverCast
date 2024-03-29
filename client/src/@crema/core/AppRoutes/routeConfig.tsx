import { RiBuilding2Fill, RiBuildingFill } from "react-icons/ri";
import { MdFlood } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa6";
import { RouterConfigData } from '@crema/types/models/Apps';


const routesConfig: RouterConfigData[] = [
  {
    id: 'stations',
    title: 'Stations',
    messageId: 'sidebar.stations',
    type: 'group',
    children: [
      {
        id: 'nangka',
        title: 'Nangka',
        messageId: 'sidebar.stations.nangka',
        type: 'item',
        icon: <RiBuilding2Fill />,
        url: '/?station=NANGKA',
      },
      {
        id: 'stonino',
        title: 'stonino',
        messageId: 'sidebar.stations.stonino',
        type: 'item',
        icon: <RiBuildingFill />,
        url: '/?station=STO_NINO',
      }
    ],
  },
  {
    id: 'about',
    title: 'About',
    messageId: 'sidebar.about',
    type: 'group',
    children: [
      {
        id: 'mail',
        title: 'Mail',
        messageId: 'sidebar.rivercast',
        type: 'item',
        icon: <MdFlood />,
        url: '/about',
      },
      {
        id: 'model',
        title: 'Model',
        messageId: 'sidebar.pages.extraPages.faq',
        type: 'item',
        icon: <FaQuoteLeft />,
        color: '#48bb78',
        url: '/faq',
      },
    ]
  }
];

export default routesConfig;

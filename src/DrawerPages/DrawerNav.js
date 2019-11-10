import PageOne from './PageOne';
import PageTwo from './PageTwo';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

const screens = {
    Page1: { screen: PageOne },
    Page2: { screen: PageTwo }
};

const DrawerNav = createDrawerNavigator(screens);

export default createAppContainer(DrawerNav);

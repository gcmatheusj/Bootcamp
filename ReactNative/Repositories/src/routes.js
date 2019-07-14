import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './screens/Main';
import User from './screens/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#039be5',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;

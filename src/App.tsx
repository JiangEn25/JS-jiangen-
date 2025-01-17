import React from 'react';
import { Admin, Layout, Resource, CustomRoutes, ListGuesser, EditGuesser } from 'react-admin';
import { Route } from 'react-router-dom';
import HomePage from './Homepage';
import { MyFirstPage } from './MyFirstPage';
import CustomMenu from './CustomMenu';
import { rainDataProvider } from './rainDataProvider';
import RainBackground from './RainBackground';
import { MysecondPage } from './MysecondPage';
import YearSelection from './YearSelection'; 
import "./styles.css"; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './theme';
import RainList from './RainList';
const CustomLayout = (props: any) => (
  <div>
      {/*<RainBackground /> {/* 添加雨滴背景 */}
      <div className="content-container">
          <Layout {...props} menu={CustomMenu} />
      </div>
  </div>
);
export const App = () => (
  <ThemeProvider theme={theme}>
  <Admin layout={CustomLayout} dataProvider={rainDataProvider}>
  <Resource name="rain" list={RainList} edit={EditGuesser} />
    
    <CustomRoutes>
    <Route path="/HomePage" element={<HomePage />} />
      <Route path="/MyFirstPage" element={<MyFirstPage />} />
      <Route path="/MysecondPage" element={<MysecondPage />} />
    </CustomRoutes>
  </Admin>
  </ThemeProvider>
);

export default App;

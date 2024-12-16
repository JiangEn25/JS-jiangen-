import React from 'react';
import { Admin, Layout, Resource, CustomRoutes, ListGuesser, EditGuesser } from 'react-admin';
import { Route } from 'react-router-dom';
import { ChartPage } from './ChartPage';
import { ChartPage2 } from './ChartPage2';
import { MyFirstPage } from './MyFirstPage';
import CustomMenu from './CustomMenu';
import { titanicDataProvider } from './titanicDataProvider';
import { rainDataProvider } from './rainDataProvider';
import RainBackground from './RainBackground';
import { MysecondPage } from './MysecondPage';
import "./styles.css"; 
const CustomLayout = (props: any) => (
  <div>
      {/*<RainBackground /> {/* 添加雨滴背景 */}
      <div className="content-container">
          <Layout {...props} menu={CustomMenu} />
      </div>
  </div>
);
export const App = () => (
  <Admin layout={CustomLayout} dataProvider={rainDataProvider}>

    <Resource name="rain" list={ListGuesser} edit={EditGuesser} />
    <CustomRoutes>
      <Route path="/MyFirstPage" element={<MyFirstPage />} />
      <Route path="/MysecondPage" element={<MysecondPage />} />
    </CustomRoutes>
  </Admin>
);

export default App;

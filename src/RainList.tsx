import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  SelectInput,
  Pagination,
  useListContext,
} from 'react-admin';

// 自定义过滤器组件
const RainFilter = (props: any) => {
  const years = Array.from({ length: 2015 - 1901 + 1 }, (_, index) => ({
    id: 1901 + index,
    name: `${1901 + index}`,
  }));

  
  return (
    <Filter {...props}>
      <SelectInput source="YEAR" choices={years} />
   
    </Filter>
  );
};

// 自定义列表页组件
const RainList = (props: any) => {
  return (
    <List
      {...props}
      filters={<RainFilter />}
      pagination={<Pagination />}
      perPage={10}
    >
      <RainDatagrid />
    </List>
  );
};

// 自定义 Datagrid 组件
const RainDatagrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Datagrid>
      <TextField source="DIVISION" />
      <TextField source="YEAR" />
      <TextField source="JAN" />
      <TextField source="FEB" />
      <TextField source="MAR" />
      <TextField source="APR" />
      <TextField source="MAY" />
      <TextField source="JUN" />
      <TextField source="JUL" />
      <TextField source="AUG" />
      <TextField source="SEP" />
      <TextField source="OCT" />
      <TextField source="NOV" />
      <TextField source="DEC" />
      <TextField source="ANNUAL" />
    </Datagrid>
  );
};

export default RainList;
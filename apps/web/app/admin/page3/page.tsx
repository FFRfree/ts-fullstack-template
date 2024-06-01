"use client";
// import "./test.module.less";
import { useDebugValue, useEffect } from "react";
import ErrorComp from "../error";
import { add, getSecret } from "@shared/math";
import { Button, Checkbox, DatePicker, Form, Input, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TableCell } from "./table-cell";
import { ColumnsType } from "antd/lib/table";
import { DataDetail } from "./data-detail";
import {
  useSelectedLayoutSegments,
  useSelectedLayoutSegment,
} from "next/navigation";
import Picker from "rc-picker";
import locale from "rc-picker/es/locale/zh_CN";
import dayjsConfig from "rc-picker/es/generate/dayjs";
import { FormItemPlus } from "./form-item-plus";
import { get } from "lodash";

const getColumns = ({ colNum }: { colNum: number }): ColumnsType<any> => {
  return Array.from(Array(colNum), (_, colInd) => ({
    title: `col-${colInd}`,
    // onCell: (data, rowInd) => (<TableCell row={rowInd!} col={colInd} />) as any,
    render: (v, record, rowInd) => <TableCell row={rowInd!} col={colInd} />,
  }));
};

export default function Page3() {
  const [form] = useForm();

  return (
    <div>
      <h1 className="hello">display of table render</h1>
      <DatePicker />
      <Picker
        prefixCls="ant-picker"
        locale={locale}
        generateConfig={dayjsConfig}
        multiple
      />
      <Form
        form={form}
        initialValues={{
          table: [[true]],
        }}
      >
        <FormItemPlus
          name={["formItemPlus"]}
          initialRenderProps={{ hehe: 1 }}
          getRenderProps={(values) => ({
            hehe: get(values, ["table", 0, 0]),
          })}
          render={(handler, props) => {
            return (
              <div>
                props: {JSON.stringify(props)}
                <Input {...handler} />
              </div>
            );
          }}
        />
        <DataDetail />
        <Table
          dataSource={Array(200).fill(null)}
          columns={getColumns({ colNum: 30 })}
        ></Table>
      </Form>
    </div>
  );
}

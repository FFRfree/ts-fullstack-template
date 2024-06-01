"use client";
import { useEffect } from "react";
import ErrorComp from "../error";
import { add, getSecret } from "@shared/math";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
// import { openPage1 } from "../page1/page";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Page2() {
  const [form] = useForm();
  const internalHooks = form!.getInternalHooks("RC_FORM_INTERNAL_HOOKS");
  const { getFields, dispatch } = internalHooks;

  useEffect(() => {
    console.log(getFields());
  });

  return (
    <>
      <Foo children={"hehe"} />
      <Button
        onClick={() =>
          dispatch({
            type: "updateValue",
            namePath: ["username"],
            value: "ffr",
          })
        }
      >
        dispatch
      </Button>
      <Form form={form}>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
}

const Foo = (props: any) => {
  return <div {...props} />;
};

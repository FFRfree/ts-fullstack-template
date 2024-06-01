"use client";
import { useEffect } from "react";
import ErrorComp from "../error";
import { add, getSecret } from "@shared/math";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useForceRerender } from "@/hooks/use-force-rerender";
import { ToggleRender } from "./toggle-render";
import { useStore } from "zustand";
import { useWatchForm } from "@/utils/watchForm/watchForm";
// import { openPage1 } from "../page1/page";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Page2() {
  const [form] = useForm<FieldType>();
  const internalHooks = form!.getInternalHooks(
    "RC_FORM_INTERNAL_HOOKS"
  ) as InternalHooks;
  const { getFields, dispatch } = internalHooks;

  const rerender = useForceRerender();

  useEffect(() => {
    console.log(getFields());
  });

  useWatchForm(form);

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
      <Button
        onClick={() => {
          console.log(form.getFieldsValue());
          console.log(form.getFieldValue("username"));
        }}
      >
        log
      </Button>

      <Button onClick={() => rerender()}>forceRerender</Button>
      <Form form={form}>
        <ToggleRender>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            preserve={false}
          >
            <Input />
          </Form.Item>
        </ToggleRender>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          preserve={true}
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

        <Form.List name={"mylist"}>
          {(fields) => (
            <div>
              {fields.map((field) => (
                <Form.Item {...field}>
                  <Input />
                </Form.Item>
              ))}
            </div>
          )}
        </Form.List>
      </Form>
    </>
  );
}

const Foo = (props: any) => {
  return <div {...props} />;
};

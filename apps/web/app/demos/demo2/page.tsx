"use client";
import { ThemeSwitcher } from "@/components/next/theme-switcher";
import { List } from "antd";
import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";

export default function Page() {
  const ref = useRef<any>();
  useEffect(() => {
    const swapy = createSwapy(ref.current);
    swapy.onSwap(({ data }) => {
      console.log(data);
      // localStorage.setItem("slotItem", JSON.stringify(data.object));
    });
  }, []);
  return (
    <div>
      <ThemeSwitcher />
      <div ref={ref} className=" w-96" style={{ margin: "0 auto" }}>
        <List>
          <div data-swapy-slot="1">
            <div data-swapy-item="a">
              <List.Item>bar</List.Item>
            </div>
          </div>
          <div data-swapy-slot="2">
            <div data-swapy-item="b">
              <List.Item>foo</List.Item>
            </div>
          </div>
          <div data-swapy-slot="3">
            <div data-swapy-item="c">
              <List.Item>object</List.Item>
            </div>
          </div>
          <div data-swapy-slot="4">
            <div data-swapy-item="d">
              <List.Item>terrific</List.Item>
            </div>
          </div>
        </List>
      </div>
    </div>
  );
}

const DEFAULT = {
  "1": "a",
  "3": "c",
  "4": "d",
  "2": null,
};

function A() {
  return (
    <>
      <div className="item a" data-swapy-item="a">
        <div className="handle" data-swapy-handle></div>
        <div>A</div>
      </div>
    </>
  );
}

function C() {
  return (
    <>
      <div className="item c" data-swapy-item="c">
        <div>C</div>
      </div>
    </>
  );
}

function D() {
  return (
    <>
      <div className="item d" data-swapy-item="d">
        <div>D</div>
      </div>
    </>
  );
}

function getItemById(itemId: "a" | "c" | "d" | null) {
  switch (itemId) {
    case "a":
      return <A />;
    case "c":
      return <C />;
    case "d":
      return <D />;
  }
}

function App() {
  const slotItems: Record<string, "a" | "c" | "d" | null> =
    localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;
  useEffect(() => {
    const container = document.querySelector(".container")!;
    const swapy = createSwapy(container);
    swapy.onSwap(({ data }) => {
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems["1"])}
        </div>
        <div className="second-row">
          <div className="slot b" data-swapy-slot="2">
            {getItemById(slotItems["2"])}
          </div>
          <div className="slot c" data-swapy-slot="3">
            {getItemById(slotItems["3"])}
          </div>
        </div>
        <div className="slot d" data-swapy-slot="4">
          {getItemById(slotItems["4"])}
        </div>
        <div className="w-56 h-56" data-swapy-slot="foo"></div>
      </div>
    </>
  );
}

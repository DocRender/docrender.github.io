import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { XRender } from "@huajianmao/xrender";
import { Button, message, Popconfirm, Radio, Space } from "antd";
import { saveAs } from "file-saver";

import DevSide from "../components/devside";

import schema from "../schemas/demo/info.json";
import { BusinessSchema } from "@huajianmao/xrender/dist/core/types";
import GROUPS from "../schemas";

const modes = [
  { label: "表单", value: "form" },
  // { label: '显示', value: 'display' },
  { label: "打印", value: "print" },
  { label: "设计", value: "dev" },
];

const contents = [
  { label: "Schema", value: "schema" },
  { label: "Model", value: "model" },
  { label: "Options", value: "options" },
  { label: "Functions", value: "functions" },
];

const Schema = () => {
  const { slug } = useParams();
  const fileds = slug?.split("@") || [];
  const [id, group] = fileds;
  const dataId = `data.${id}`;
  const [data, setData] = useState(getDataFromLS(dataId));
  const [schema, setSchema] = useState<BusinessSchema>();
  const [mode, setMode] = useState(modes[0].value);
  const [side, setSide] = useState<"schema" | "model" | "options" | "functions">("schema");
  const [formKey, setFormKey] = useState(Date.now());
  const [reloading, setReloading] = useState(false);

  const saveRef = useRef(null);

  const handleSave = (_data: any) => {
    saveDataToLS(dataId, _data);
    setData(_data);
    message.success("保存成功");
  };

  useEffect(() => {
    setData(getDataFromLS(dataId));
    setFormKey(Date.now());
  }, [reloading, dataId]);

  useEffect(() => {
    const business = GROUPS.find((g) => g.id === group)?.businesses.find((b) => b.id === id);
    if (business && business.schema) {
      setSchema(business.schema);
    }
  }, [id, group, GROUPS]);

  let render = <></>;
  if (schema) {
    switch (mode) {
      case "form":
        render = <XRender key={formKey} schema={schema} formId="form" mode="form" data={data} onSubmit={handleSave} />;
        break;
      case "print":
        render = <XRender schema={schema} data={data} mode="print" />;
        break;
      case "dev":
        render = <XRender schema={schema} data={data} formId="dev" mode="dev" />;
        break;
      default:
        render = (
          <div className="sheets-container">
            <XRender schema={schema} data={data} />
          </div>
        );
    }
  }

  return (
    <>
      <div className="header">
        <Space size="large">
          <Link to="/schemas">
            <Button>返回</Button>
          </Link>
          <Radio.Group
            options={modes}
            optionType="button"
            buttonStyle="solid"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              setData(getDataFromLS(dataId));
            }}
          />
        </Space>
        {mode === "form" && (
          <Space>
            <Button ref={saveRef} type="primary" htmlType="submit" form="form">
              暂存
            </Button>
            <Popconfirm
              title={`确定删除数据？`}
              onConfirm={() => {
                deleteFromLS(dataId);
                setReloading(true);
              }}
            >
              <Button type="primary" danger>
                重置
              </Button>
            </Popconfirm>
            <Button
              onClick={() => {
                download(saveRef, data);
              }}
            >
              下载
            </Button>
          </Space>
        )}
        {mode === "print" && (
          <Button type="dashed" onClick={print}>
            打印
          </Button>
        )}
        {mode === "dev" && (
          <Radio.Group
            options={contents}
            optionType="button"
            buttonStyle="solid"
            value={side}
            onChange={(e) => {
              setSide(e.target.value);
            }}
          />
        )}
      </div>

      {mode === "dev" ? (
        <div className="dev-wrapper">
          <div className="dev-xrender">{render}</div>
          <DevSide side={side} content={schema} />
        </div>
      ) : (
        render
      )}
    </>
  );
};

export default Schema;

const print = () => {
  window.print();
};

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getDataFromLS = (id: string) => {
  return JSON.parse(localStorage.getItem(id) || "{}");
};

const saveDataToLS = (id: string, data: any) => {
  localStorage.setItem(id, JSON.stringify(data));
};

const deleteFromLS = (id: string) => {
  localStorage.removeItem(id);
};

const download = async (ref: any, data: any) => {
  if (ref.current) {
    await ref.current.click();
    await delay(1000);

    const filename = new Date().toISOString().replace(":", "") + ".json";
    const content = JSON.stringify(data, undefined, 2);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  }
};

import "./App.css";
import { useState } from "react";
import {
  Layout,
  Menu,
  Form,
  Select,
  Slider,
  InputNumber,
  Space,
  Button,
  theme,
} from "antd";
import { DownloadOutlined, SwapOutlined } from "@ant-design/icons";
import { COUNTRIES } from "./constants";

const { Header, Footer, Content } = Layout;

function App() {
  const menuItems = [
    {
      key: 1,
      label: "Home",
    },
    {
      key: 2,
      label: "About",
    },
    {
      key: 3,
      label: "Contact",
    },
  ];

  const [valueOfError, setValueOfError] = useState(0);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
        }}
      >
        <Form
          layout="inline"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            gridGap: "30px",
          }}
        >
          <Form.Item label="Region">
            <Select
              // style={{ width: 120 }}
              defaultValue={COUNTRIES[0]}
              options={COUNTRIES}
            />
          </Form.Item>
          <Form.Item label="Errors">
            <Space align="center"  style={{ height: "100%", display:'flex', alignItems:'center' }}>
              <Slider
                defaultValue={0}
                min={0}
                max={10}
                value={valueOfError}
                onChange={(value) => {
                  setValueOfError(value);
                }}
                style={{ width: 120 }}
              />
              <InputNumber
                value={valueOfError}
                onChange={(value) => {
                  setValueOfError(value);
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Seed">
            <Space.Compact>
              <InputNumber min={0} max={100000} />
              <Button
                type="primary"
                // style={{ background: "green" }}
                icon={<SwapOutlined />}
              >
                Random
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              // style={{ background: "green" }}
              icon={<DownloadOutlined />}
            >
              Export
            </Button>
          </Form.Item>
        </Form>
      </Header>
      <Content></Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;

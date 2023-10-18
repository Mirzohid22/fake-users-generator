import "./App.css";
import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  Layout,
  Form,
  Select,
  Slider,
  InputNumber,
  Space,
  Button,
  theme,
  Table,
} from "antd";
import { DownloadOutlined, SwapOutlined } from "@ant-design/icons";
import { COUNTRIES, COLUMNS } from "./constants";
import { generateUsers } from "./services";

const { Header, Footer, Content } = Layout;

function App() {
  const [valueOfError, setValueOfError] = useState(0);
  const [users, setUsers] = useState([]);
  const {
    token: { colorBgBase },
  } = theme.useToken();

  useEffect(() => {
    const createUsers = () => {
      const users = generateUsers(20);
      setUsers(users);
    };
    createUsers();
  }, []);

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
          background: colorBgBase,
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
            <Space
              align="center"
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
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
      <Content style={{ padding: "50 100px" }}>
        <Table
          columns={COLUMNS}
          dataSource={users}
          pagination={false}
          // scroll={{ y: 500 }}
        />
      </Content>
      <Footer
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: colorBgContainer,
        }}
      >
        Ant design
      </Footer>
    </Layout>
  );
}

export default App;

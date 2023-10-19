import "./App.css";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  Spin,
} from "antd";
import { DownloadOutlined, SwapOutlined } from "@ant-design/icons";
import { COUNTRIES, COLUMNS } from "./constants";
import { generateUsers } from "./services";

const { Header, Footer, Content } = Layout;

function App() {
  const [valueOfError, setValueOfError] = useState(0);
  const [users, setUsers] = useState([]);
  const [country, setCountry] = useState("en");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const {
    token: { colorBgBase },
  } = theme.useToken();

  useEffect(() => {
    setLoading(true);
    const createUsers = () => {
      const users = generateUsers(20, country);
      setUsers(users);
    };
    if (users.length === 0) {
      createUsers();
    }
    console.log("update");
    setLoading(false);
  }, [country, update]);

  const handleErrorChange = (value) => {
    console.log(value);
    setValueOfError(value);
  };

  const fetchMoreUsers = () => {
    setLoading(true);
    setTimeout(() => {
      const newUsers = generateUsers(users.length + 10, country, users.length);
      setUsers(users.concat(newUsers));
      setLoading(false);
    }, 2000);
  };

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
          disabled={loading}
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
              defaultValue={COUNTRIES[0]}
              options={COUNTRIES}
              onChange={(value) => {
                setCountry(value);
              }}
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
                onChange={handleErrorChange}
                style={{ width: 120 }}
              />
              <InputNumber
                value={valueOfError}
                onChange={handleErrorChange}
                min={0}
                max={1000}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Seed">
            <Space.Compact>
              <InputNumber min={0} max={100000} />
              <Button type="primary" icon={<SwapOutlined />}>
                Random
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export
            </Button>
          </Form.Item>
        </Form>
      </Header>
      <Content style={{ padding: "0" }}>
        <Spin spinning={loading}>
          <InfiniteScroll
            next={fetchMoreUsers}
            hasMore={true}
            loader={
              <div style={{ margin: "0 auto" }}>
                <Spin style={{ margin: "0 auto" }} />
              </div>
            }
            dataLength={users.length}
            height={900}
          >
            <Table
              rowKey={(row) => row.id}
              columns={COLUMNS}
              dataSource={users}
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </InfiniteScroll>
        </Spin>
      </Content>
      {/* <Footer
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Itransition training ©2023 Created by{" "}
        <a
          href="https://github.com/Mirzohid22"
          target="_blank"
          rel="noreferrer"
          style={{ margin: "0 5px" }}
        >
          Mirzohid Salimov
        </a>
      </Footer> */}
    </Layout>
  );
}

export default App;

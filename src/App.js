import "./App.css";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { generateUsers, introduceErrors, createSeed } from "./services";

const { Header, Content } = Layout;

function App() {
  const [valueOfError, setValueOfError] = useState(0);
  const [users, setUsers] = useState([]);
  const [country, setCountry] = useState("en");
  const [seed, setSeed] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgBase },
  } = theme.useToken();

  useEffect(() => {
    setLoading(true);
    const createUsers = () => {
      const users = generateUsers(20, country, 0, createSeed(country, seed));
      setUsers(users);
    };
    if (users.length === 0) {
      createUsers();
    }
    console.log("update");
    setLoading(false);
  }, []);

  const handleCountryChange = (value) => {
    setLoading(true);
    setCountry(value);

    const newUsers = generateUsers(
      users.length,
      value,
      0,
      createSeed(value, seed)
    );
    if (valueOfError > 0) {
      const noisyUsers = introduceErrors(
        newUsers,
        value,
        valueOfError,
        createSeed(value, seed)
      );
      setUsers(noisyUsers);
    }
    if (valueOfError === 0) {
      setUsers(newUsers);
    }
    setLoading(false);
  };

  const handleErrorChange = (value) => {
    setLoading(true);
    setTimeout(() => {
      const newUsers = introduceErrors(
        generateUsers(users.length, country, 0, createSeed(country, seed)),
        country,
        value,
        createSeed(country, seed)
      );
      setUsers(newUsers);
      setLoading(false);
    }, 1500);
    setValueOfError(value);
  };

  const fetchMoreUsers = () => {
    setLoading(true);
    setTimeout(() => {
      const newUsers = generateUsers(
        users.length + 10,
        country,
        users.length,
        createSeed(country, seed)
      );
      setUsers(users.concat(newUsers));
      setLoading(false);
    }, 2000);
  };

  const handleSeedChange = (value) => {
    setLoading(true);
    setSeed(value);
    const newUsers = generateUsers(
      users.length,
      country,
      0,
      createSeed(country, value)
    );

    if (valueOfError > 0) {
      const noisyUsers = introduceErrors(
        newUsers,
        country,
        valueOfError,
        createSeed(country, value)
      );
      setUsers(noisyUsers);
    }
    if (valueOfError === 0) {
      setUsers(newUsers);
    }
    setUsers(newUsers);
    setLoading(false);
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
              onChange={handleCountryChange}
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
                step={0.25}
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
              <InputNumber
                min={0}
                max={100000}
                value={seed}
                onChange={handleSeedChange}
              />
              <Button
                type="primary"
                icon={<SwapOutlined />}
                onClick={() => {
                  const randomSeed = Math.floor(Math.random() * 100000);
                  setSeed(randomSeed);
                  handleSeedChange(randomSeed);
                }}
              >
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
              rowKey={(row) => row.key}
              columns={COLUMNS}
              dataSource={users}
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </InfiniteScroll>
        </Spin>
      </Content>
    </Layout>
  );
}

export default App;

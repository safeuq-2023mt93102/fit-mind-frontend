"use client"
import {CSSProperties, ReactNode, useEffect, useState} from 'react';
import {Button, Modal, Input, Select, InputNumber, Table, Flex, Tag, Layout, Typography} from 'antd';
import type { InputStatus } from 'antd/es/_util/statusUtils';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import type {TableProps} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {signOut} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {Activity, ActivityInput, ErrorResponse} from "@/interfaces/api/interfaces";

const {Header, Content} = Layout;
const {Text, Title} = Typography;

const columns: ColumnsType<Activity> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (_, {type}) => {
      let color = 'gray';
      switch (type) {
        case "WALKING":
          color = 'purple';
          break;
        case "CYCLING":
          color = 'magenta';
          break;
      }
      return (
        <Tag color={color} key={type}>
          {type.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },
];

function LogActivity() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState<Activity[]>();
  const [selectValue, setSelectedVale] = useState("WALKING");
  const handleChange = (value: string) => {
    setSelectedVale(value);
  };
  const [walkingStepsState, setWalkingStepsState] = useState<InputStatus>("");
  const [dataDistanceState, setDataDistanceState] = useState<InputStatus>("");
  const [activityLog, setActivityLog] = useState<ActivityInput>({
    walkingSteps: 0,
    cyclingDistance: 0,
    cyclingUnit: 'KILOMETRES'
  })

  const showModal = () => {
    setIsModalOpen(true);
  };

  function loadData(response: any[]) {
    let mappedData: Activity[] = []
    let i = 1;
    response = response.slice(0, 20)
    response.forEach((activity) => {
      let info = "";
      switch (activity.data.type) {
        case "WALKING":
          info = "Steps: " + activity.data.steps;
          break;
        case "CYCLING":
          info = "Distance: " + activity.data.distance + " " + activity.data.unit.toLowerCase();
          break;
      }
      mappedData.push({
        key: i++,
        id: activity.id,
        type: activity.data.type,
        details: info,
      })
    })
    setData(mappedData)
  }

  const handleOk = () => {
    setLoading(true);
    let data;
    switch (selectValue) {
      case "WALKING":
        data = {
          type: selectValue,
          steps: activityLog.walkingSteps,
        };
        break;
      case "CYCLING":
        data = {
          type: selectValue,
          distance: activityLog.cyclingDistance,
          unit: activityLog.cyclingUnit
        };
        break;
    }
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/activity/',
        payload: {
          data: data
        }
      })
    }).then((response) => {
      setLoading(false);
      console.log("Status: ", response.status)
      switch (response.status) {
        case 200:
          setIsModalOpen(false);
          listActivity();
          break;
        case 400:
          response.json().then((error: ErrorResponse) => {
            console.log(error)
            switch (error.type) {
              case "param_value_invalid":
                switch (error.metadata.param[0]) {
                  case "data.steps":
                    setWalkingStepsState("error")
                    return
                  case "data.distance":
                    setDataDistanceState("error")
                    return
                }
                break;
            }
          })
          break;
        case 401:
          router.push("/")
          break;
      }
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemStyle: CSSProperties = {
    // marginTop: "8px"
  }

  function listActivity() {
    setTableLoading(true);
    fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({
        path: '/activity/'
      })
    }).then((listActivity) => {
      if (listActivity.status == 401) {
        return signOut();
      }
      return listActivity.json().then(data => {
        loadData(data);
        setTableLoading(false);
      });
    })
  }

  useEffect(() => listActivity(), [])

  return (
    <>
      {/*style={{display: "flex", height: "100%", width: "100%"}}*/}

      <Flex style={{height: "100%", padding: "20px"}} justify={"center"} gap={"middle"} vertical>
        <Flex gap={"middle"}>
          <Button type="primary" onClick={showModal}>
            Log activity
          </Button>
        </Flex>
        <Table dataSource={data} columns={columns} loading={tableLoading} style={{width: "100%"}}>
        </Table>
        <div style={{flexGrow: 1}}/>
      </Flex>
      <Modal title="Log Activity" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
          Log Activity
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>
      ]}>
        {/* align={"flex-start"} justify={"space-evenly"}*/}
        <Flex gap={"small"} vertical>
          <Select
            defaultValue="WALKING"
            style={{...itemStyle}}
            onChange={handleChange}
            options={[
              {value: 'WALKING', label: 'Walking'},
              {value: 'CYCLING', label: 'Cycling'},
              {value: 'CALORIES_BURNED', label: 'Calories burned'},
              {value: 'SLEEP', label: 'Sleep'},
              {value: 'HEART_RATE', label: 'Heart rate'},
            ]}
            value={selectValue}
          />

          {
            selectValue === "WALKING" && (
              <>
                <label>Steps</label>
                <InputNumber
                  style={{width: "100%", ...itemStyle}}
                  status={walkingStepsState}
                  prefix={(walkingStepsState === "error" && <ExclamationCircleOutlined/>)}
                  value={activityLog.walkingSteps} onChange={(value) => {
                  console.log("r.tart", value)
                  setWalkingStepsState("")
                  setActivityLog({
                    ...activityLog,
                    walkingSteps: value!
                  })
                }
                }/>
              </>
            )
          }

          {
            selectValue === "CYCLING" && (
              <>
                <label
                  style={{...itemStyle}}>Distance</label>
                <InputNumber
                  style={{width: "100%", ...itemStyle}}
                  status={dataDistanceState}
                  prefix={(dataDistanceState === "error" && <ExclamationCircleOutlined/>)}
                  value={activityLog.cyclingDistance} onChange={(value) => {
                  setDataDistanceState("")
                  setActivityLog({
                    ...activityLog,
                    cyclingDistance: value!
                  })
                }
                }/>
                <label
                  style={{...itemStyle}}>Unit</label>
                <Select
                  defaultValue="KILOMETRES"
                  style={{...itemStyle}}
                  onChange={(value) => {
                    setActivityLog({
                      ...activityLog,
                      cyclingUnit: value
                    })
                  }
                  }
                  options={[
                    {value: 'KILOMETRES', label: 'Kilometres'},
                    {value: 'METRES', label: 'Metres'},
                    {value: 'MILES', label: 'Miles'},
                    {value: 'INCHES', label: 'Inches'},
                    {value: 'FEET', label: 'Feet'},
                  ]}
                  value={activityLog.cyclingUnit}
                />
              </>
            )
          }
        </Flex>
      </Modal>
    </>
  )
}

export default LogActivity;
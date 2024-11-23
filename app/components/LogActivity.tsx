"use client"
import {CSSProperties, useEffect, useState} from 'react';
import {Button, Flex, InputNumber, Layout, Modal, Select, Table, Tag, Typography} from 'antd';
import type {InputStatus} from 'antd/es/_util/statusUtils';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import type {ColumnsType} from 'antd/es/table';
import {
  ActivityApi,
  ActivityType,
  CyclingActivity,
  ErrorResponse,
  Servers,
  WalkingActivity
} from "@/interfaces/api/interfaces";
import {callGet, callPost, toProgressData} from "@/util/util";
import dayjs from 'dayjs';
import {ShareAltOutlined} from '@ant-design/icons';
import SocialSharing from "@/app/components/SocialSharing";
import ProgressPreview from "@/app/components/ProgressPreview";
import {Activity, ActivityInput, ProgressData} from "@/interfaces/app/interface";

const {Header, Content} = Layout;
const {Text, Title} = Typography;

function ShareModal(
  { isOpen, onClose, activity }
    : { isOpen: boolean, onClose: () => void, activity: Activity }) {
  let progressData: ProgressData | undefined = activity &&
    toProgressData(activity.apiData);

  let shareMessage: string | undefined = progressData && `
      🏋️Fitness Progress:
      - Steps: ${progressData.steps}
      - Calories Burned: ${progressData.caloriesBurned}
      - Distance: ${progressData.distance} km
      - Goals Achieved: ${progressData.goalsAchieved.join(", ")}
    `;
  return (
    <Modal 
      title={null}
      open={isOpen} 
      onCancel={onClose}
      footer={null}>
      <Flex justify="center" gap="middle" vertical>
        <ProgressPreview progressData={progressData as ProgressData}/>
        <Flex>
          <SocialSharing progressData={progressData as ProgressData}/>
        </Flex>
      </Flex>
    </Modal>
  );
}


function LogActivityModal(
  {isModalOpen, setIsModalOpen, listActivity}
    : { isModalOpen: boolean, setIsModalOpen: (state: boolean) => void, listActivity: () => void }) {
  const [loading, setLoading] = useState(false);

  const [selectValue, setSelectedVale] = useState<ActivityType>(ActivityType.WALKING);
  const handleChange = (value: ActivityType) => {
    setSelectedVale(value);
  };
  const [walkingStepsState, setWalkingStepsState] = useState<InputStatus>("");
  const [dataDistanceState, setDataDistanceState] = useState<InputStatus>("");
  const [activityLog, setActivityLog] = useState<ActivityInput>({
    walkingSteps: 0,
    cyclingDistance: 0,
    cyclingUnit: 'KILOMETRES'
  })

  const handleOk = () => {
    setLoading(true);
    let data: any = {
      type: selectValue,
    };
    switch (selectValue) {
      case "WALKING":
        data = {
          ...data,
          steps: activityLog.walkingSteps,
        };
        break;
      case "CYCLING":
        data = {
          ...data,
          distance: activityLog.cyclingDistance,
          unit: activityLog.cyclingUnit
        };
        break;
    }

    callPost({
      server: Servers.CORE,
      path: '/activity/',
      payload: {
        data: data
      }
    }).then(async (response) => {
      setLoading(false);
      console.log("Status: ", response.status)
      switch (response.status) {
        case 200:
          setIsModalOpen(false);
          listActivity();
          break;
        case 400:
          const error: ErrorResponse = await response.json();
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

  let walkingBlock = <>{
    selectValue === ActivityType.WALKING && (
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
  }</>;

  let cyclingBlock = <>{
    selectValue === ActivityType.CYCLING && (
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
  }</>;

  return <>
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
          defaultValue={ActivityType.WALKING}
          style={{...itemStyle}}
          onChange={handleChange}
          options={[
            {value: ActivityType.WALKING, label: 'Walking'},
            {value: ActivityType.CYCLING, label: 'Cycling'},
            {value: ActivityType.CALORIES_BURNED, label: 'Calories burned'},
            {value: ActivityType.SLEEP, label: 'Sleep'},
            {value: ActivityType.HEART_RATE, label: 'Heart rate'},
          ]}
          value={selectValue}
        />

        {walkingBlock}
        {cyclingBlock}
      </Flex>
    </Modal>
  </>;
}

function LogActivity() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [record, setRecord] = useState<Activity>();

  const columns: ColumnsType<Activity> = [
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      width: 'fit-content',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, {type}) => {
        let color = 'gray';
        switch (type) {
          case ActivityType.WALKING:
            color = 'purple';
            break;
          case ActivityType.CYCLING:
            color = 'magenta';
            break;
        }
        return (
          <Tag color={color} key={type}>
            {type.toString().toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Details',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 'fit-content',
      render: (_, record) => {
        return (
          <>
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={() => {
                setRecord(record)
                setIsShareModalOpen(true)
              }}/>
          </>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState<Activity[]>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  function loadData(response: ActivityApi[]) {
    let mappedData: Activity[] = []
    let index = 1;
    response = response.slice(0, 20)
    response.forEach((activity: ActivityApi) => {
      let message = "";
      switch (activity.data.type) {
        case ActivityType.WALKING:
          message = `Steps: ${(activity.data as WalkingActivity).steps}`;
          break;
        case ActivityType.CYCLING:
          let cycling = activity.data as CyclingActivity;
          message = `Distance: ${cycling.distance} ${cycling.unit.toString().toLowerCase()}`;
          break;
      }

      const activityDate = dayjs.unix(activity.created);
      const today = dayjs();
      const yesterday = today.subtract(1, 'day');
      
      let dateText;
      if (activityDate.isSame(today, 'day')) {
        dateText = 'Today';
      } else if (activityDate.isSame(yesterday, 'day')) {
        dateText = 'Yesterday';
      } else {
        dateText = activityDate.format('DD-MM-YYYY');
      }
      
      const timeText = activityDate.format('hh:mm:ss A');
      
      mappedData.push({
        key: index++,
        id: activity.id,
        created: `${dateText}, ${timeText}`,
        type: activity.data.type,
        message: message,
        apiData: activity
      })
    })
    setData(mappedData)
  }

  function listActivity() {
    setTableLoading(true);
    callGet({
      server: Servers.CORE,
      path: '/activity/'
    }).then(async (listActivity) => {
      loadData(await listActivity.json());
      setTableLoading(false);
    });
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
      <LogActivityModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} listActivity={listActivity}/>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activity={record as Activity}
      />
    </>
  )
}

export default LogActivity;
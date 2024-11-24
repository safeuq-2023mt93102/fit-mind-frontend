"use client";
import {CSSProperties, useState, useEffect} from 'react';
import {Button, Modal, Select, Table, Tag, Checkbox, Typography, List, Card, Space, Badge, Radio, theme} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useRouter} from 'next/navigation';
import {useSession, signOut} from 'next-auth/react';
import {Workout, Goal, Servers} from '@/interfaces/api/interfaces';
import {callGet, callPost} from '@/util/util';

const LevelNameMap = {
  BEGINNER: "Beginner",
  ADVANCED: "Advanced",
}

const ExerciseColorMap = {
  BARBELL_SQUATS: 'purple',
  CARDIO: 'purple',
  INCLINE_BENCH_PRESS: 'purple',
  BENCH_PRESS: 'magenta',
  BODY_WEIGHT_SQUATS: 'magenta',
  PULL_UPS: 'green',
  PUSH_UPS: 'green',
  OVERHEAD_PRESS: 'blue',
  PLANK: 'blue',
  DEADLIFTS: 'red',
  INTERVAL_TRAINING: 'red',
  BARBELL_ROWS: 'cyan',
  JUMPING_JACKS: 'cyan',
  DUMBBELL_LUNGES: 'yellow',
  MOUNTAIN_CLIMBERS: 'yellow',
  DUMBBELL_SHOULDER_PRESS: 'lightcoral',
  RUSSIAN_TWISTS: 'lightcoral',
  LEG_PRESS: 'indigo',
  BURPEES: 'indigo',
  INCLINE_DUMBBELL_BENCH_PRESS: 'olive',
  BACK_SQUATS: 'olive',
  LAT_PULL_DOWNS: 'darkslategrey',
  FRONT_SQUATS: 'darkslategrey',
  TRICEP_DIPS: 'brown',
  ROMANIAN_DEADLIFTS: 'brown',
};

const WorkoutPlans = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectLevel, setSelectLevel] = useState("BEGINNER");
  const [selectTarget, setSelectTarget] = useState("GAIN_WEIGHT");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<any[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const {data: session} = useSession();

  useEffect(() => {
    if (session) {
      fetchWorkoutPlans();
    }
  }, []);


  const columns: ColumnsType<Goal> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: ['data', 'type'],
      key: 'type',
      align: 'center',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      align: 'center',
    },
    {
      title: 'Exercise',
      dataIndex: ['data', 'exercise'],
      key: 'exercise',
      align: 'center',
      render: (exercise: string) => {
        return (
          <Tag color={ExerciseColorMap[exercise] || 'gray'}>{exercise && exercise.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: 'Duration (seconds)',
      dataIndex: ['data', 'duration'],
      key: 'duration_seconds',
      align: 'center',
    },
    {
      title: 'Sets',
      dataIndex: ['data', 'sets'],
      key: 'sets',
      align: 'center',
    },
    {
      title: 'Repetitions',
      dataIndex: ['data', 'repetitions'],
      key: 'repetitions',
      align: 'center',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      align: 'center',
      render: (completed: boolean, record: Goal) => (
        <Checkbox
          checked={completed}
          disabled={completed}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
  ];

  const fetchWorkoutPlans = async () => {
    callGet({
      server: Servers.CORE,
      path: "/plan/",
    }).then(async (response) => {
      if (response.status === 401) {
        return signOut();
      }
      const plans = await response.json();
      console.log(plans)
      setWorkoutPlans(plans);
      setPlansLoading(false);
    });
  };

  const fetchGoalsForWorkoutPlan = async (planId: string) => {
    callGet({
      server: Servers.CORE,
      path: `/plan/${planId}`,
    }).then(async (response) => {
      if (response.status === 401) {
        return signOut();
      }
      const plans = await response.json();
      const workoutsList: Workout[] = plans.workouts;
      const goalIds = workoutsList.flatMap((workout) => workout.goals);
      fetchGoals(goalIds).then((fetchedGoals) => {
        setSelectedGoals(fetchedGoals || []);
      });
    });
  };

  const fetchGoals = async (goalIds: string[]) => {
    setTableLoading(true);
    try {
      const goalDataPromises = goalIds.map((id) =>
        callGet({
          server: Servers.CORE,
          path: "/goals/" + id,
        }).then(async (response) => {
          if (response.status === 401) {
            return signOut();
          }
          return response.json();
        })
      );

      const fetchedGoals = await Promise.all(goalDataPromises);

      setGoals(fetchedGoals);
      return fetchedGoals;
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleCheckboxChange = async (goal: Goal) => {
    const updatedCompleted: boolean = !goal.completed;

    const updatedGoals = goals.map((item) =>
      item.id === goal.id ? {...item, completed: updatedCompleted} : item
    );
    setGoals(updatedGoals);

    callPost({
      server: Servers.CORE,
      path: "/goals/" + goal.id,
      payload: {
        completed: updatedCompleted,
      },
    }).then(async (response) => {
      if (response.status === 401) {
        return signOut();
      }
    });
  };

  const handleLevelChange = (value: string) => {
    setSelectLevel(value);
  };

  const handleTargetChange = (value: string) => {
    setSelectTarget(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);

    callPost({
      server: Servers.CORE,
      path: "/plan/",
      payload: {
        level: selectLevel,
        target: selectTarget,
      },
    }).then(async (response) => {
      setLoading(false);
      switch (response.status) {
        case 200:
          setIsModalOpen(false);
          response.json().then((data: { workouts: Workout[] }) => {
            setIsModalOpen(false);
            fetchWorkoutPlans();
          });
          break;
        case 401:
          router.push("/");
          break;
        default:
          console.error("An error occurred:", response.status);
      }
    }).catch((error) => {
      setLoading(false);
      console.error("Error:", error);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemStyle: CSSProperties = {
    marginBottom: 16,
  };

  const {token: {colorBgLayout, colorBgContainer}} = theme.useToken();

  let createButton = (
    <Button type="primary" onClick={() => setIsModalOpen(true)}>
      Create Workout Plan
    </Button>
  );

  // <Typography.Text>No workout plans available.</Typography.Text>
  return (
    <Space direction="vertical" size="large" style={{width: "100%", padding: "20px", backgroundColor: colorBgLayout}}>
      <Radio.Group>
        <List
          bordered
          dataSource={workoutPlans}
          loading={plansLoading}
          style={{backgroundColor: colorBgContainer}}
          header={<Typography.Text strong style={{fontSize: "16px"}}>Workout Plans</Typography.Text>}
          footer={createButton}
          renderItem={(plan) => (

            <Badge.Ribbon
              color={
                plan.level === "BEGINNER"
                  ? "green"
                  : plan.level === "INTERMEDIATE"
                    ? "orange"
                    : "red"
              }
              text={LevelNameMap[plan.level]}>
              <List.Item
                onClick={() => fetchGoalsForWorkoutPlan(plan.id)}
                style={{cursor: "pointer"}}>
                <Radio value={plan.id} style={{marginRight: "56px"}}>
                  <Typography.Text>{plan.name}</Typography.Text>
                </Radio>
              </List.Item>
            </Badge.Ribbon>
          )}
        />
      </Radio.Group>

      {selectedGoals.length > 0 && (
        <Card title="Workout Goals" bordered>
          <Table
            dataSource={goals}
            loading={tableLoading}
            columns={columns}
            rowKey="id"
          />
        </Card>
      )}

      <Modal
        title="Create a Workout Plan"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Create Plan
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Space direction="vertical" size="small" style={{width: "100%", height: "100%"}}>
          <Select
            defaultValue="BEGINNER"
            style={{...itemStyle}}
            onChange={handleLevelChange}
            options={[
              {value: "BEGINNER", label: LevelNameMap.BEGINNER},
              {value: "ADVANCED", label: LevelNameMap.ADVANCED},
            ]}
          />
          <Select
            defaultValue="GAIN_WEIGHT"
            style={{...itemStyle}}
            onChange={handleTargetChange}
            options={[
              {value: "GAIN_WEIGHT", label: "Gain Weight"},
              {value: "LOSE_WEIGHT", label: "Lose Weight"},
            ]}
          />
        </Space>
      </Modal>
    </Space>
  );
};

export default WorkoutPlans;
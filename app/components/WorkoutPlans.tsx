"use client";
import {CSSProperties, useState, useEffect } from 'react';
import {Button, Modal, Select, Table, Flex, Tag, Checkbox, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import {Workout, Goal} from "@/interfaces/api/interfaces";

const WorkoutPlans = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("BEGINNER");
  // const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Goal> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: ['data', 'type'],
      key: 'type',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Exercise',
      dataIndex: ['data', 'exercise'],
      key: 'exercise',
      render: (exercise: string) => {
        let color = 'gray';
        switch (exercise) {
          case "BARBELL_SQUATS":
            color = 'purple';
            break;
          case "BENCH_PRESS":
            color = 'magenta';
            break;
          case "PULL_UPS":
            color = 'green';
            break;
          case "OVERHEAD_PRESS":
            color = 'blue';
            break;
          case "DEADLIFTS":
            color = 'red';
            break;
          case "BARBELL_ROWS":
            color = 'cyan';
            break;
          case "DUMBBELL_LUNGES":
            color = 'yellow';
            break;
          case "DUMBBELL_SHOULDER_PRESS":
            color = 'lightcoral';
            break;
          case "LEG_PRESS":
            color = 'indigo';
            break;
          case "INCLINE_DUMBBELL_BENCH_PRESS":
            color = 'olive';
            break;
          case "LAT_PULL_DOWNS":
            color = 'darkslategrey';
            break;
          case "TRICEP_DIPS":
            color = 'brown';
            break;
        }
        return (
          <Tag color={color} key={exercise}>
            {exercise.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Sets',
      dataIndex: ['data', 'sets'],
      key: 'sets',
    },
    {
      title: 'Repetitions',
      dataIndex: ['data', 'repetitions'],
      key: 'repetitions',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean, record: Goal) => (
        <Checkbox
          checked={completed}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    }
  ];

  const handleOk = () => {
    setLoading(true);

    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/plan',
        payload: {
          level: selectValue,
          target: "GAIN_WEIGHT",
        }
      })
    }).then((response) => {
      setLoading(false);
      switch (response.status) {
        case 200:
          setIsModalOpen(false);
          response.json().then((data: { workouts: Workout[] }) => {
            const workoutsList: Workout[] = data.workouts;
            // setWorkouts(workoutsList);
            const goalIds = workoutsList.flatMap(workout => workout.goals);
            fetchGoals(goalIds)
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

  const fetchGoals = async (goalIds: string[]) => {
    setTableLoading(true);
    try {
      const goalDataPromises = goalIds.map(id =>
        fetch("/api/get", {
          method: "POST",
          body: JSON.stringify({
            path: '/goals/' + id
          })
        }).then((response) => {
          if (response.status === 401) {
            return signOut();
          }
          return response.json();
        })
      );
  
      const fetchedGoals = await Promise.all(goalDataPromises);
      
      setGoals(fetchedGoals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleCheckboxChange = async (goal: Goal) => {
    const updatedCompleted = !goal.completed;
    
    const updatedGoals = goals.map((item) =>
      item.id === goal.id ? { ...item, completed: updatedCompleted } : item
    );
    setGoals(updatedGoals);
  
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/goals/' + goal.id,
        payload: {
          completed: updatedCompleted
        }
      })
    }).then((response) => {
      if (response.status === 401) {
        return signOut();
      }
    })
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemStyle: CSSProperties = {
    // marginTop: "8px",
    // width: "100%"
  };

  return (
    <div>
      <Flex style={{ height: "100%", padding: "20px" }} justify={"center"} gap={"middle"} vertical>
        
        {goals.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            <Typography.Title level={4}>No Goals Created Yet</Typography.Title>
            <Typography.Paragraph>
              Start by creating a new workout plan to track your progress.
            </Typography.Paragraph>
            <Button type="primary" onClick={showModal}>
              Create Workout Plan
            </Button>
          </div>
        ) : (
          <div>
          <Flex gap={"middle"}>
            <Button type="primary" onClick={showModal}>
              Create new Workout Plan
            </Button>
          </Flex>
          <Table
            dataSource={goals}
            columns={columns}
            loading={tableLoading}
            style={{ width: "100%" }}
          />
          </div>
        )}
  
        <div style={{ flexGrow: 1 }} />
      </Flex>
  
      <Modal
        title="Create a workout plan"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Create plan
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Flex gap={"small"} vertical>
          <Select
            defaultValue="BEGINNER"
            style={{ ...itemStyle }}
            onChange={handleChange}
            options={[
              { value: "BEGINNER", label: "Beginner Full Body Workout" },
              { value: "INTERMEDIATE", label: "Intermediate Cardio Blast" },
              { value: "ADVANCED", label: "Advanced Strength Training" },
            ]}
            value={selectValue}
          />
        </Flex>
      </Modal>
    </div>
  );
}

export default WorkoutPlans;
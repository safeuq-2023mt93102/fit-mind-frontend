"use client";
import {Spin} from 'antd';
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/activity_logging");
  }, [router]);
  return (
    <Spin
      spinning={true}
      tip="Loading"
      size={"large"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"}}>
    </Spin>
  )
}
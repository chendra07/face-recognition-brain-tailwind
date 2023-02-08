import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Card } from "../components";
import { httpPostViewHistory } from "../requests/image";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-hot-toast";

type HistoryType = {
  historyid: number;
  imageurl: string;
  date: string;
  userid: number;
  isdeleted: boolean;
};

export default function PgHistory() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [skip, setskip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isLoading, setisLoading] = useState(true);
  const [totalHistory, settotalHistory] = useState(0);
  const [historyList, sethistoryList] = useState<HistoryType[]>([]);

  useEffect(() => {
    setisLoading(true);
    httpPostViewHistory(skip, limit, currentUser?.token)
      .then((historyOutput) => {
        settotalHistory(historyOutput.total);
        sethistoryList(historyOutput.data);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setisLoading(false));
  }, [skip, limit]);

  const columns: ColumnsType<HistoryType> = [
    {
      title: "#",
      width: "20px",
      dataIndex: "historyid",
      render: (text: string, record: any, index: number) => (
        <p key={index}>{skip * limit + index + 1}</p>
      ),
    },
    {
      title: "Image Url",
      dataIndex: "imageurl",
      render: (text: string, record: any, index: number) => (
        <a key={index} href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Date (WIB)",
      dataIndex: "date",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = date.toLocaleString("id", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        });
        return <p>{formattedDate}</p>;
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="flex flex-1 max-w-[70vw] justify-center items-center">
        <Table
          loading={isLoading}
          pagination={{
            onChange(current, pageSize) {
              setskip(current - 1);
              setLimit(pageSize);
            },
            total: totalHistory,
            defaultCurrent: skip + 1,
            defaultPageSize: limit,
            hideOnSinglePage: false,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15],
          }}
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={historyList}
        />
      </Card>
    </div>
  );
}

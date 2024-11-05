import { Breadcrumb, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => {
            return (
                <div>
                    {record.firstName} {record.lastName}
                </div>
            );
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, record: User) => {
            return <div>{record.tenant?.name}</div>;
        },
    },
];


export default function Users() {


    const { user } = useAuthStore();
      if(user?.role !== 'admin'){
        return <Navigate to={`/`} replace={true} />;
    }

    const {data: users = [], isLoading, isError, error} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
        return getUsers().then((res) => res.data);  // axios returns data in res.data
        }
    });

  return (
    <>
    <Space direction="vertical" size="large" style={{width: '100%'}}>

      <Breadcrumb
          separator={<RightOutlined />}
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
      />

      <Table columns={columns} dataSource={users} rowKey="id" />

    </Space>

      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
    </>
)
}

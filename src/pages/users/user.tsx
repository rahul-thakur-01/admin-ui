import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";

export default function Users() {
  const {data: users = [], isLoading, isError, error} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return getUsers().then((res) => res.data);  // axios returns data in res.data
    }
  });
  return (
    <>
    
      <Breadcrumb
          separator={<RightOutlined />}
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
      

      />

      <h1>Users</h1>
      { users && (
        users.map((user: User) => (
          <div key={user.id}>
            <div>{user.firstName}</div>
          </div>
        ))
      )}




      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

    </>
)
}

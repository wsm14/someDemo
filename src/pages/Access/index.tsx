import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { useLocation } from "umi"
import { history } from "umi"
const AccessPage: React.FC = (props) => {
  const access = useAccess();
  const location1 = useLocation()
  console.log(location1, "location")
  console.log(window.location)
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;

import React from 'react';
import { Layout, Menu, Avatar, Dropdown, } from 'antd';
import { MedicineBoxOutlined,FileOutlined } from '@ant-design/icons';
import style from './Dashboard.module.css'
import { useNavigate, Outlet } from "react-router-dom";

export const Dashboard = ({exit}) => {


  const layouts =['Medicamentos', 'Registrar Medicina']
  const nestedRouter=['','new']
  const navigate = useNavigate();

  const handleCurrentLayout =(e)=>{
    navigate(`${nestedRouter[e.keyPath[0]-1]}`, { replace: true })
  }

  const { Header, Content, Footer, Sider } = Layout;
  const menu = (
    <Menu
    style={{'position':'fixed'}}
      items={[
        {
          key: '1',
          label: (
            <button onClick={()=>{
              exit().then(() => {
                // Sign-out successful.
                console.log('Si')
              }).catch((error) => {
                // An error happened.
                console.log('no')
              });
            }}>
              salir
            </button>
          ),
        }
      ]}
    />
  );

return (
  <Layout >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        
        <div className={style.logo} >
          Casa de la tercera edad
        </div>
        <Menu
          onClick={handleCurrentLayout}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[MedicineBoxOutlined,FileOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `${layouts[index]}`
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header
          className={style.siteLayoutSubHeaderBackground}
          style={{
            padding: 20,
            display:'flex',
            flexDirection:'column',
            alignItems:'flex-end',
            justifyContent:'center'
          }}
        >

        <Dropdown overlay={menu} placement="bottom">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Dropdown>
      
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            position:'relative'
          }}
        >
          <div
            className={style.siteLayoutBackground}
            style={{
              padding: 24,
              minHeight: 360,
            }}
          ><Outlet />
            {/* {
            curretLayout==='Medicamentos'?
              <ListMedicine />:
              <RegisterMedicine />
          } */}
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

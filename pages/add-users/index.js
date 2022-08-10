import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import React, { useState } from 'react'; import PagesHeader from '../../components/header/Pageheader';

function Users() {

    return (
        <>
            <PagesHeader title="Users" subTitle="All system users" />

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                colon={false}
               
              
            >

                <Form.Item label="First Name">
                    <Input />
                </Form.Item>

                <Form.Item label="Last Name">
                    <Input />
                </Form.Item>

                <Form.Item label="Email">
                    <Input type="email" />
                </Form.Item>

                <Form.Item label="Password">
                    <Input type="password" />
                </Form.Item>

                <Form.Item label="User Role">
                    <Select>
                        <Select.Option value="demo">Full Admin Access</Select.Option>
                        <Select.Option value="demo">Restricted Access</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label=" ">
                    <Button type='primary' size='block'>Create User</Button>
                </Form.Item>
            </Form>

        </>
    );
}

export default Users;
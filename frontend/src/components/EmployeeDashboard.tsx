import React, {useState,useEffect,useCallback} from 'react';
import {
    Table,
    Card,
    Button,
    Space,
    Input,
    Select,
    DatePicker,
    Tag,
    Switch,
    Progress,
    Drawer,
    Form,
    message,
    Row,
    Col,
    Typography,
    Empty,
    Spin,
    Alert,
} from 'antd';

import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    TableOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';

import {useEmployees} from '../hooks/useEmployees';
import { useDebounce } from '../hooks/useDebounce';
import { Employee,EmployeeDto,EmployeeFilter } from '../types/employee';
import dayjs from 'dayjs';

const {Title} = Typography;
const {Option} = Select;
const {RangePicker} = DatePicker;

const EmployeeDashboard : React.FC = () => {
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [showArchived, setShowArchived] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [saveAndContinue, setSaveAndContinue] = useState(false);
    const [form] = Form.useForm();

    //Filter State
    const [filters, setFilters] = useState<EmployeeFilter>({
        page: 1,
        pageSize: 10,
    });

    const [searchTerms, setSearchTerms] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerms, 500);

    const {
        employees,
        loading,
        error,
        loadEmployees,
        createEmployee,
        updateEmployee,
        archiveEmployee,
        deleteEmployee,
    } = useEmployees();

    // Load Employees when filter changes
    useEffect(() => {
    const updatedFilters: EmployeeFilter = {
      ...filters,
      searchTerm: debouncedSearchTerm || undefined,
      department: departmentFilter || undefined,
      status: statusFilter || undefined,
      startDate: dateRange?.[0]?.format('YYYY-MM-DD'),
      endDate: dateRange?.[1]?.format('YYYY-MM-DD'),
    };
    
    if (!showArchived) {
      updatedFilters.status = 'Active';
    }
    
    loadEmployees(updatedFilters);
  }, [debouncedSearchTerm, departmentFilter, statusFilter, dateRange, showArchived, filters, loadEmployees]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setDrawerVisible(true);
    form.setFieldsValue({
      ...employee,
      joiningDate: dayjs(employee.joiningDate),
    });
  };

  const handleSaveEmployee = async (values: any) => {
    const employeeData: EmployeeDto = {
        ...values,
        joiningDate: values.joiningDate.format('YYYY-MM-DD'),
    };

    const success = editingEmployee
        ? await updateEmployee(editingEmployee.id, employeeData)
        : await createEmployee(employeeData);

    if(success){
        if(!saveAndContinue){
            setDrawerVisible(false);
            form.resetFields();
        }else{
            //Reset form for new entry if continuing
            if(!editingEmployee){
                form.resetFields();
            }
        }
        setSaveAndContinue(false);
    }
  };

  const handleArchive = async (employee: Employee) => {
    await archiveEmployee(employee.id);
  }
  const handleDelete = async (employee: Employee) => {
    await deleteEmployee(employee.id);
  }

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        sorter: true,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Joining Date',
        dataIndex: 'joiningDate',
        key: 'joiningDate',
        render: (date: string) => dayjs(date).format('MMM D, YYYY'),
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
            <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
        ),
    },
    {
        title: 'Performance',
        dataIndex: 'performanceScore',
        key: 'performanceScore',
        render: (score: number) => (
            <Progress percent={score} size="small" status={score >= 80 ? 'success' : score >= 60 ? 'normal' : 'exception'} />
        ),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_:any, record: Employee) => (
            <Space>
                <Button 
                    type="link"
                    icon={<EditOutlined />}
                    onClick={()=>handleEditEmployee(record)}
                >
                    Edit
                </Button>
                <Button 
                    type="link"
                    danger={record.status === 'Active'}
                    icon = {record.status === 'Active' ? <DeleteOutlined /> : <EyeOutlined />}
                    onClick = {() => handleArchive(record)}
                >
                    {record.status === 'Active' ? 'Archive' : 'Restore'}
                </Button>
                <Button 
                    type="link"
                    danger
                    icon = {<DeleteOutlined />}
                    onClick = {() => handleDelete(record)}
                >
                    Delete
                </Button>
            </Space>
        )

    }
  ];
  if(error){
    return(
        <Alert 
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{margin: '20px'}}
        />
    );
  }

  return(
    <div style={{ padding: '24px'}}>
        <Row justify="space-between" align="middle" style={{marginBottom: 24}}>
            <Col>
                <Title level={2}>Employee Management System</Title>
            </Col>
            <Col>
                <Space>
                    <Button 
                        type={viewMode === 'table' ? 'primary' : 'default'}
                        icon={<TableOutlined />}
                        onClick= {() => setViewMode('table')}
                    >
                        Table
                    </Button>
                    <Button 
                        type={viewMode === 'card'?'primary':'default'}
                        icon={<AppstoreOutlined />}
                        onClick = {() => setViewMode('card')}
                    >
                        Cards
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>
                        Add Employee
                    </Button>
                </Space>
            </Col>
        </Row>
        {/* Filters */}
        <Card style={{marginBottom: 24}}>
            <Row gutter={[16,16]} align="middle">
                <Col xs={24} sm={8}><strong><center>Employees</center></strong>
                    <Input 
                        placeholder="Search Employees......"
                        prefix={<SearchOutlined />}
                        value={searchTerms}
                        onChange={(e)=> setSearchTerms(e.target.value)}
                        allowClear
                    />
                </Col>
                <Col xs={12} sm={4}><strong><center>Department</center></strong>
                    <Select 
                        placeholder="Department"
                        value={departmentFilter}
                        onChange={setDepartmentFilter}
                        allowClear
                        style={{width:'100%'}}
                    >
                        <Option value ="Engineering">Engineering</Option>
                        <Option value ="HR">HR</Option>
                        <Option value ="Marketing">Marketing</Option>
                        <Option value ="Sales">Sales</Option>
                        <Option value ="Finance">Finance</Option>
                    </Select>
                </Col>
                <Col xs={12} sm={4}><strong><center>Status</center></strong>
                    <Select 
                        placeholder="status" 
                        value={statusFilter}
                        onChange={setStatusFilter}
                        allowClear
                        style={{width: '100%'}}
                    >
                        <Option value="Active">Active</Option>
                        <Option value="Archived">Archived</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={6}><strong><center>Date</center></strong>
                    <RangePicker
                    style={{ width: '100%' }}
                    value={dateRange}
                    //onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
                    onChange={(dates) => {
                        // Handle the Ant Design RangePicker type
                        if (dates && dates[0] && dates[1]) {
                            setDateRange([dates[0], dates[1]]);
                        } else {
                            setDateRange(null);
                        }
                    }}
                    placeholder={['Start Date', 'End Date']}
                    />
                </Col>
                <Col xs={24} sm={2}>
                    <Switch 
                        checkedChildren = "Archived"
                        unCheckedChildren = "Active"
                        checked = {showArchived}
                        onChange={setShowArchived}
                    />
                </Col>
            </Row>
        </Card>

        {/* Employee List */}
        <Spin spinning = {loading}>
            {employees.length === 0 ? (
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description = "No employees found"
                 />
            ) : viewMode === 'table' ? (
                <Table 
                    columns = {columns}
                    dataSource = {employees}
                    rowKey = "id"
                    pagination = {{
                        current: filters.page,
                        pageSize: filters.pageSize,
                        total: employees.length,
                        showSizeChanger: true,
                        pageSizeOptions: ['10','20','50'],
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    onChange={(pagination, filters, sorter:any) => {
                        setFilters(prev => ({
                            ...prev,
                            page: pagination.current || 1,
                            pageSize: pagination.pageSize || 10,
                            sortBy: sorter.field,
                            sortDescending: sorter.order === 'descend',
                        }));
                    }}
                 />
            ) : (
                <Row gutter={[16, 16]}>
                    {employees.map(employee => (
                        <Col xs={24} sm={12} md={8} lg={6} key={employee.id}>
                            <Card 
                                title={employee.name}
                                extra={<Tag color={employee.status === 'Active' ? 'green' : 'red'}>{employee.status}</Tag>}
                                actions={[
                                    <EditOutlined key="edit" onClick={() => handleEditEmployee(employee)} />,
                                    employee.status === 'Active' ? (
                                        <DeleteOutlined key="archived" onClick={() => handleArchive(employee)} />
                                    ) : (
                                        <EyeOutlined key="restore" onClick={() => handleArchive(employee)} />
                                    ),
                                    <DeleteOutlined key="delete" onClick={() => handleDelete(employee)} />,
                                ]}
                            >
                                <p><strong>Department: </strong>{employee.department}</p>
                                <p><strong>Role: </strong>{employee.role}</p>
                                <p><strong>Joining Date: </strong>{dayjs(employee.joiningDate).format('MMM D, YYYY')}</p>
                                <div>
                                    <strong>Performance: </strong>
                                    <Progress percent={employee.performanceScore} size="small" />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Spin>
        {/* Edit/Create Drawer */}
        <Drawer 
            title={editingEmployee ? 'Edit Employee' : 'Add Employee'} 
            width={720}
            onClose={() => {
                setDrawerVisible(false);
                form.resetFields();
            }}
            open={drawerVisible}
            bodyStyle={{ paddingBottom : 80}}
            extra={
                <Space>
                    <Button onClick={() => {
                            setSaveAndContinue(true);
                            form.submit();
                        }}
                    >
                        Save & Continue
                    </Button>
                    <Button 
                        type="primary"
                        onClick={() => {
                            setSaveAndContinue(false);
                            form.submit();
                        }}
                    >
                        Save
                    </Button>
                </Space>
            }
        >
            <Form 
                form={form}
                layout="vertical"
                onFinish={handleSaveEmployee}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter employee name' }]}
                        >
                            <Input placeholder="Please enter employee name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="department"
                            label="Department"
                            rules={[{ required: true, message: 'Please select a department'}]}
                        >
                            <Select placeholder="Please select a department">
                                <Option value="Engineering">Engineering</Option>
                                <Option value="HR">HR</Option>
                                <Option value="Marketing">Marketing</Option>
                                <Option value="Sales">Sales</Option>
                                <Option value="Finance">Finance</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please enter a role'}]}
                        >
                            <Input placeholder='Please enter a role' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="joiningDate"
                            label="Joining Date"
                            rules={[{ required: true, message:'Please select a joining date'},
                                {
                                    validator: (_, value) => {
                                        if(value && value > dayjs()) {
                                            return Promise.reject(new Error('Joining Date cannot be in future'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <DatePicker style={{width: '100%'}} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            name="status"
                            label="Status"
                            rules={[{required: true, message: 'Please select a status'}]}
                        >
                            <Select placeholder="Please select a status">
                                <Option value="Active">Active</Option>
                                <Option value="Archived">Archived</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="performanceScore"
                            label="Performance Score"
                            rules={[{required: true, message: 'Please enter performance score'},
                                {
                                    validator: (_,value) => {
                                        if(value < 0 || value > 100){
                                            return Promise.reject(new Error('Score must be between 0 and 100'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input type="number" min={0} max={100} placeholder="0-100" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form> 
        </Drawer>
    </div>
  );
};

export default EmployeeDashboard;
import { useBackLog } from 'hooks/useBackLog';
import {View, useEffect, useState} from 'react'
import { Table, TableHeader } from 'semantic-ui-react';
import { PageWrapper } from 'style/common.style';
import styled from 'styled-components';
import { formattedWeekDate } from 'utils/dateFormatter';
import { logTypeFormatted } from 'utils/statusFormatter';



const BackLog = ()=>{
    const [logType, setLogType] = useState();
    const [controllerType, setControllerType] = useState();
    const [startData, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const {data:backlogData} = useBackLog(10,1,logType,controllerType,startData,endDate);
    const [dataCount, setDataCount] = useState([]);
    useEffect(()=>{
        setDataCount(backlogData?.data?.items.map((v)=>{
            return {id:v.id ,value :false}
        }));
    },[backlogData?.data])
    return <PageWrapper>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>사용자</Table.HeaderCell>
                    <Table.HeaderCell>메서드</Table.HeaderCell>
                    <Table.HeaderCell>메시지</Table.HeaderCell>
                    <Table.HeaderCell>갯수</Table.HeaderCell>
                    <Table.HeaderCell>날짜</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { backlogData?.data?.items?.map((v,i)=>{
                    return (
                        <Table.Row key={v.id}  style={{cursor:'pointer'}} onClick={()=>setDataCount(dataCount.map((data)=>{
                            if(v.id ===data.id){
                                return {id:data.id, value :!data.value}
                            }
                            return data
                        }))}>
                            <Table.Cell>
                                {v.userCode}
                            </Table.Cell>
                            <Table.Cell>
                                {logTypeFormatted(v.logType)}
                            </Table.Cell>
                            <Table.Cell>
                                {dataCount && dataCount[i].value ?v.logs?.map((s)=>{
                                    return <LogMessage count={v.logs.length}>{s}</LogMessage>
                                }):
                                v.logs[0]}
                            </Table.Cell>
                            <Table.Cell>
                                {v.logs.length}
                            </Table.Cell>
                            <Table.Cell>
                                {v.createdDateTime}
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
               
            </Table.Body>
        </Table>
    </PageWrapper>
}

export default BackLog;

const LogMessage = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: ${({count})=> count > 1 && '1px solid #343337'};
`
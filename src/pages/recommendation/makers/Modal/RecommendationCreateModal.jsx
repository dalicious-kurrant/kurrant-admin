import {useUpdateMakersDetail} from 'hooks/useMakers';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Header,
  Form,
  Modal,
  Input,
  Label,
  Checkbox,
  TextArea,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Select from 'react-select';

// import {
//   fillGroupsDropboxObjectForRecommendation,
//   fillMakersDropboxObjectForFoodGroup,
//   fillMakersDropboxObjectForRecommendation,
// } from 'utils/dataModifyLogic/logic';

import {
  fillFoodGroupDropboxObjectForRecommendation,
  fillGroupsDropboxObjectForRecommendation,
} from 'utils/dataFormChangeLogics/logic';

import useRecommendationMutation from '../useRecommendationMutation';
import useGetRecommendationMakersQuery from '../useGetRecommendationMakersQuery';
import {OfficialFoodType} from '../type';

function RecommendationCreateModal({open, setOpen}) {
  const [groups, setGroups] = useState('');

  //
  const [foodTypes1, setFoodTypes1] = useState('');
  const [importance1, setImportance1] = useState('');
  const [foodTypes2, setFoodTypes2] = useState('');
  const [importance2, setImportance2] = useState('');
  const [foodTypes3, setFoodTypes3] = useState('');
  const [importance3, setImportance3] = useState('');
  const [foodTypes4, setFoodTypes4] = useState('');
  const [importance4, setImportance4] = useState('');
  const [foodTypes5, setFoodTypes5] = useState('');
  const [importance5, setImportance5] = useState('');
  const [foodTypes6, setFoodTypes6] = useState('');
  const [importance6, setImportance6] = useState('');

  //
  const [foodGroupMon, setFoodGroupMon] = useState('');
  const [foodGroupTue, setFoodGroupTue] = useState('');
  const [foodGroupWed, setFoodGroupWed] = useState('');
  const [foodGroupThu, setFoodGroupThu] = useState('');
  const [foodGroupFri, setFoodGroupFri] = useState('');
  const [foodGroupSat, setFoodGroupSat] = useState('');
  const [foodGroupSun, setFoodGroupSun] = useState('');

  const {createRecommendationMutation} = useRecommendationMutation(() => {
    setOpen(false);
  });

  const {groupsList, foodGroupList} = useGetRecommendationMakersQuery();

  const [groupsDropbox, setGroupsDropbox] = useState([]);
  const [foodGroupDropbox, setFoodGroupDropbox] = useState([]);

  useEffect(() => {
    if (groupsList) {
      setGroupsDropbox(fillGroupsDropboxObjectForRecommendation(groupsList));
    } else {
      console.log('groupsList가없다');
    }
  }, [groupsList]);

  useEffect(() => {
    if (foodGroupList) {
      setFoodGroupDropbox(
        fillFoodGroupDropboxObjectForRecommendation(foodGroupList),
      );
    } else {
      console.log('groupsList가없다');
    }
  }, [foodGroupList]);

  useEffect(() => {
    console.log(foodGroupDropbox);
  }, [foodGroupDropbox]);

  const onSubmit = () => {
    const makeFoodType = (foodType, importance, num) => {
      if (foodType !== '' && importance !== '') {
        return {
          order: num,
          foodTypes: foodType,
          importances: importance,
        };
      }
    };

    let FoodTypeData = [
      makeFoodType(foodTypes1, importance1, 0),
      makeFoodType(foodTypes2, importance2, 1),
      makeFoodType(foodTypes3, importance3, 2),
      makeFoodType(foodTypes4, importance4, 3),
      makeFoodType(foodTypes5, importance5, 4),
      makeFoodType(foodTypes6, importance6, 5),
    ].filter(v => v);

    const makeDailyFoodGroups = (foodGroups, days) => {
      if (foodGroups !== '') {
        return {
          days: days,
          foodGroups: foodGroups,
        };
      }
    };

    let DailyFoodGroups = [
      makeDailyFoodGroups(foodGroupMon, 0),
      makeDailyFoodGroups(foodGroupTue, 1),
      makeDailyFoodGroups(foodGroupWed, 2),
      makeDailyFoodGroups(foodGroupThu, 3),
      makeDailyFoodGroups(foodGroupFri, 4),
      makeDailyFoodGroups(foodGroupSat, 5),
      makeDailyFoodGroups(foodGroupSun, 6),
    ].filter(v => v);

    const data = {
      groups: groups,
      foodType: [...FoodTypeData],
      dailyFoodGroups: [...DailyFoodGroups],
    };

    console.log(data);

    if (!groups || groups.length < 1) {
      // 고객사값이 없을 경우
      window.confirm('고객사 값이 없습니다');
    }

    // else if (FoodTypeData.length < 1) {
    //   // 추천 식품타입이 하나도 없을 경우

    //   window.confirm(
    //     '적어도 하나의 추천 식품타입, 추천비중을 적어주십시오, 추천 식품타입과 추천비중값이 동시에 기입이 되어있는지 확인해 주십시오',
    //   );
    // }
    else {
      createRecommendationMutation(data);
    }
  };

  useEffect(() => {
    if (!open) {
      setGroups('');
      setFoodTypes1('');
      setImportance1('');
      setFoodTypes2('');
      setImportance2('');
      setFoodTypes3('');
      setImportance3('');
      setFoodTypes4('');
      setImportance4('');
      setFoodTypes5('');
      setImportance5('');
      setFoodTypes6('');
      setImportance6('');
      setFoodGroupMon('');
      setFoodGroupTue('');
      setFoodGroupWed('');
      setFoodGroupThu('');
      setFoodGroupFri('');
      setFoodGroupSat('');
      setFoodGroupSun('');
    }
  }, [open]);

  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>데이터 추가</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <Form.Field>
                <FlexBox width={240}>
                  <Label size="mini">고객사</Label>
                  <SelectBox
                    placeholder="메이커스 리스트"
                    options={groupsDropbox}
                    onChange={e => {
                      if (groups !== '') {
                        setGroups(`${groups}, ${e.value.toString()}`);
                      } else {
                        setGroups(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="고객사(필수)"
                    // defaultValue={nowData.name}
                    value={groups}
                    disabled
                    // onChange={(e, data) => {
                    //   //   setName(data.value);
                    // }}
                  />
                  <ResetButton
                    onClick={() => {
                      setGroups('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 1</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes1 !== '') {
                        setFoodTypes1(`${foodTypes1}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes1(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes1}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes1('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance1(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 2</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes2 !== '') {
                        setFoodTypes2(`${foodTypes2}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes2(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes2}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes2('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance2(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>{' '}
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 3</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes3 !== '') {
                        setFoodTypes3(`${foodTypes3}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes3(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes3}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes3('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance3(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 4</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes4 !== '') {
                        setFoodTypes4(`${foodTypes4}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes4(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes4}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes4('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance4(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 5</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes5 !== '') {
                        setFoodTypes5(`${foodTypes5}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes5(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes5}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes5('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance5(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>{' '}
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 6</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes6 !== '') {
                        setFoodTypes6(`${foodTypes6}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes6(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes6}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes6('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={140}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setImportance6(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>

            <LineBox>
              {/* <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">추천 식품 타입 1</Label>
                  <SelectBox
                    width={160}
                    placeholder={
                      <SelectBoxPlaceholder>
                        식품 타입 선택
                      </SelectBoxPlaceholder>
                    }
                    options={OfficialFoodType}
                    onChange={e => {
                      if (foodTypes1 !== '') {
                        setFoodTypes1(`${foodTypes1}, ${e.value.toString()}`);
                      } else {
                        setFoodTypes1(`${e.value.toString()}`);
                      }
                    }}
                  />
                  <GroupsInput
                    placeholder="예) 샐러드, 정찬 도시락"
                    // defaultValue={nowData.name}
                    value={foodTypes1}
                    disabled
                  />
                  <ResetButton
                    onClick={() => {
                      setFoodTypes1('');
                    }}>
                    리셋
                  </ResetButton>
                </FlexBox>
              </Form.Field> */}

              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_월</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupMon(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_화</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupTue(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_수</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupWed(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_목</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupThu(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_금</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupFri(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_토</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupSat(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={180}>
                  <Label size="mini">상품 그룹 확정 추가_일</Label>
                  <Input
                    placeholder="예) 수미찬_정식_A"
                    // defaultValue={nowData.groupNumbers}
                    onChange={(e, data) => {
                      //   setGroupNumbers(data.value);
                      setFoodGroupSun(data.value);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            type="submit"
            content="추가"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={onSubmit}
          />
        </Modal.Actions>
      </Modal>
    </Form>
  );
}

export default RecommendationCreateModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  /* margin-right: 10px; */
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const FlexBox2 = styled.div`
  display: flex;
  gap: 10px;
  width: ${({width}) => (width ? `${width}px` : '100px')};
`;
const LineBox = styled.div`
  display: flex;
  font-size: 12px;
  gap: 20px;
`;

const SelectBox = styled(Select)`
  width: ${({width}) => width}px;

  /* height: 40px; */
  /* margin-right: 50px; */
`;

const SelectBoxPlaceholder = styled.span`
  color: #c7c7c7;
`;

const ResetButton = styled.button``;

const GroupsInput = styled.input`
  &::placeholder {
    color: #bebebe;
  }

  padding-left: 10px;
  /* background-color: black; */
  color: black;
  height: 30px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 3px;
`;

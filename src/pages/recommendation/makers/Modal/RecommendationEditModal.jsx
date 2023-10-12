import React, {useEffect, useState} from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Select from 'react-select';

// import {
//   fillGroupsDropboxObjectForRecommendation,
//   fillMakersDropboxObjectForFoodGroup,
//   fillMakersDropboxObjectForRecommendation,
// } from 'utils/dataModifyLogic/logic';

import {
  adaptFoodGroupListToFoodGroupDropboxOptions,
  fillFoodGroupDropboxObjectForRecommendation,
  fillGroupsDropboxObjectForRecommendation,
} from 'utils/dataFormChangeLogics/logic';

import useRecommendationMutation from '../useRecommendationMutation';
import useGetRecommendationMakersQuery from '../useGetRecommendationMakersQuery';
import {OfficialFoodType} from '../type';

function RecommendationEditModal({open, setOpen, nowData, setNowData}) {
  const [id, setId] = useState('');
  const [groups, setGroups] = useState([]);

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

  const [foodGroupMonArr, setFoodGroupMonArr] = useState([]);
  const [foodGroupTueArr, setFoodGroupTueArr] = useState([]);
  const [foodGroupWedArr, setFoodGroupWedArr] = useState([]);
  const [foodGroupThuArr, setFoodGroupThuArr] = useState([]);
  const [foodGroupFriArr, setFoodGroupFriArr] = useState([]);
  const [foodGroupSatArr, setFoodGroupSatArr] = useState([]);
  const [foodGroupSunArr, setFoodGroupSunArr] = useState([]);

  const {editRecommendationMutation} = useRecommendationMutation(
    () => {},
    () => {
      setOpen(false);
    },
  );

  const {groupsList, foodGroupList} = useGetRecommendationMakersQuery();
  const [groupsDropbox, setGroupsDropbox] = useState([]);

  const [foodGroupDropbox, setFoodGroupDropbox] = useState([]);

  useEffect(() => {
    if (groupsList) {
      setGroupsDropbox(fillGroupsDropboxObjectForRecommendation(groupsList));
    }
  }, [groupsList]);

  useEffect(() => {
    if (foodGroupList) {
      setFoodGroupDropbox(
        fillFoodGroupDropboxObjectForRecommendation(foodGroupList),
      );
    }
  }, [foodGroupList]);

  useEffect(() => {
    if (!open) {
      setGroups([]);
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
    } else {
      if (!nowData) return;

      setId(nowData.id ? nowData.id : '');

      setGroups(nowData.groups ? [...nowData.groups.split(', ')] : []);

      nowData?.foodType?.forEach((v, i) => {
        switch (v.order) {
          case 0:
            setFoodTypes1(v.foodTypes ? v.foodTypes : '');
            setImportance1(v.importances ? v.importances : '');

            break;
          case 1:
            setFoodTypes2(v.foodTypes ? v.foodTypes : '');
            setImportance2(v.importances ? v.importances : '');

            break;
          case 2:
            setFoodTypes3(v.foodTypes ? v.foodTypes : '');
            setImportance3(v.importances ? v.importances : '');

            break;
          case 3:
            setFoodTypes4(v.foodTypes ? v.foodTypes : '');
            setImportance4(v.importances ? v.importances : '');

            break;
          case 4:
            setFoodTypes5(v.foodTypes ? v.foodTypes : '');
            setImportance5(v.importances ? v.importances : '');

            break;
          case 5:
            setFoodTypes6(v.foodTypes ? v.foodTypes : '');
            setImportance6(v.importances ? v.importances : '');

            break;

          default:
        }
      });
      nowData?.dailyFoodGroups?.forEach((v, i) => {
        switch (v.days) {
          case 0:
            setFoodGroupMon(v.foodGroups ? v.foodGroups : '');

            break;
          case 1:
            setFoodGroupTue(v.foodGroups ? v.foodGroups : '');

            break;
          case 2:
            setFoodGroupWed(v.foodGroups ? v.foodGroups : '');

            break;
          case 3:
            setFoodGroupThu(v.foodGroups ? v.foodGroups : '');

            break;
          case 4:
            setFoodGroupFri(v.foodGroups ? v.foodGroups : '');

            break;
          case 5:
            setFoodGroupSat(v.foodGroups ? v.foodGroups : '');

            break;
          case 6:
            setFoodGroupSun(v.foodGroups ? v.foodGroups : '');

            break;

          default:
        }
      });
    }
  }, [nowData, open]);

  const onSubmit = () => {
    let checkWrong = [false, 0, ''];

    const makeFoodType = (foodType, importance, num) => {
      // 둘다 ''보기

      // 하나 ''

      // 여기서 한쪽이 없거나 , 숫자가 안맞으면 에러 보내기

      if (foodType === '' || importance === '') {
        // 추천 식품 타입 1
        if (
          (foodType === '' && importance !== '') ||
          (foodType !== '' && importance === '')
        ) {
          checkWrong = [
            true,
            num,
            `추천 식품 타입${
              num + 1
            }란 혹은 해당 추천 비중에 빈 값이 있나 확인해 주세요`,
          ];
        }
      } else {
        if (foodType.split(',').length !== importance.split(',').length) {
          checkWrong = [
            true,
            num,
            `추천 식품 타입 ${
              num + 1
            }의 입력된 식품 타입 값의 갯수와 추천 비중 값의 갯수가 동일한지 확인해 보세요`,
          ];
        }

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

    const data = [
      {
        groups: groups.join(', '),
        foodType: [...FoodTypeData],
        dailyFoodGroups: [...DailyFoodGroups],
        id: id,
      },
    ];

    if (checkWrong[0]) {
      if (window.confirm(checkWrong[2])) {
        return;
      } else {
        return;
      }
    }

    if (groups.length < 1) {
      // 고객사값이 없을 경우
      window.confirm('고객사 값이 없습니다');
    }

    // 추천 식품 타입 , 추천 비중 타입 숫자가 다를 경우 에러 보내기
    else {
      editRecommendationMutation(data);
    }
  };

  useEffect(() => {
    setFoodGroupMonArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupMon.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupMon]);

  useEffect(() => {
    setFoodGroupTueArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupTue.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupTue]);
  useEffect(() => {
    setFoodGroupWedArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupWed.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupWed]);
  useEffect(() => {
    setFoodGroupThuArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupThu.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupThu]);
  useEffect(() => {
    setFoodGroupFriArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupFri.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupFri]);
  useEffect(() => {
    setFoodGroupSatArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupSat.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupSat]);
  useEffect(() => {
    setFoodGroupSunArr(
      adaptFoodGroupListToFoodGroupDropboxOptions(
        foodGroupSun.split(',').map(v => v.trim()),
      ),
    );
  }, [foodGroupSun]);

  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header> 데이터 수정</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <Form.Field>
                <FlexBox width={240}>
                  <Label size="mini">고객사</Label>
                  <SelectBox
                    placeholder={
                      <SelectBoxPlaceholder>고객사 리스트</SelectBoxPlaceholder>
                    }
                    options={groupsDropbox}
                    onChange={e => {
                      // if (groups !== []) {
                      //   // setGroups(`${groups}, ${e.value.toString()}`);

                      // } else {
                      //   // setGroups(`${e.value.toString()}`);
                      //   setGroups([e.value.toString()]);
                      // }

                      setGroups([...groups, e.value.toString()]);
                    }}
                  />
                  <GroupsInput
                    placeholder="고객사(필수)"
                    // defaultValue={nowData.name}
                    value={groups.join(', ')}
                    disabled
                    // onChange={(e, data) => {
                    //   //   setName(data.value);
                    // }}
                  />
                  <ResetButton
                    onClick={() => {
                      setGroups([]);
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance1}
                    onChange={(e, data) => {
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
                    placeholder="예) 셀러드, 정찬 도시락"
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance2}
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
                    placeholder="예) 셀러드, 정찬 도시락"
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance3}
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
                    placeholder="예) 셀러드, 정찬 도시락"
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance4}
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
                    placeholder="예) 셀러드, 정찬 도시락"
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance5}
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
                    placeholder="예) 셀러드, 정찬 도시락"
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
                <FlexBox width={80}>
                  <Label size="mini">추천 비중</Label>
                  <Input
                    placeholder="예) 1,2"
                    value={importance6}
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
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (월)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupMonArr}
                    // value={[]}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupMon(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupMonArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (화)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupTueArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupTue(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupTueArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (수)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupWedArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupWed(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupWedArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (목)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupThuArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupThu(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupThuArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (금)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupFriArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupFri(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupFriArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (토)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupSatArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupSat(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupSatArr(arr);
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">상품 그룹 확정 추가 (일)</Label>

                  <Select
                    closeMenuOnSelect={false}
                    placeholder={'식품 타입 선택'}
                    value={foodGroupSunArr}
                    isMulti
                    options={foodGroupDropbox}
                    // styles={colourStyles}
                    onChange={arr => {
                      setFoodGroupSun(
                        arr.length === 0
                          ? ''
                          : arr.map(v => v.value).join(', '),
                      );
                      setFoodGroupSunArr(arr);
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
            content="수정"
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

export default RecommendationEditModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  /* margin-right: 10px; */
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;

const LineBox = styled.div`
  display: flex;
  font-size: 12px;
  gap: 20px;
`;

const SelectBox = styled(Select)`
  width: ${({width}) => width}px;

  &::placeholder {
    color: blue;
  }
`;

const SelectBoxPlaceholder = styled.span`
  color: #c7c7c7;
`;

const ResetButton = styled.button``;

// const GroupsInput = styled(Input)`
//   &:disabled {
//     color: black;
//   }
//   color: black;
// `;

const GroupsInput = styled.input`
  &::placeholder {
    color: #bebebe;
  }

  padding-left: 10px;

  color: black;
  height: 30px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 3px;
`;

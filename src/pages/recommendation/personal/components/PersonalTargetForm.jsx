import OneRowForm from '../../common/OneRowForm';
import {
  StyledInputDate,
  StyledSelect,
  StyledSecondaryButton,
} from '../../ui/inputs';
import ContentsContainer from '../../common/ContentsContainer';

const PersonalTargetForm = ({
  startDate,
  endDate,
  groups,
  diningTypes,
  onSubmit,
}) => {
  return (
    <ContentsContainer header="추천 대상 선택">
      <OneRowForm onSubmit={onSubmit}>
        <div>
          <label>
            추천 일자 :{' '}
            <StyledInputDate
              type="date"
              name="date"
              required
              defaultValue={startDate}
              min={startDate}
              max={endDate}
            />
          </label>
        </div>
        <div>
          <label>
            그룹 :{' '}
            <StyledSelect name="group" required>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </StyledSelect>
          </label>
        </div>
        <div>
          <label>
            식사구분 :{' '}
            <StyledSelect name="diningType" required>
              {diningTypes.map(diningType => (
                <option key={diningType.id} value={diningType.id}>
                  {diningType.name}
                </option>
              ))}
            </StyledSelect>
          </label>
        </div>
        <div>
          <StyledSecondaryButton>조회</StyledSecondaryButton>
        </div>
      </OneRowForm>
    </ContentsContainer>
  );
};

export default PersonalTargetForm;

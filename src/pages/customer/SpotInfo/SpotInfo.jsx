import {Button} from 'semantic-ui-react';
import Table from '../../../common/Table/Table';
import {spotInfoFields} from '../../../data/spotInfo/spotInfoData';
import {spotInfoMockData} from '../../../data/spotInfo/spotInfoMockData';
import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';

const SpotInfo = () => {
  const {onActive} = useModal();
  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        <Table
          tableFieldsInput={spotInfoFields}
          tableDataInput={spotInfoMockData}
        />
      </TableWrapper>
    </PageWrapper>
  );
};

export default SpotInfo;

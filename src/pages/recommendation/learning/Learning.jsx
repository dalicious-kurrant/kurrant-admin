import PageHeader from '../common/PageHeader';
import LearningModelListForm from './components/LearningModelListForm';
import LearningNewModelForm from './components/LearningNewModelForm';
import {MODEL_LEARNING_TITLE} from '../../../shared/recommendation-constants';
import {PageWrapper} from 'style/common.style';

const LearningPage = ({recommendationService: rs}) => {
  return (
    <PageWrapper>
      <PageHeader title={MODEL_LEARNING_TITLE} />
      <LearningNewModelForm recommendationService={rs} />
      <LearningModelListForm recommendationService={rs} />
    </PageWrapper>
  );
};

export default LearningPage;

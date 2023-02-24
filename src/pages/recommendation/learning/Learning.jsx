import PageHeader from '../common/PageHeader';
import LearningModelListForm from './components/LearningModelListForm';
import LearningNewModelForm from './components/LearningNewModelForm';
import {MODEL_LEARNING_TITLE} from '../../../shared/recommendation-constants';
import {PageWrapper} from 'style/common.style';

const Learning = () => {
  return (
    <PageWrapper>
      <PageHeader title={MODEL_LEARNING_TITLE} />
      <LearningNewModelForm />
      <LearningModelListForm />
    </PageWrapper>
  );
};

export default Learning;

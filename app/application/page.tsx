import ApplicationFeatures from '@/components/application/ApplicationFeatures';
import { participantFeatures, organizerFeatures } from '@/constants/applicationFeatures';

const ApplicationPage = () => {
  return (
    <ApplicationFeatures 
      participantFeatures={participantFeatures}
      organizerFeatures={organizerFeatures}
    />
  );
};

export default ApplicationPage;
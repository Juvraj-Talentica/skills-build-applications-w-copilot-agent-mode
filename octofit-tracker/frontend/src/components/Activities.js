import ApiDataView from './ApiDataView';

function Activities() {
  return (
    <ApiDataView
      title="Activities"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`}
      endpointLabel="activities"
    />
  );
}

export default Activities;
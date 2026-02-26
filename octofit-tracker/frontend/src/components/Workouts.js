import ApiDataView from './ApiDataView';

function Workouts() {
  return (
    <ApiDataView
      title="Workouts"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`}
      endpointLabel="workouts"
    />
  );
}

export default Workouts;
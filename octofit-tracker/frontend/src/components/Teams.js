import ApiDataView from './ApiDataView';

function Teams() {
  return (
    <ApiDataView
      title="Teams"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`}
      endpointLabel="teams"
    />
  );
}

export default Teams;
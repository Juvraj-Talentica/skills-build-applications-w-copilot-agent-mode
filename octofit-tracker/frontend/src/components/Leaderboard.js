import ApiDataView from './ApiDataView';

function Leaderboard() {
  return (
    <ApiDataView
      title="Leaderboard"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`}
      endpointLabel="leaderboard"
    />
  );
}

export default Leaderboard;
import ApiDataView from './ApiDataView';

function Users() {
  return (
    <ApiDataView
      title="Users"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`}
      endpointLabel="users"
    />
  );
}

export default Users;
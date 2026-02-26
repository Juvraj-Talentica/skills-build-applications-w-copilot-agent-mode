import { useCallback, useEffect, useMemo, useState } from 'react';

function getPrimaryValue(item, fallback) {
  return item.name ?? item.title ?? item.username ?? item.team_name ?? item.email ?? fallback;
}

function getSecondaryValue(item) {
  return item.points ?? item.score ?? item.status ?? item.date ?? item.created_at ?? '-';
}

function getRowId(item, index) {
  return item.id ?? item._id ?? index + 1;
}

function ApiDataView({ title, endpoint, endpointLabel }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError('');
    console.log(`${title} endpoint:`, endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${title.toLowerCase()} (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${title} data:`, data);
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];
        setItems(normalized);
      })
      .catch((fetchError) => {
        console.error(`${title} fetch error:`, fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  const openDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeDetails = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h2 className="h3 mb-0">{title}</h2>
          <a
            className="link-primary text-decoration-none"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            Open {endpointLabel} API
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <label className="form-label" htmlFor={`${endpointLabel}-search`}>
              Search {title}
            </label>
            <input
              id={`${endpointLabel}-search`}
              type="text"
              className="form-control"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Filter ${title.toLowerCase()}...`}
            />
          </div>
          <div className="col-12 col-md-3 d-grid align-content-end">
            <button type="button" className="btn btn-primary mt-md-4" onClick={fetchData}>
              Refresh
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col" style={{ width: '10%' }}>ID</th>
                <th scope="col" style={{ width: '35%' }}>Primary</th>
                <th scope="col" style={{ width: '35%' }}>Secondary</th>
                <th scope="col" style={{ width: '20%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Loading...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item.id ?? item._id ?? index}>
                    <td>{getRowId(item, index)}</td>
                    <td>{getPrimaryValue(item, `Item ${index + 1}`)}</td>
                    <td>{getSecondaryValue(item)}</td>
                    <td>
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => openDetails(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5">{title} Details</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeDetails} />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeDetails}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={closeDetails} />
        </>
      )}
    </section>
  );
}

export default ApiDataView;
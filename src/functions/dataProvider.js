import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3003/customer';

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default (type, resource, params) => {
  let url = '',
    query;
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
  switch (type) {
    case 'GET_LIST': {
      const { page, perPage } = params.pagination;
      // const { field, order } = params.sort
      // query = {
      //   sort: JSON.stringify([field, order]),
      //   offset: JSON.stringify(page * perPage),
      //   limit: 10,
      //   filter: JSON.stringify(params.filter)
      // }
      query = (page - 1) * perPage + '/' + perPage;
      console.log(query);
      url = `${apiUrl}/${resource}/${query}`;
      break;
    }
    case 'GET_ONE':
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case 'CREATE':
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case 'UPDATE':
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case 'UPDATE_MANY':
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      options.method = 'PATCH';
      options.body = JSON.stringify(params.data);
      break;
    case 'DELETE':
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    case 'DELETE_MANY':
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      options.method = 'DELETE';
      break;
    case 'GET_MANY': {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    case 'GET_MANY_REFERENCE': {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
  let headers;
  return fetch(url, options)
    .then((res) => {
      headers = res.headers;
      return res.json();
    })
    .then((json) => {
      return {
        data: json,
        total: parseInt(headers.get('X-Total-Count').split('/').pop(), 10),
      };
      //   switch (type) {
      //     case 'GET_LIST':
      //     case 'GET_MANY_REFERENCE':
      //       if (!headers.has("X-Total-Count")) {
      //         throw new Error(
      //           "The X-Total-Count header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
      //         )
      //       }
      //       return {
      //         data: [json].map(resource => ({ ...resource, id: resource._id })),
      //         total: parseInt(
      //           headers
      //             .get("X-Total-Count")
      //             .split("/")
      //             .pop(),
      //           10
      //         )
      //       }
      //     case 'CREATE':
      //       console.log('CREATE',json);
      //       return { data: { ...params.data, id: json._id } }
      //     case 'GET_ONE':
      //       console.log('GET_ONE',json);
      //       return { data: [json].map(resource => ({ ...resource, id: resource._id })) }
      //     default:
      //       return { data: [json].map(resource => ({ ...resource, id: resource._id })) }
      //   }
    });
};

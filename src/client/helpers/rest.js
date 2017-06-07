require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import config from '../../config/client';

class Rest {

    constructor({path, headers, baseUrl, query}){
        this.baseUrl = config.apiBasePath || baseUrl;
        this.path = path;
        this.defaultHeaders = headers;
        this.defaultQuery = query;
    }

    async get(options = {}){
        const selectedPath = options.path || this.path;
        const url = `${selectedPath}`;
        return this.request(url, options);
    }

    async getOne(id, options = {}){
        const selectedPath = options.path || this.path;
        const url = `${selectedPath}/${id}`;
        return this.request(url, options);
    }

    async getShallow(id, options = {}){
        const selectedPath = options.path || this.path;
        const url = `${selectedPath}/${id}/shallow`;
        return this.request(url, options);
    }

    async count(options = {}){
        const selectedPath = options.path || this.path;
        const url = `${selectedPath}/count`;
        return this.request(url, options);
    }

    async post(options = {}){
        const selectedPath = options.path || this.path;
        options.method = 'POST';
        const url = `${selectedPath}`;
        return this.request(url, options);
    }

    async delete(options = {}){
        const selectedPath = options.path || this.path;
        options.method = 'DELETE';
        const url = `${selectedPath}`;
        return this.request(url, options);
    }

    async put(id, options = {}){
        const selectedPath = options.path || this.path;
        options.method = 'PUT';
        const url = `${selectedPath}/${id}`;
        return this.request(url, options);
    }

    async patch(id, options = {}){
        const selectedPath = options.path || this.path;
        options.method = 'PATCH';
        const url = `${selectedPath}/${id}`;
        return this.request(url, options);
    }

    async deleteOne(id, options = {}){
        const selectedPath = options.path || this.path;
        options.method = 'DELETE';
        const url = `${selectedPath}/${id}`;
        return this.request(url, options);
    }

    async request(path, options = {}){
        const baseUrl = options.baseUrl || this.baseUrl;
        const query = Object.assign({}, this.defaultQuery, options.query)
        const queryStringParsed = qs.stringify(query);
        const queryString = queryStringParsed ? `?${queryStringParsed}` : '';
        const reqOptions = {
            method: options.method || 'GET',
            headers: Object.assign({}, this.defaultHeaders || {}, options.headers || {}),
            body: options.body
        };

        if ((reqOptions.method != 'GET' || 
            reqOptions.method != 'HEAD' || 
            reqOptions.method != 'DELETE') && 
            typeof reqOptions.body === 'object') {
                reqOptions.body = JSON.stringify(reqOptions.body)
        }

        const url = `${baseUrl}/${path}${queryString}`;
        let body;
        const response = await fetch(url, reqOptions);

        try {
            body = await response.json();
        } catch (e) {
            body = e;
        }
        
        const status = response.status;
        const res = {
            path: url,
            body,
            response,
            status,
            query,
        };
        return res;
    }

}

export default Rest
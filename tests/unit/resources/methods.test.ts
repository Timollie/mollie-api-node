import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Methods from '@resources/methods';
import Method from '@models/Method';

import response from '@tests/unit/__stubs__/methods.json';
import ApiError from '@errors/ApiError';
import List from '@models/List';

const mock = new MockAdapter(axios);

describe('methods', () => {
  let methods;
  beforeEach(() => {
    methods = new Methods(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Methods.resource).toBe('methods');
    expect(Methods.model).toBe(Method);
  });

  describe('.get()', () => {
    const methodId = 'ideal';
    const error = { detail: 'The method id is invalid' };

    mock.onGet(`/methods/${methodId}`).reply(200, response._embedded.methods[0]);
    mock.onGet('/methods/foo').reply(500, error);

    it('should return a method instance', done =>
      methods.get(methodId).then(result => {
        expect(result).toBeInstanceOf(Method);
        expect(result).toMatchSnapshot();
        done();
      }));

    it('should work with a callback', done => {
      methods.get(methodId, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Method);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should throw an error for non-existent IDs', done =>
      methods
        .get('foo')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        }));

    it('should return an error with a callback for non-existent IDs', done => {
      methods.get('foo', (err, result) => {
        expect(err).toBeInstanceOf(ApiError);
        expect(err.getMessage()).toEqual(error.detail);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/methods').reply(200, response);

    it('should return a list of all methods', () =>
      methods.all().then(result => {
        expect(result).toBeInstanceOf(List);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      methods.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(List);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});

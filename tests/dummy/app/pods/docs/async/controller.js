import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

export default class AsyncController extends Controller {

  // BEGIN-SNIPPET async-simple.js
  /**
   * This example would be used on Yeti Table as `@loadData={{perform loadData}}`.
   * This uses ember-concurrency and ember-concurrency-decorators.
   */
  @restartableTask
  loadDataTask = function* ({ paginationData, sortData, filterData }) {
    yield timeout(250);

    let params = {
      sortBy: sortData.map((s) => s.prop),
      sortDir: sortData.map((s) => s.direction),
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      filter: filterData.filter
    };

    let users = yield this.store.query('user', params);

    // we need to inform Yeti Table about the total number of rows
    // for pagination to work correctly. Check out the pagination guide.
    this.set('totalRows', users.get('meta.totalRows'));

    return users;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET async-simple-es7.js
  /**
   * This example would be used on Yeti Table as `@loadData={{action "loadData"}}`.
   * This uses async/await functions.
   */
  @action
  async loadData({ paginationData, sortData, filterData }) {
    let params = {
      sortBy: sortData.map((s) => s.prop),
      sortDir: sortData.map((s) => s.direction),
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      filter: filterData.filter
    };

    let users = await this.store.query('user', params);

    // we need to inform Yeti Table about the total number of rows
    // for pagination to work correctly. Check out the pagination guide.
    this.set('totalRows', users.get('meta.totalRows'));

    return users;
  }
  // END-SNIPPET


}
